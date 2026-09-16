# ARG — A Birita Desaparecida

> Jogo de Realidade Alternada (ARG) para gincana com 6 equipes

## Nova temática

A birita principal desapareceu pouco antes da festa. As equipes seguem pistas digitais, locais físicos, bibliotecas e posts de Instagram para encontrar a garrafa. Quando resolvem a frase final no notebook, o open bar é liberado e a equipe ganha uma garrafa especial. O consumo é opcional e somente para adultos; ofereça água, alternativas sem álcool e transporte seguro.

## 📋 Sobre o Projeto

Este é um conjunto de sites estáticos simples (HTML + CSS + JavaScript puro) que implementam a trilha de um ARG para uma gincana de 6 equipes coloridas. O jogo funciona 100% offline-friendly após carregado.

**Equipes:**
- 🔵 Azul
- 🟢 Verde  
- 🟡 Amarela
- 🟣 Roxa
- 🟠 Laranja
- 🔴 Vermelha

**Duplas fixas:**
- Dupla 1: Azul + Verde
- Dupla 2: Amarela + Roxa
- Dupla 3: Laranja + Vermelha

## 🗂️ Estrutura do Projeto

```
/arg-site
├── index.html                    # Portal de entrada (Site A)
├── e.html                        # Rota genérica diária das equipes (Site B)
├── equipes/
│   ├── azul.html                # Páginas legadas de referência
│   ├── verde.html
│   ├── amarela.html
│   ├── roxa.html
│   ├── laranja.html
│   └── vermelha.html
├── biblioteca/
│   ├── dupla1.html              # Biblioteca de autores (Site C)
│   ├── dupla2.html
│   └── dupla3.html
├── final/
│   └── notebook.html            # Notebook final (Site D)
├── assets/
│   ├── config.js                # ⚠️ ARQUIVO DE CONFIGURAÇÃO (EDITAR AQUI)
│   ├── access.js                # Controle de fluxo e tokens diários
│   └── style.css                # Estilos globais
└── README.md                     # Este arquivo
```

## ⚙️ Configuração Antes do Evento

### ⚠️ IMPORTANTE: Edite APENAS o arquivo `assets/config.js`

Antes de usar o ARG, você precisa preencher os dados do evento no arquivo **`assets/config.js`**. Abra este arquivo em qualquer editor de texto e preencha os seguintes campos:

### 1. Códigos Secretos das Equipes

Substitua os códigos no objeto `codigos`:

```javascript
codigos: {
  "CODIGOAZUL":    "equipes/azul.html",     // Trocar "CODIGOAZUL"
  "CODIGOVERDE":   "equipes/verde.html",    // Trocar "CODIGOVERDE"
  "CODIGOAMARELA": "equipes/amarela.html",  // etc...
  "CODIGOROXA":    "equipes/roxa.html",
  "CODIGOLARANJA": "equipes/laranja.html",
  "CODIGOVERMELHA": "equipes/vermelha.html",
}
```

**Como usar:** Estes códigos serão impressos nos cartões-postais físicos que cada equipe recebe.

### 2. Coordenadas GPS dos Pontos de Partida

