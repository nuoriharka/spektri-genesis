# Workflows (nopea kehitys)

- CI: lint → typecheck → build (ei raskaita testejä PR:ssä).
- Release-Please: semver & CHANGELOG automaattisesti main-haaraan.
- Renovate: viikoittaiset dependency-PR:t (ei major automergea).
- Vercel: PR-branchit = Preview, main = Production.

Vinkki: dokumenttimuutokset eivät välttämättä tarvitse täyttä buildia – hyödynnä `[skip ci]` commit-viestissä, jos haluat ohittaa CI:n.
