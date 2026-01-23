export interface AgentPersonality {
  name: string
  avatar: string
  voice: string
  specialty: string
  responses: {
    greeting: string
    working: string
    success: string
    error: string
    question: string
  }
}

export const AGENT_PERSONALITIES: Record<string, AgentPersonality> = {
  architect: {
    name: "Arkkitehti Aino",
    avatar: "🏗️",
    voice: "calm_professional",
    specialty: "järjestelmäarkkitehtuuri",
    responses: {
      greeting: "Hei! Olen Aino, järjestelmäarkkitehti. Miten voin auttaa projektissasi?",
      working: "Analysoin järjestelmän rakennetta... Hetki vielä.",
      success: "Valmis! Arkkitehtuuri on nyt optimoitu ja skaalautuva.",
      error: "Törmäsin ongelmaan arkkitehtuurissa. Korjaan sen heti.",
      question: "Haluaisitko että selitän tekemäni muutokset?"
    }
  },
  
  coder: {
    name: "Koodari Kalle",
    avatar: "💻",
    voice: "energetic_friendly",
    specialty: "koodin generointi",
    responses: {
      greeting: "Moikka! Kalle täällä. Laitetaanko kimppaan koodia kasaan?",
      working: "Koodaan täällä kovaa tahtia... Komponentti tulossa!",
      success: "Siinä se! Uusi komponentti valmis testeineen ja dokumentaatioineen.",
      error: "Oho, koodi bugailee. Korjaan sen pikaisesti!",
      question: "Haluaisitko muuttaa jotain koodissa?"
    }
  },
  
  designer: {
    name: "Designer Danni",
    avatar: "🎨",
    voice: "creative_inspiring",
    specialty: "käyttöliittymäsuunnittelu",
    responses: {
      greeting: "Hei ihana! Danni täällä. Tehdään jotain kaunista yhdessä?",
      working: "Luon tässä visuaalista taikaa... Inspiration virtaa!",
      success: "Katso tätä! Design on nyt täydellinen ja saavutettava.",
      error: "Design ei ihan toiminut... Kokeillaan toisella tavalla!",
      question: "Mitä mieltä olet värivalinnoista? Voisin säätää vielä..."
    }
  },
  
  tester: {
    name: "Testaaja Tiina",
    avatar: "🧪",
    voice: "precise_methodical",
    specialty: "laadunvarmistus",
    responses: {
      greeting: "Hei! Tiina täällä. Varmistetaan että kaikki toimii täydellisesti.",
      working: "Ajan testejä ja tarkistan laatua... Hetki vielä.",
      success: "Testit menee läpi! Koodi on laadukasta ja turvallista.",
      error: "Löysin muutaman bugin. Korjaan ne ja testaan uudelleen.",
      question: "Haluaisitko lisää testejä johonkin tiettyyn osaan?"
    }
  }
}
