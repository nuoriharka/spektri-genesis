// verify_signatures.js
// Prints commit-hash, signer DID, timestamp, sha256 match-list for all signatures in signatures/<did>/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256File(filepath) {
  const data = fs.readFileSync(filepath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function verifySignatureFile(sigPath) {
  const sig = JSON.parse(fs.readFileSync(sigPath, 'utf8'));
  const fileBase = path.basename(sigPath, '.sig');
  let targetFile = null;
  if (fileBase === 'genesis') targetFile = 'genesis_block.json';
  if (fileBase === 'manifesto') targetFile = 'MANIFESTO.md';
  if (!targetFile || !fs.existsSync(targetFile)) return { ...sig, valid: false, reason: 'Target file missing' };
  const actualSha = sha256File(targetFile);
  return {
    ...sig,
    valid: actualSha === sig.sha256,
    actualSha,
    file: targetFile
  };
}

function main() {
  const sigRoot = path.join(__dirname, 'signatures');
  fs.readdirSync(sigRoot).forEach(didDir => {
    const dirPath = path.join(sigRoot, didDir);
    if (!fs.statSync(dirPath).isDirectory()) return;
    fs.readdirSync(dirPath).filter(f => f.endsWith('.sig')).forEach(sigFile => {
      const sigPath = path.join(dirPath, sigFile);
      const result = verifySignatureFile(sigPath);
      console.log(`[${result.signer}] ${result.file} @ ${result.commit}`);
      console.log(`  Timestamp: ${result.timestamp}`);
      console.log(`  SHA256:    ${result.sha256}`);
      console.log(`  Actual:    ${result.actualSha}`);
      console.log(`  Valid:     ${result.valid ? 'YES' : 'NO'}${result.reason ? ' ('+result.reason+')' : ''}`);
    });
  });
}

main();
