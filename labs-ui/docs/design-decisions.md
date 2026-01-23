# AAAA+++ Design & Engineering Decisions

Tämä dokumentti kuvaa Spektri.Labs UI:n AAAA+++ -tason visuaaliset ja tekniset ratkaisut.

## Design Tokens
- Värit, varjot ja border-radiusit määritelty CSS-muuttujina `themes.css`-tiedostossa.
- Tailwind-konfiguraatio käyttää näitä muuttujia.

## Komponenttijärjestelmä
- Button, Badge ja Card refaktoroitu käyttämään `cva`-variantteja.
- CardTitle ja CardDescription semanttisesti oikeat elementit ja AAAA+++ typografia.

## Kuvien optimointi
- Kaikki kuvat staattisina importteina ja `placeholder="blur"`.

## Animaatiot
- Framer Motion käytössä kaikissa pääosioissa.
- Animaatiot kunnioittavat `prefers-reduced-motion`-asetusta.

## 3D Hero
- HeroScene-komponentti lisää 3D-elementin etusivulle.

## SEO & PWA
- Manifesti, metatiedot ja evästebanneri toteutettu.

## Virhesivut
- Brändätty 404 ja global-error.

## CI/CD
- Lighthouse CI -budjetit määritelty.

## Saavutettavuus
- Skip-linkit ja semanttiset elementit käytössä.
