import http from 'node:http';
import { scoreIntent, validateIntent } from '../specter/intent-gate';
import { runFeedbackLoopOnce } from '../specter/vault-feedback';

const PORT = Number(process.env.SPEKTRE_GATEWAY_PORT ?? '8787');
const MIN_SCORE = Number(process.env.SPEKTRE_TRUTH_THRESHOLD ?? '0.8');

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
      const intentOk = await validateIntent();
      if (!intentOk) {
        res.writeHead(503).end('Intent Gate Failed');
        return;
      }

      const score = scoreIntent(body);
      if (score < MIN_SCORE) {
        res.writeHead(403).end('Theater Detected');
        return;
      }

      if (req.headers['x-spektre-telemetry'] === '1') {
        await runFeedbackLoopOnce();
      }

      res.writeHead(200).end('Accepted');
    });
  });

  server.listen(PORT, () => {
    console.log(`🌐 SPECTER GATEWAY ONLINE :${PORT} @7.83Hz`);
  });
}
