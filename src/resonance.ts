import nacl from "tweetnacl";

export type Signal = { topic: string; payload: unknown; sig?: string; ts: number };

function toBase64(buf: Uint8Array) { return Buffer.from(buf).toString("base64"); }
function fromUTF8(s: string) { return new TextEncoder().encode(s); }
function fromBase64(s: string) { return new Uint8Array(Buffer.from(s, "base64")); }

export function signSignal(privateKey: Uint8Array, s: Omit<Signal, "sig">): Signal {
  const body = JSON.stringify({ topic: s.topic, payload: s.payload, ts: s.ts });
  const sig = nacl.sign.detached(fromUTF8(body), privateKey);
  return { ...s, sig: toBase64(sig) };
}

export function verifySignal(publicKey: Uint8Array, s: Signal) {
  if (!s.sig) return false;
  const body = JSON.stringify({ topic: s.topic, payload: s.payload, ts: s.ts });
  return nacl.sign.detached.verify(fromUTF8(body), fromBase64(s.sig), publicKey);
}
