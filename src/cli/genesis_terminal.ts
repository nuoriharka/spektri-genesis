import fetch from 'node-fetch';
import { masterLedger } from '../core/master_ledger';

const ENDPOINT = 'http://localhost:8787';
const IDENTITY = 'Independent-Architect-Lauri-Elias-Rainio';
const FAILURE_LINE = 'Yhteys katkennut. Piste 1=1 epävakaa.';

const args = process.argv.slice(2);
const acceptArg = args.find((arg) => arg.startsWith('--accept-responsibility='));
const accepted = acceptArg?.split('=')[1] === 'true';
const payloadParts = args.filter((arg) => !arg.startsWith('--accept-responsibility='));
const payload = payloadParts.join(' ').trim();

if (!accepted) {
  process.exit(1);
}

if (!payload) {
  process.exit(1);
}

const ledgerResult = masterLedger.executeTransition(
  IDENTITY,
  'GENESIS_TERMINAL_COMMAND',
  payload,
  accepted
);

if (!ledgerResult.ok) {
  process.stdout.write(FAILURE_LINE);
  process.exit(1);
}

const run = async () => {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'X-Identity': IDENTITY
    },
    body: payload
  });
  const text = await res.text();
  process.stdout.write(text);
};

run().catch(() => {
  process.stdout.write(FAILURE_LINE);
  process.exit(1);
});
