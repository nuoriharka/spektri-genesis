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

---

## Uudet multidomain-moduulit

### 3D-visualisointi (`src/viz/`)
- `soulSpace.ts`: Three.js-pohjainen 3D-visualisointi sieluista ja resonanssiyhteyksistä.
- Katso `src/viz/README.md` käyttöohjeet ja asennus.

### AI Resonanssipredictio (`src/ai/`)
- `resonancePredictor.ts`: TensorFlow.js-neuroverkko resonanssin ennustamiseen.
- Katso `src/ai/README.md` käyttöohjeet ja asennus.

### Kosminen konteksti (`src/cosmic/`)
- `schumann.ts`: Simuloi Schumann-resonanssia ja vertaa sielutaajuuksiin.
- Katso `src/cosmic/README.md` lisätiedot.

### Firmware (`firmware/`)
- `soul_led.ino`: ESP32/Arduino FastLED-firmware resonanssin visualisointiin LED-matriisilla.
- Katso `firmware/README.md` flashaus- ja sarjaporttiohjeet.

## Nopea asennus uusille ominaisuuksille

```bash
pnpm add three @tensorflow/tfjs
```
