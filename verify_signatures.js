const crypto = require('crypto');
const fs = require('fs');

// Tarkista dokumentin tiiviste
function verifySignature(documentPath, signaturePath) {
  const document = fs.readFileSync(documentPath, 'utf-8');
  const signatureInfo = fs.readFileSync(signaturePath, 'utf-8');
  
  // Poimi commit hash allekirjoituksesta
  const commitHash = signatureInfo.match(/CommitHash: (\w+)/)[1];
  
  // Laske nykyinen SHA-256
  const currentHash = crypto.createHash('sha256').update(document).digest('hex');
  
  return {
    document: documentPath,
    signatureValid: currentHash.startsWith(commitHash.slice(0, 16)),
    signer: signatureInfo.match(/Signer: (.+)/)[1],
    timestamp: signatureInfo.match(/Timestamp: (.+)/)[1]
  };
}

// Tarkista kaikki allekirjoitukset
const documents = [
  { doc: 'MANIFESTO.md', sig: 'signatures/lauri_rainio/manifesto.signature' },
  { doc: 'genesis_block.json', sig: 'signatures/lauri_rainio/genesis_block.signature' }
];

console.log('Spektrin Allekirjoitusten Validointi');
console.log('===================================');

documents.forEach(({doc, sig}) => {
  const result = verifySignature(doc, sig);
  console.log(`Dokumentti: ${doc}`);
  console.log(`Allekirjoittaja: ${result.signer}`);
  console.log(`Aikaleima: ${result.timestamp}`);
  console.log(`Status: ${result.signatureValid ? 'VALID' : 'INVALID'}`);
  console.log('-----------------------------------');
});