Obtenha as coordenadas no Google Maps:
1. Acesse [Google Maps](https://maps.google.com)
2. Clique com botão direito no local desejado
3. Clique em "Coordenadas" (elas serão copiadas)
4. Cole no formato `"latitude,longitude"` (sem espaços)

```javascript
coordenadas: {
  azul:    "-22.912345,-47.123456",   // Substituir pelas coordenadas reais
  verde:   "-22.913456,-47.124567",
  amarela: "-22.914567,-47.125678",
  roxa:    "-22.915678,-47.126789",
  laranja: "-22.916789,-47.127890",
  vermelha: "-22.917890,-47.128901",
}
```

**Como funciona:** Estas coordenadas ficam escondidas no código-fonte de cada página de equipe. Os jogadores precisam inspecionar o HTML para encontrá-las.

### 3. Autores-Chave e Links do Instagram das Duplas

Primeiro, crie 3 contas no Instagram (uma para cada dupla). Depois:

```javascript
duplas: {
  dupla1: {
    autorChave: "Machado de Assis",              // Escolher um autor da lista
    instagram:  "https://instagram.com/arg_dupla1"  // Link real da conta
  },
  dupla2: {
    autorChave: "Clarice Lispector",
    instagram:  "https://instagram.com/arg_dupla2"
  },
  dupla3: {
    autorChave: "Jorge Amado",
    instagram:  "https://instagram.com/arg_dupla3"
  },
}
```

**Importante:** O `autorChave` precisa estar presente na lista `autoresBiblioteca` (já vem preenchida com 15 autores brasileiros).

### 4. Frase-Chave Final

A mesma para todas as equipes:

```javascript
fraseChaveFinal: "A BIRITA SUMIU ABRAM O OPEN BAR"
```

**Dica:** Escolha uma frase relacionada à lore do ARG que será revelada no dossiê físico.

### 5. Mensagem de Encerramento

```javascript
mensagemFinal: "A birita foi encontrada! O open bar está aberto."
```

Esta mensagem aparece quando a equipe acerta a frase-chave na página final.

## 🚀 Como Hospedar o Site

### 🔒 Controle de acesso entre etapas

O projeto registra na sessão do navegador a equipe que entrou pelo portal e bloqueia navegação casual fora de ordem:

- As páginas de equipe exigem que o código tenha sido validado no portal.
- Cada biblioteca aceita somente as duas equipes da sua dupla.
- O notebook final exige que uma biblioteca tenha sido alcançada.

Essa camada evita que participantes abram URLs futuras por engano, mas **não é uma proteção de segurança real**: em um site estático, qualquer arquivo publicado pode ser descoberto e o `sessionStorage` pode ser alterado pelo usuário.

Para que as páginas futuras não fiquem visíveis no repositório ou acessíveis por URL, use uma destas opções:

1. Mantenha o repositório privado e publique somente os arquivos da etapa atual, fazendo um novo deploy a cada avanço.
2. Separe cada etapa em um deploy privado/independente e publique a próxima URL apenas no momento correto.
3. Use um servidor com autenticação, sessões no backend e rotas protegidas se precisar de bloqueio real.

Não coloque segredos reais em `config.js` ou em qualquer HTML publicado: todo JavaScript enviado ao navegador pode ser lido.

### Opção 1: GitHub Pages (Recomendado - Grátis)

1. Crie uma conta no [GitHub](https://github.com) se ainda não tiver
2. Crie um novo repositório (pode ser privado ou público)
3. Faça upload de todos os arquivos da pasta `arg-site`
4. Vá em **Settings** > **Pages**
5. Em "Source", selecione a branch `main` e pasta `/ (root)`
6. Clique em **Save**
7. Aguarde alguns minutos e acesse a URL fornecida (formato: `https://seuusuario.github.io/nome-do-repo`)

### Opção 2: Netlify (Muito Fácil - Grátis)

1. Acesse [Netlify](https://www.netlify.com/)
2. Crie uma conta (pode usar o GitHub)
3. Clique em **"Add new site"** > **"Deploy manually"**
4. Arraste a pasta `arg-site` inteira para a área indicada
5. Pronto! O site estará no ar em segundos
6. Você receberá uma URL tipo `https://random-name.netlify.app`

### Opção 3: Vercel (Rápido - Grátis)

1. Acesse [Vercel](https://vercel.com/)
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Importe o repositório ou faça upload dos arquivos
5. Deploy automático!

### Opção 4: Servidor Local (Para Testes)

1. Abra o arquivo `index.html` diretamente no navegador (funciona via `file://`)
2. OU use um servidor local simples:
   ```bash
   # Se tiver Python instalado:
   python -m http.server 8000
   
   # Se tiver Node.js:
   npx serve
   ```
3. Acesse `http://localhost:8000`

## 🎮 Fluxo do Jogo

### 1. Portal de Entrada (`index.html`)
- Equipe digita o código do cartão-postal
- É redirecionada para `e.html?chave=TOKEN_DO_DIA`
- O token é calculado automaticamente com a equipe e a data local do dispositivo

### 2. Rota Genérica da Equipe (`e.html`)
- O arquivo físico mantém sempre o mesmo nome.
- A URL muda diariamente, por exemplo: `e.html?chave=3e48ff24`.
- A página valida o token e identifica a equipe correta.
- As coordenadas GPS ficam disponíveis no console e no elemento oculto após a validação.
- Jogadores precisam abrir "Inspecionar Elemento" ou o console.

**Dica para os jogadores:** Há uma frase sutil no rodapé indicando que devem procurar na estrutura da página.

### 3. Enigma Físico no Local
*(Fora do escopo deste site - organize fisicamente)*

### 4. Biblioteca de Autores (`biblioteca/dupla[1-3].html`)
- Lista de 15 autores brasileiros
- Apenas 1 autor (o `autorChave`) revela o link do Instagram
- Os outros autores mostram mensagens neutras

### 5. Instagram das Duplas
*(Fora do escopo - crie as contas e poste as pistas)*

### 6. Notebook Final (`final/notebook.html`)
- Qualquer equipe pode acessar
- Campo único para digitar a frase-chave
- Se acertar: mensagem de encerramento + efeito de confete 🎉

## 🧪 Como Testar Antes do Evento

### Checklist de Testes:

- [ ] Testar cada código de equipe no portal de entrada
- [ ] Verificar se código inválido mostra erro
- [ ] Abrir cada página de equipe e inspecionar o código-fonte para confirmar que as coordenadas aparecem corretamente
- [ ] Copiar as coordenadas e colar no Google Maps para verificar se abre o local correto
- [ ] Testar a biblioteca de autores: clicar em vários autores e confirmar que apenas o `autorChave` revela o Instagram
- [ ] Verificar se o link do Instagram abre em nova aba
- [ ] Testar a página final com a frase-chave correta e uma incorreta
- [ ] Testar em celular (Chrome/Safari) pois os jogadores usarão mobile

### Teste Rápido de Cada Equipe:

1. Vá para `index.html`
2. Digite o código da Equipe Azul
3. Na página azul, pressione `Ctrl+U` (Windows) ou `Cmd+Option+U` (Mac) para ver código-fonte
4. Procure por comentários `<!-- -->` ou elementos com `data-coords` / `data-location`
5. Copie as coordenadas e teste no Google Maps

## 📱 Compatibilidade

- ✅ Chrome (Desktop e Mobile)
- ✅ Safari (Desktop e Mobile)
- ✅ Firefox
- ✅ Edge
- ✅ Funciona offline após carregado (cache do navegador)
- ✅ Não requer internet estável durante o evento

## 🔧 Solução de Problemas

### As coordenadas não aparecem na página da equipe

- Verifique se você preencheu `assets/config.js` corretamente
- As coordenadas devem estar no formato `"latitude,longitude"` (entre aspas)
- Certifique-se de que não há espaços extras

### O código da equipe não funciona

- Códigos são case-insensitive (maiúsculas/minúsculas não importam)
- Verifique se o código em `config.js` está exatamente igual ao impresso no cartão
- O código deve estar em UPPERCASE no arquivo config

### A frase-chave não é aceita mesmo estando correta

- A verificação ignora maiúsculas/minúsculas e acentos
- Certifique-se de que `fraseChaveFinal` em `config.js` está correto
- Teste com e sem acentos

### O link do Instagram não funciona

- Verifique se a URL está completa: `https://instagram.com/usuario`
- Teste o link diretamente no navegador
- Certifique-se de que a conta não é privada (ou adicione as equipes como seguidores)

## 🎨 Personalização (Opcional)

### Mudar Cores das Equipes

Edite as variáveis CSS no arquivo `assets/style.css`:

```css
:root {
  --azul: #2E75B6;
  --verde: #38761D;
  /* etc... */
}
```

### Adicionar/Remover Autores da Biblioteca

Edite a lista `autoresBiblioteca` em `assets/config.js`:

```javascript
autoresBiblioteca: [
  "Machado de Assis",
  "Clarice Lispector",
  // Adicione mais autores aqui
]
```

## 📞 Suporte Durante o Evento

### URLs Importantes (Anote e Tenha à Mão):

- URL principal do site: `____________________`
- URL do notebook final: `_____/final/notebook.html`
- URLs das bibliotecas:
  - Dupla 1: `_____/biblioteca/dupla1.html`
  - Dupla 2: `_____/biblioteca/dupla2.html`
  - Dupla 3: `_____/biblioteca/dupla3.html`

### Se uma Equipe Perder o Código:

Consulte o arquivo `assets/config.js` ou tenha uma lista impressa dos códigos.

### Se uma Equipe Não Conseguir Encontrar as Coordenadas:

**Dica gradual a dar:**
1. "A resposta não está na tela, está na estrutura"
2. "Vocês já ouviram falar em 'inspecionar elemento'?"
3. "Clique com botão direito na página e escolha 'Inspecionar' ou 'Ver código-fonte'"
4. "Procure por comentários ou atributos escondidos no HTML"

## 📄 Licença

Este projeto foi criado especificamente para uma gincana privada. Sinta-se livre para adaptar para seus próprios eventos!

---

**🍾 Boa sorte com o ARG! Que a birita seja encontrada e o open bar seja liberado!**
