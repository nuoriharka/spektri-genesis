import http from 'node:http';
import { scoreIntent, validateIntent } from '../specter/intent-gate';
import { runFeedbackLoopOnce } from '../specter/vault-feedback';
import { masterLedger } from '../core/master_ledger';

const PORT = Number(process.env.SPEKTRE_GATEWAY_PORT ?? '8787');
const MIN_SCORE = Number(process.env.SPEKTRE_TRUTH_THRESHOLD ?? '0.8');
const IDENTITY = 'Independent-Architect-Lauri-Elias-Rainio';

export function startGateway(): void {
  if (process.env.SPEKTRE_NET_ENABLED !== 'true') {
    return;
  }

  const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405).end('Method Not Allowed');
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const identity = String(req.headers['x-identity'] || '');
      const responsibilityAccepted = String(req.headers['x-responsibility-accepted'] || '') === 'true';
      if (identity !== IDENTITY) {
        masterLedger.recordError('UNKNOWN', 'GATEWAY_IDENTITY_MISSING', JSON.stringify({ ip: req.socket.remoteAddress }));
        res.writeHead(401).end('Access Denied. Identity Anchor Missing. 1 != 1.');
        return;
      }
      if (!responsibilityAccepted) {
        masterLedger.recordError(identity, 'GATEWAY_RESPONSIBILITY_MISSING', JSON.stringify({ ip: req.socket.remoteAddress }));
        res.writeHead(403).end('Responsibility Missing');
        return;
      }

      const intentOk = await validateIntent();
      if (!intentOk) {
        masterLedger.recordError(identity, 'GATEWAY_INTENT_FAILED', JSON.stringify({ ip: req.socket.remoteAddress }));
        res.writeHead(503).end('Intent Gate Failed');
        return;
      }

      const score = scoreIntent(body);
      if (score < MIN_SCORE) {
        masterLedger.recordError(identity, 'GATEWAY_THEATER_DETECTED', JSON.stringify({ score }));
        res.writeHead(403).end('Theater Detected');
        return;
      }

      if (req.headers['x-spektre-telemetry'] === '1') {
        await runFeedbackLoopOnce();
      }

      const ledger = masterLedger.executeTransition(identity, 'GATEWAY_REQUEST', body, true);
      if (!ledger.ok) {
        res.writeHead(403).end('Responsibility Missing');
        return;
      }

      res.writeHead(200).end('Accepted');
    });
  });

  server.listen(PORT, () => {
    console.log(`🌐 SPECTER GATEWAY ONLINE :${PORT} @7.83Hz`);
  });
}
