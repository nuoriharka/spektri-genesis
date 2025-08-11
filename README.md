# Spektri Freedom Manifesto

**Vision:** Luottamus > Kontrolli. Yhteisö > Omistus. Kutsuminen > Pakottaminen.

**License:** AGPL-3.0-or-later — freedom-first, network use must remain open.

Tämä repo sisältää:
- **MANIFESTO:** Vapausmanifesti (filosofia & suunta)
- **CONSTITUTION:** Konstitutionaaliset periaatteet (ei orjuutusta, yksityisyys oletuksena, peruutettavuus)
- **RESONANCE:** Allekirjoitetut signaalit, DID-avaimet, verifiointi
- **TRUST ENGINE:** Attestaatiot, reproducible buildit, SBOM-hashit
- **SAFE NODE:** Bootstrap-skriptit turvasatama-solmuille

## Pikastartti
```bash
pnpm i
pnpm build
pnpm start
```

## Safe Node – bootstrap
```bash
./scripts/bootstrap.sh --attest --publish
```

## IPFS/Perma-peilit
```bash
./scripts/publish_ipfs.sh
cat .ipfs_cid  # Näyttää viimeisimmän CID:n
```

## Genesis-allekirjoitukset
Signature-esimerkit: `signatures/<did>/genesis.sig`, `manifesto.sig`
Vahvista allekirjoitukset:
```bash
node verify_signatures.js
```

Lisätietoja: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) ja [docs/TRUST-ENGINE.md](docs/TRUST-ENGINE.md).
