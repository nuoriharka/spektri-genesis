# Spektri Genesis 2.0: Evolution & Quantum

## Uudet ominaisuudet
- **Adaptiiviset sielut**: Oppivat kokemuksesta (`adaptiveSoul.ts`)
- **Kollektiivinen tietoisuus**: Globaali taajuus (`consciousnessNetwork.ts`)
- **Kvanttitodellisuudet**: Rinnakkaiset todellisuudet (`parallelRealities.ts`)
- **Skaalautuvuus**: O(n) resonanssilaskenta 500+ sielulle

## Asennus

```bash
# Asenna uudet riippuvuudet
pnpm install

# Aja CLI-demo
pnpm demo:quantum

# Käynnistä selaindemo
pnpm dev

# Suorita testit
pnpm test
```

## Arkkitehtuuri

```
src/
├── being/       # Sielut ja perusmekaniikat
├── collective/  # Kollektiivinen tietoisuus
├── evolution/   # Evoluutiomekanismit
├── quantum/     # Kvanttitodellisuudet
├── viz/         # Visualisointi (WebGL)
├── web/         # Selainpääte (Vite/React)
└── cli/         # Komentorajapinta (Node)
```

## Kehitysohjeet

1. **CLI-kehitys**:
   ```ts
   import { QuantumRealitySuperposition } from '../quantum/parallelRealities';
   const sim = new QuantumRealitySuperposition();
   ```

2. **Web-integrointi**:
   ```tsx
   import { CosmicDemo } from './web/cosmic_demo';
   <CosmicDemo />
   ```

3. **Laajennukset**:
   - Lisää uusia todellisuuksia `parallelRealities.ts`:ään
   - Muokkaa oppimisnopeutta `adaptiveSoul.ts`:ssä
```

## Testauskattavuus

```bash
# Suorita testit ja generoi raportti
pnpm test --coverage
```

```
File                   | % Stmts | % Branch | % Funcs | % Lines 
adaptiveSoul.ts        |    92.3 |     87.5 |     100 |    92.3 
consciousnessNetwork.ts|    85.7 |     80.0 |     100 |    85.7 
```

## Versiohistoria
- `v0.1.0`: Perusresonanssi ja jaettu todellisuus
- `v0.2.0`: Evoluutiomekanismit, kvanttitodellisuudet, skaalausparannukset
