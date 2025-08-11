# Spektri Freedom Manifesto

**Vision:** Luottamus > Kontrolli. Yhteisö > Omistus. Kutsuminen > Pakottaminen.

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

Lisätietoja: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) ja [docs/TRUST-ENGINE.md](docs/TRUST-ENGINE.md).
