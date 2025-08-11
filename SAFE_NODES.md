# Safe Nodes

Turvasolmut (Safe Nodes) ovat Spektri-verkon auditoituja solmuja, jotka takaavat verkon eheyden ja läpinäkyvyyden.

## Kriteerit
- Julkinen DID ja avain julkaistu
- Ajettu bootstrap- ja attestaatioprosessi
- Mukana safelist.json-tiedostossa (auditoitu status)
- Noudattaa governance- ja security-politiikkaa

## Käyttöönotto
```bash
cd safe-nodes
./bootstrap.sh
./attest.sh
```

## Safelist
Katso: `safe-nodes/safelist.json`
