// ARG - A Birita Desaparecida
// Arquivo central de configuração
// Edite apenas este arquivo para personalizar o ARG

const ARG_CONFIG = {
  instagramDistracao: "https://www.instagram.com/never_gonna_give_you_up_daily/",
  jogos: [
    { id: "mario-kart", nome: "Mario Kart", tipo: "virtual", peso: 1, chaveamento: "grupos-final-4", maxCompetidores: 1 },
    { id: "flip-cup", nome: "Flip Cup", tipo: "fisico", peso: 1, chaveamento: "todos-contra-todos-final", maxCompetidores: 5 },
    { id: "just-dance", nome: "Just Dance", tipo: "virtual", peso: 1, chaveamento: "grupos-final-4", maxCompetidores: 2 },
    { id: "sinuca", nome: "Sinuca", tipo: "fisico", peso: 1, chaveamento: "todos-contra-todos-final", maxCompetidores: 2 },
    { id: "pebolim", nome: "Pebolim", tipo: "fisico", peso: 1, chaveamento: "todos-contra-todos-final", maxCompetidores: 2 },
    { id: "chega", nome: "Quem chega lá!", tipo: "virtual", peso: 1, chaveamento: "bateria-unica", maxCompetidores: 1 },
    { id: "busca", nome: "Quem tem mais?", tipo: "virtual", peso: 1, chaveamento: "bateria-unica", maxCompetidores: "todos" },
    { id: "arg", nome: "ARG", tipo: "arg", peso: 3, chaveamento: "bateria-unica", maxCompetidores: "todos" }
  ],

  // A proporcao 8:5:3 e igual em todos os jogos; o peso aumenta a importancia da rodada.
  graduacaoJogos: {
    primeiro: 8,
    segundo: 5,
    terceiro: 3
  },

  // Mapeamento de códigos secretos para páginas das equipes
  codigos: {
    "VUPG":    "equipes/azul.html",
    "QZMYZ":   "equipes/verde.html",
    "VHVMZGV": "equipes/amarela.html",
    "MJSV":    "equipes/roxa.html",
    "GVMVIEV": "equipes/laranja.html",
    "QZMHZGCV": "equipes/vermelha.html",
  },

  // Coordenadas GPS do Ponto de Partida de cada equipe (formato: "latitude,longitude")
  // Obtenha as coordenadas no Google Maps clicando com o botão direito no local desejado
  coordenadas: {
    azul:    "-22.8894743,-47.0433711",
    verde:   "[PREENCHER: LAT,LONG - exemplo: -22.912345,-47.123456]",
    amarela: "-20.1410838,-50.9982535",
    roxa:    "-22.884808,-47.0627155",
    laranja: "[PREENCHER: LAT,LONG - exemplo: -22.912345,-47.123456]",
    vermelha: "-23.6012628,-46.7201462",
  },

  // Configuração das duplas - Biblioteca de Autores
  // Dupla 1: Azul + Verde
  // Dupla 2: Amarela + Roxa
  // Dupla 3: Laranja + Vermelha
  duplas: {
    dupla1: {
      autorChave: "Machado de Assis",
      instagram:  "https://www.instagram.com/assis_machadao/"
    },
    dupla2: {
      autorChave: "Julia Lopes de Almeida",
      instagram:  "https://www.instagram.com/almeida_lopao/"
    },
    dupla3: {
      autorChave: "Carlos Drummond de Andrade",
      instagram:  "https://www.instagram.com/drummond_carlao/"
    },
  },

  // Lista de autores para aparecer nas páginas de biblioteca
  // Os autores-chave definidos acima DEVEM estar nesta lista
  autoresBiblioteca: [
    "Machado de Assis",
    "Clarice Lispector",
    "Jorge Amado",
    "Guimarães Rosa",
    "Carlos Drummond de Andrade",
    "Cecília Meireles",
    "Manuel Bandeira",
    "Lima Barreto",
    "Rachel de Queiroz",
    "Graciliano Ramos",
    "Érico Veríssimo",
    "Vinicius de Moraes",
    "João Cabral de Melo Neto",
    "Mário de Andrade",
    "Lygia Fagundes Telles",
    "Julia Lopes de Almeida"
  ],

  // Titulos na Wikipedia usados para buscar retratos publicos dos autores.
  autoresFotos: {
    "Machado de Assis": "Machado_de_Assis",
    "Clarice Lispector": "Clarice_Lispector",
    "Jorge Amado": "Jorge_Amado",
    "Guimarães Rosa": "João_Guimarães_Rosa",
    "Carlos Drummond de Andrade": "Carlos_Drummond_de_Andrade",
    "Cecília Meireles": "Cecília_Meireles",
    "Manuel Bandeira": "Manuel_Bandeira",
    "Lima Barreto": "Lima_Barreto_(escritor)",
    "Rachel de Queiroz": "Rachel_de_Queiroz",
    "Graciliano Ramos": "Graciliano_Ramos",
    "Érico Veríssimo": "Érico_Veríssimo",
    "Vinicius de Moraes": "Vinicius_de_Moraes",
    "João Cabral de Melo Neto": "João_Cabral_de_Melo_Neto",
    "Mário de Andrade": "Mário_de_Andrade",
    "Lygia Fagundes Telles": "Lygia_Fagundes_Telles",
    "Julia Lopes de Almeida": "Julia_Lopes_de_Almeida"
  },

  // Frase-chave final (mesma para todas as equipes)
  fraseChaveFinal: "BEBER CAIR E LEVANTAR",

  // Mensagem exibida ao acertar a frase-chave
  mensagemFinal: "A birita desaparecida foi encontrada! O open bar esta oficialmente aberto. Parabens: voces ganharam uma Jaggermeister para beber até!",

  // Conteúdo dos livros para a biblioteca (simula PDFs com múltiplas páginas)
  livrosConteudo: {
    "Machado de Assis": {
      paginas: [
        {
          titulo: "Memórias Póstumas de Brás Cubas",
          conteudo: "Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço..."
        },
        {
          titulo: "Sobre o Autor",
          conteudo: "Joaquim Maria Machado de Assis (1839-1908) foi um escritor brasileiro, considerado por muitos críticos o maior nome da literatura brasileira. Escreveu em praticamente todos os gêneros literários, sendo poeta, romancista, cronista, dramaturgo, contista, folhetinista, jornalista e crítico literário."
        }
      ]
    },
    "Clarice Lispector": {
      paginas: [
        {
          titulo: "A Hora da Estrela",
          conteudo: "Tudo no mundo começou com um sim. Uma molécula disse sim a outra molécula e nasceu a vida. Mas antes da pré-história havia a pré-história da pré-história e havia o nunca e havia o sim. Sempre houve. Não sei o quê, mas sei que o universo jamais começou."
        },
        {
          titulo: "Pensamentos",
          conteudo: "Renda-se, como eu me rendi. Mergulhe no que você não conhece como eu mergulhei. Não se preocupe em entender, viver ultrapassa qualquer entendimento. A literatura é a arte do encontro. Entre palavras, entre silêncios, entre o dito e o não dito."
        }
      ]
    },
    "Jorge Amado": {
      paginas: [
        {
          titulo: "Capitães da Areia",
          conteudo: "Sob a lua, num velho trapiche abandonado, as crianças dormem. Reformas do cais do porto na Bahia deixaram o trapiche abandonado. Ele é vasto, cheio de escuros e de sombras. É o abrigo dos Capitães da Areia, meninos de rua que vivem da malandragem e do roubo."
        },
        {
          titulo: "Sobre a Bahia",
          conteudo: "A Bahia é mãe dos deuses e dos homens. Terra de axé, de candomblé, de capoeira. Terra de todos os santos e de todas as cores. É a Bahia de Jorge Amado, com seu povo guerreiro, suas festas, sua música, sua fé."
        }
      ]
    },
    "Guimarães Rosa": {
      paginas: [
        {
          titulo: "Grande Sertão: Veredas",
          conteudo: "Nonada. Tiros que o senhor ouviu foram de briga de homem não, Deus esteja. Alvejei mira em árvores no quintal, no baixo do córrego. Por meu acerto. Todo dia isso faço, gosto; desde mal em minha mocidade. Daí, vieram me chamar. Causa dum bezerro: um bezerro branco, erroso, os olhos de nem ser — se viu —; e com máscara de cachorro."
        },
        {
          titulo: "O Sertão",
          conteudo: "O sertão é do tamanho do mundo. O sertão está em toda parte. O sertão é onde o pensamento da gente se forma mais forte do que o poder do lugar. Viver é muito perigoso. Porque aprender-a-viver é que é o viver mesmo."
        }
      ]
    },
    "Carlos Drummond de Andrade": {
      paginas: [
        {
          titulo: "No Meio do Caminho",
          conteudo: "No meio do caminho tinha uma pedra / tinha uma pedra no meio do caminho / tinha uma pedra / no meio do caminho tinha uma pedra. / Nunca me esquecerei desse acontecimento / na vida de minhas retinas tão fatigadas. / Nunca me esquecerei que no meio do caminho / tinha uma pedra / tinha uma pedra no meio do caminho / no meio do caminho tinha uma pedra."
        },
        {
          titulo: "Poesia",
          conteudo: "A poesia é incomunicável. Fique torto no seu canto. Não ame. Ouço dizer que há tiroteio ao redor. Não é do meu tempo. Enquanto não atirar, vou compondo o universo de palavras dançarinas. A poesia me salvará."
        }
      ]
    },
    "Cecília Meireles": {
      paginas: [
        {
          titulo: "Motivo",
          conteudo: "Eu canto porque o instante existe / e a minha vida está completa. / Não sou alegre nem sou triste: / sou poeta. / Irmão das coisas fugidias, / não sinto gozo nem tormento. / Atravesso noites e dias / no vento."
        },
        {
          titulo: "Sobre Poesia",
          conteudo: "A poesia é uma ilha cercada de palavras por todos os lados. É um sussurro entre o silêncio e o grito. É o que permanece quando tudo passa. É a eternidade no instante."
        }
      ]
    },
    "Manuel Bandeira": {
      paginas: [
        {
          titulo: "Vou-me Embora pra Pasárgada",
          conteudo: "Vou-me embora pra Pasárgada / Lá sou amigo do rei / Lá tenho a mulher que eu quero / Na cama que escolherei / Vou-me embora pra Pasárgada. / Em Pasárgada tem tudo / É outra civilização / Tem um processo seguro / De impedir a concepção / Tem telefone automático / Tem alcaloide à vontade / Tem prostitutas bonitas / Para a gente namorar."
        },
        {
          titulo: "Libertinagem",
          conteudo: "A vida inteira que podia ter sido e que não foi. Todas as palavras que eu não disse, todos os gestos que não fiz, todas as canções que não cantei. E no entanto, aqui estou, com minha pequena poesia, meu pequeno canto de liberdade."
        }
      ]
    },
    "Lima Barreto": {
      paginas: [
        {
          titulo: "Triste Fim de Policarpo Quaresma",
          conteudo: "Policarpo era patriota. Desde moço, aí pelos vinte anos, o amor da Pátria tomou-o todo inteiro. Não fora o amor comum, palrador e vazio; fora um sentimento sério, grave e absorvente. A que se propunha amar a Pátria, o fazia com seriedade, estudando-a, decorando-a, vivendo-a."
        },
        {
          titulo: "Sobre o Brasil",
          conteudo: "O Brasil é um país contraditório, de extremos que se tocam. Entre a riqueza e a pobreza, entre o erudito e o popular, entre o sonho e a realidade. Lima Barreto navegou por esses mundos, sempre com olhar crítico e coração sensível."
        }
      ]
    },
    "Rachel de Queiroz": {
      paginas: [
        {
          titulo: "O Quinze",
          conteudo: "A seca de 1915 foi das mais terríveis que já castigaram o Ceará. A terra esturricou-se, as fontes secaram-se, os gados morreram. O sertanejo, esse flagelado eterno, deixou sua terra e pôs-se a caminhar para o litoral, em busca de um pouco de esperança."
        },
        {
          titulo: "Nordeste",
          conteudo: "O nordeste é terra de sol forte e de gente forte. Terra de secas e de lutas. Mas também terra de festa, de cor, de alegria que resiste. Rachel de Queiroz foi a cronista dessa terra e desse povo."
        }
      ]
    },
    "Graciliano Ramos": {
      paginas: [
        {
          titulo: "Vidas Secas",
          conteudo: "Na planície avermelhada os juazeiros alargavam duas manchas verdes. Os infelizes tinham caminhado o dia inteiro, estavam cansados e famintos. Ordinariamente andavam pouco, mas como haviam repousado bastante na areia do rio seco, a viagem progredira bem três léguas."
        },
        {
          titulo: "Reflexões",
          conteudo: "A literatura é confissão. O escritor escreve para confessar, para libertar-se, para entender o mundo e a si mesmo. Graciliano Ramos escreveu com a precisão de um cirurgião e a alma de um poeta."
        }
      ]
    },
    "Érico Veríssimo": {
      paginas: [
        {
          titulo: "O Tempo e o Vento",
          conteudo: "A história do Rio Grande do Sul é feita de lutas, de guerras, de famílias que se enfrentaram e se uniram. É a saga dos Terra e dos Cambará, que atravessaram gerações construindo e destruindo, amando e odiando, vivendo intensamente."
        },
        {
          titulo: "Sobre Contar Histórias",
          conteudo: "Contar histórias é uma necessidade humana. É através das histórias que nos conhecemos, que entendemos o passado e imaginamos o futuro. É pela narrativa que fazemos sentido do mundo."
        }
      ]
    },
    "Vinicius de Moraes": {
      paginas: [
        {
          titulo: "Soneto de Fidelidade",
          conteudo: "De tudo, ao meu amor serei atento / Antes, e com tal zelo, e sempre, e tanto / Que mesmo em face do maior encanto / Dele se encante mais meu pensamento. / Quero vivê-lo em cada vão momento / E em seu louvor hei de espalhar meu canto / E rir meu riso e derramar meu pranto / Ao seu pesar ou seu contentamento."
        },
        {
          titulo: "Amor e Poesia",
          conteudo: "Que o amor não seja eterno posto que é chama, mas que seja infinito enquanto dure. Vinicius foi o poeta do amor, da bossa nova, da vida. Suas palavras são melodia, seus versos são canções."
        }
      ]
    },
    "João Cabral de Melo Neto": {
      paginas: [
        {
          titulo: "Morte e Vida Severina",
          conteudo: "O meu nome é Severino, / não tenho outro de pia. / Como há muitos Severinos, / que é santo de romaria, / deram então de me chamar / Severino de Maria; / como há muitos Severinos / com mães chamadas Maria, / fiquei sendo o da Maria / do finado Zacarias."
        },
        {
          titulo: "Poesia Pedra",
          conteudo: "A poesia de João Cabral é como pedra: dura, precisa, exata. Não há espaço para o supérfluo. Cada palavra é escolhida como se escolhe cada pedra para construir uma catedral. É poesia de engenheiro, mas também de coração."
        }
      ]
    },
    "Mário de Andrade": {
      paginas: [
        {
          titulo: "Macunaíma",
          conteudo: "No fundo do mato-virgem nasceu Macunaíma, herói de nossa gente. Era preto retinto e filho do medo da noite. Houve um momento em que o silêncio foi tão grande escutando o murmurejo do Uraricoera, que a índia tapanhumas pariu uma criança feia. Essa criança é que chamaram de Macunaíma."
        },
        {
          titulo: "Modernismo",
          conteudo: "O modernismo brasileiro foi uma revolução. Mário de Andrade foi um de seus líderes. Buscou criar uma arte brasileira, que não copiasse a Europa, mas que bebesse de nossas raízes, de nossa miscigenação, de nossa brasilidade."
        }
      ]
    },
    "Lygia Fagundes Telles": {
      paginas: [
        {
          titulo: "As Meninas",
          conteudo: "Três meninas dividindo um apartamento em São Paulo nos anos 70. Lorena, rica e romântica. Lia, militante política. Ana Clara, perdida nas drogas. Três destinos que se cruzam numa época de ditadura, de medo, de resistência."
        },
        {
          titulo: "Sobre Escrever",
          conteudo: "Escrever é um ato de coragem. É expor a alma, revelar os demônios, mostrar as fragilidades. Lygia Fagundes Telles escreveu sobre mulheres, sobre seus desejos, seus medos, suas forças. Foi pioneira e permanece atual."
        }
      ]
    },
    "Julia Lopes de Almeida": {
      paginas: [
        {
          titulo: "A Família Medeiros",
          conteudo: "A obra narra a vida de uma família brasileira, explorando suas complexidades, conflitos e relações. Julia Lopes de Almeida retrata com sensibilidade os dilemas e as emoções de seus personagens."
        },
        {
          titulo: "Romance e Sociedade",
          conteudo: "Julia Lopes de Almeida abordava em seus romances as questões sociais de sua época, refletindo sobre a moral, os costumes e as transformações da sociedade brasileira."
        }
      ]
    }
  }
};
