# Prompt para IA — Implementação dos Sites do ARG "A Birita Desaparecida"

> Copie este arquivo inteiro e cole como prompt em uma ferramenta de codificação com IA (ex.: Claude Code, Cursor, v0, Lovable, Replit AI). Ele contém tudo que a IA precisa para gerar o conjunto completo de páginas estáticas do ARG. Antes de rodar, preencha os campos marcados com `[PREENCHER: ...]` na seção 6 — são as únicas partes que dependem de decisões da organização (local físico, coordenadas reais, frase-chave etc.).

---

## 1. Objetivo

Construir um conjunto de **sites estáticos simples** (HTML + CSS + JavaScript puro, **sem backend, sem build step, sem frameworks**) que implementam a trilha de um ARG (jogo de realidade alternada) para uma gincana de 6 equipes. O jogo deve funcionar 100% offline-friendly depois de carregado (pode rodar em qualquer hospedagem estática: GitHub Pages, Netlify, Vercel, ou até aberto localmente via `file://`), já que o evento acontece em uma chácara com internet possivelmente instável.

**Não é necessário design bonito ou responsivo de produção** — o importante é a mecânica funcionar exatamente como descrito, com uma estética simples e temática (mistério/investigação, cores das equipes). Times acessam principalmente pelo celular.

---

## 2. Contexto narrativo (para a IA entender o tom)

É uma gincana de aniversário com 60 pessoas em 6 equipes: **Azul, Verde, Amarela, Roxa, Laranja, Preta**. A lore: a birita principal desapareceu pouco antes do open bar. Um ARG paralelo aos jogos revela pistas sobre o esconderijo da garrafa. Quando a frase-chave for resolvida, o open bar é aberto e a equipe ganha uma garrafa de bebida legal. O tom deve ser de **investigação leve, divertido e festeiro**. O consumo é opcional, somente para adultos, com alternativas sem álcool, água e transporte seguro.

As 6 equipes formam 3 duplas fixas:
- **Dupla 1:** Azul + Verde
- **Dupla 2:** Amarela + Roxa
- **Dupla 3:** Laranja + Vermelha

---

## 3. Estrutura da trilha (o que os sites precisam implementar)

```
1. Cartão-postal físico (impresso, fora do escopo deste prompt) → cada equipe tem um CÓDIGO único
2. [SITE A] Portal de entrada — equipe digita o código → é redirecionada para SUA página
3. [SITE B] Página individual da equipe (1 de 6) — visualmente não mostra nada de mapa,
   mas o código-fonte HTML esconde coordenadas do Google Maps em um comentário
4. (offline) Enigma físico no local indicado pelas coordenadas → leva a um novo local físico
5. (offline) 4 quebra-cabeças físicos no novo local (compartilhados por dupla)
6. [SITE C] Página "Biblioteca de Autores" (1 de 3, uma por dupla) — lista de autores/autoras;
   um autor específico da lista, ao ser clicado, revela o link do Instagram da dupla
7. (Instagram, fora do escopo) fotos com mala + dígitos escondidos
8. (mala física, fora do escopo) dossiê + vídeo
9. [SITE D] Página do "notebook final" — campo único onde qualquer equipe digita a
   frase-chave; se acertar, revela a mensagem de encerramento
```

Você vai gerar os **Sites A, B, C e D**. As camadas físicas (enigmas impressos, malas, Instagram) não fazem parte deste prompt.

---

## 4. Requisitos técnicos gerais

- **Stack:** HTML5 + CSS3 + JavaScript vanilla. Nenhuma dependência externa, nenhum build (sem npm/webpack/React). Deve abrir direto no navegador.
- **Estrutura de arquivos** a gerar:
  ```
  /arg-site
    /index.html                  → Site A (portal de entrada)
    /equipes/
      azul.html
      verde.html
      amarela.html
      roxa.html
      laranja.html
      vermelha.html              → Site B (uma página por equipe)
    /biblioteca/
      dupla1.html
      dupla2.html
      dupla3.html                → Site C (uma página por dupla)
    /final/
      notebook.html              → Site D
    /assets/
      style.css                  → estilo compartilhado
      config.js                  → TODOS os dados editáveis (ver seção 5)
    /README.md                   → instruções de deploy e edição para a organização
  ```
- **Um único arquivo `config.js` central** deve concentrar todos os dados variáveis (códigos das equipes, coordenadas, autor-chave de cada dupla, link do Instagram, frase-chave final) para que a organização consiga editar tudo **sem mexer no HTML/CSS**, só nesse arquivo.
- Compatibilidade: precisa funcionar bem em navegador mobile (Chrome/Safari em celular), já que os jogadores vão acessar pelo celular.
- Sem necessidade de acessibilidade avançada, SEO, analytics ou testes automatizados — é um projeto de festa de um dia só.

---

## 5. Especificação de cada site

### Site A — Portal de entrada (`index.html`)

- Página simples com um campo de texto (input) e um botão "Entrar".
- O jogador digita o **código** recebido no cartão-postal.
- JavaScript compara o valor digitado (normalizado: trim + uppercase) contra um mapa `codigo → URL` definido em `config.js`, e redireciona via `window.location.href` para a página da equipe correspondente (dentro de `/equipes/`).
- Se o código não bater com nenhum, mostrar uma mensagem de erro discreta ("Código não reconhecido, verifique seu cartão-postal.") sem dar dicas.
- Visual: fundo escuro, tipografia com uma pegada de cartaz de bar e investigação leve. Um título tipo "A Birita Desaparecida — Pista do Open Bar".
- **Não precisa** ter link nenhum para as outras páginas — é só o formulário.

### Site B — Páginas das equipes (`/equipes/[cor].html`, 6 arquivos)

- Cada página é visualmente **quase vazia de propósito** — uma mensagem enigmática na tela (texto curto, ex.: "Você chegou até aqui. Mas a resposta não está na tela.") e nada mais de relevante visível.
- A pista real (coordenadas do Google Maps do Ponto de Partida daquela equipe) deve estar **escondida no código-fonte HTML**, dentro de um comentário `<!-- -->` OU em um atributo `data-*` de algum elemento invisível (ex.: `<div data-coords="-22.912345,-47.123456" style="display:none"></div>`). Use as duas técnicas espalhadas de forma um pouco diferente entre as 6 páginas, para variar a dificuldade.
- Reforçar visualmente, de forma sutil, que a resposta está "escondida" — por exemplo um texto pequeno no rodapé: "toda página guarda um segredo em sua estrutura" (isso ensina jogadores menos técnicos a abrirem o "Ver código-fonte" / inspecionar elemento do navegador).
- Cada página deve ter a cor-tema da equipe correspondente aplicada discretamente (uma borda, um detalhe, o favicon de fundo etc. — nada muito óbvio).
- As coordenadas reais de cada equipe virão do `config.js` (não deixe hardcoded within cada HTML — a IA deve gerar essas 6 páginas de forma que leiam os dados de `config.js` via JavaScript, OU, se for mais simples, pode gerar coordenadas hardcoded diretamente no comentário de cada HTML — escolha a abordagem mais simples de manter, mas documente a escolha no README).

### Site C — Biblioteca de autores (`/biblioteca/dupla[1-3].html`, 3 arquivos)

- Página estilo "catálogo" ou "estante" simples: uma lista de 10 a 15 nomes de autores/autoras (pode ser uma mistura de autores reais de domínio público — ex.: Machado de Assis, Clarice Lispector, Jorge Amado — e nomes fictícios inventados para a ocasião, à escolha da IA, sem precisar reproduzir textos ou trechos das obras, só os nomes).
- Cada nome é um item clicável (`<button>` ou `<a>`), mas **apenas um autor específico por dupla** (definido em `config.js`) revela, ao ser clicado, um cartão/modal com o link do Instagram daquela dupla. Os demais nomes, ao clicar, podem mostrar uma mensagem neutra tipo "Este não é o arquivo que você procura." — sem indicar quais são "quentes" ou "frios".
- O link do Instagram revelado deve abrir em nova aba (`target="_blank"`) e vir de `config.js`.
- Visual consistente com o tema de "biblioteca/arquivo".

### Site D — Notebook final (`/final/notebook.html`)

- Uma única página, igual para todas as equipes (não há variação por equipe/dupla aqui — é o ponto de convergência).
- Campo de texto + botão "Confirmar".
- JavaScript compara o valor digitado (normalizado: trim + uppercase + remover acentos, para não travar por causa de acentuação) contra a `frase-chave` definida em `config.js`.
- Se acertar: revelar uma tela de "final" com uma mensagem de encerramento (texto definido em `config.js`, com espaço reservado para a organização escrever a mensagem final que quiser) e, opcionalmente, um efeito visual simples de celebração (ex.: confete em CSS/JS puro, sem biblioteca externa).
- Se errar: mensagem neutra de tentativa incorreta, sem revelar quantas letras estão certas nem dar dicas.
- Não precisa de nenhum controle de "quem já tentou" ou de equipe — qualquer pessoa que souber a frase, resolve.

### `assets/config.js` — arquivo central de configuração

Deve exportar um objeto JavaScript simples (sem módulos ES, só `var`/`const` no escopo global, para simplicidade de edição por não-programadores) com esta forma:

```js
const ARG_CONFIG = {
  codigos: {
    "CODIGOAZUL":   "equipes/azul.html",
    "CODIGOVERDE":  "equipes/verde.html",
    "CODIGOAMARELA":"equipes/amarela.html",
    "CODIGOROXA":   "equipes/roxa.html",
    "CODIGOLARANJA":"equipes/laranja.html",
    "CODIGOVERMELHA": "equipes/vermelha.html",
  },
  coordenadas: {
    azul:    "[PREENCHER LAT,LONG]",
    verde:   "[PREENCHER LAT,LONG]",
    amarela: "[PREENCHER LAT,LONG]",
    roxa:    "[PREENCHER LAT,LONG]",
    laranja: "[PREENCHER LAT,LONG]",
    vermelha: "[PREENCHER LAT,LONG]",
  },
  duplas: {
    dupla1: { autorChave: "[PREENCHER NOME DO AUTOR]", instagram: "[PREENCHER URL DO INSTAGRAM]" },
    dupla2: { autorChave: "[PREENCHER NOME DO AUTOR]", instagram: "[PREENCHER URL DO INSTAGRAM]" },
    dupla3: { autorChave: "[PREENCHER NOME DO AUTOR]", instagram: "[PREENCHER URL DO INSTAGRAM]" },
  },
  fraseChaveFinal: "[PREENCHER FRASE-CHAVE]",
  mensagemFinal: "[PREENCHER MENSAGEM DE ENCERRAMENTO]",
};
```

A IA deve ligar todos os 4 sites a esse arquivo (via `<script src="../assets/config.js">` antes do script de cada página), para que a organização só precise editar este único arquivo depois de gerado o site.

---

## 6. Dados que a organização precisa preencher antes do deploy

> **Preencha aqui antes de mandar este prompt pra IA (ou deixe os placeholders e edite o `config.js` depois de gerado — tanto faz).**

- Código secreto de cada equipe (6 códigos, um por cor): `[PREENCHER]`
- Coordenadas GPS do Ponto de Partida de cada equipe (formato `lat,long`, pegue no Google Maps): `[PREENCHER]`
- Autor-chave de cada dupla (o nome que revela o Instagram): `[PREENCHER]`
- Link do Instagram de cada dupla (criar as 3 contas antes): `[PREENCHER]`
- Frase-chave final (a mesma para todas as equipes): `[PREENCHER]`
- Texto da mensagem de encerramento exibida ao acertar a frase-chave: `[PREENCHER]`

---

## 7. Estilo visual

- Paleta neutra de base (fundo escuro, tipo `#1a1a1a` ou `#f5f5f0` — a IA escolhe uma linha coerente) com toques da cor de cada equipe:
  - Azul `#2E75B6` · Verde `#38761D` · Amarela `#F1C232` · Roxa `#674EA7` · Laranja `#E69138` · Preta `#333333`
- Tipografia padrão do sistema (`font-family: system-ui, sans-serif` ou uma serifada do sistema para o clima "arquivo antigo") — não precisa importar fontes externas (evita depender de internet no evento).
- Nada de imagens externas obrigatórias — se quiser adicionar algum ícone, usar emoji ou SVG inline.

---

## 8. Critérios de aceite (o que testar depois de gerado)

- [ ] Digitar um código válido no Site A redireciona para a página correta da equipe.
- [ ] Digitar um código inválido mostra erro sem quebrar a página.
- [ ] Cada uma das 6 páginas de equipe, ao inspecionar o código-fonte (Ctrl+U / "Ver código-fonte"), revela coordenadas de Google Maps coerentes com o que está em `config.js`.
- [ ] Nas páginas de biblioteca, clicar no autor-chave da dupla certa revela o link do Instagram; clicar em qualquer outro nome não revela nada.
- [ ] No notebook final, digitar a frase-chave certa (ignorando maiúsculas/minúsculas e acentos) revela a mensagem de encerramento; qualquer outra tentativa não revela.
- [ ] Todas as páginas abrem corretamente em um celular (testar layout em tela estreita).
- [ ] O site funciona quando aberto localmente (`file://`) e também quando hospedado em qualquer servidor estático simples.
- [ ] Existe um `README.md` explicando como: (1) hospedar o site (ex.: arrastar a pasta para o Netlify, ou GitHub Pages), (2) editar o `config.js` para trocar qualquer dado sem tocar no resto do código.

---

## 9. Instrução final para a IA

Gere todos os arquivos listados na seção 4, completos e funcionais, seguindo as especificações das seções 5, 6 e 7. Onde houver `[PREENCHER: ...]`, deixe o placeholder exatamente como está em `config.js` (não invente coordenadas reais nem links reais) e explique no README que a organização precisa preenchê-los antes do evento. Priorize simplicidade e robustez sobre sofisticação — este site vai ser usado uma única vez, por pessoas no celular, muitas vezes com sinal de internet instável.

---

## 10. Melhorias Implementadas

### 10.1 Design Moderno (Implementado)

O design original básico foi completamente reformulado com:
- **Gradientes e sombras**: Backgrounds com `linear-gradient`, múltiplas camadas de `box-shadow`
- **Glassmorphism**: Efeito de vidro fosco com `backdrop-filter: blur()` e backgrounds `rgba()`
- **Animações**: `@keyframes` para fade-in, glow, flip de páginas
- **Responsividade**: Grid layouts, transições suaves, hover effects
- **CSS Variables**: Sistema de cores centralizado em `:root` para fácil customização

### 10.2 Biblioteca Interativa com Livros PDF (Implementado)

A biblioteca agora inclui um leitor de livros com múltiplas páginas:
- **15 autores brasileiros reais**: Machado de Assis, Clarice Lispector, Jorge Amado, etc.
- **2 páginas por livro**: Cada autor tem conteúdo de 2 páginas com trechos adaptados
- **Modal de leitura**: Interface estilo e-reader com navegação entre páginas
- **Animação de virada**: Efeito CSS de flip ao mudar de página
- **Pista oculta**: Link do Instagram só aparece na última página do autor-chave
- **Dados em `config.js`**: Todo conteúdo dos livros em `ARG_CONFIG.livrosConteudo`

### 10.3 Google Maps Integration (Implementado)

Todas as páginas de equipes agora incluem links diretos para Google Maps:

#### Características:
- **URL Automática**: Gera `https://www.google.com/maps/search/?api=1&query=LAT,LONG`
- **Console Estilizado**: Exibe coordenadas e link clicável no console do navegador
- **Botão Oculto**: Elemento invisível com botão clicável pode ser revelado via console
- **Cores por Equipe**: Cada equipe tem botão estilizado com sua cor específica
- **Compatibilidade**: Funciona em desktop e mobile, abre Google Maps diretamente

#### Como os Jogadores Usam:
1. Abrem o console do navegador (F12 ou inspecionar)
2. Veem as coordenadas formatadas com emoji e cores
3. Clicam no link do console OU revelam o botão oculto
4. Google Maps abre automaticamente na localização

#### Implementação:
Código JavaScript em cada página de equipe:
```javascript
const coordenadas = ARG_CONFIG.coordenadas.[cor];
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordenadas}`;
console.log('📍 COORDENADAS ENCONTRADAS!', mapsUrl);
// Injeta botão oculto clicável na página
```

Ver documentação detalhada em: [`COORDENADAS-MAPS.md`](COORDENADAS-MAPS.md)

---

**Todas as 3 solicitações do usuário foram implementadas:**
1. ✅ Design mais bonito (gradientes, glassmorphism, animações)
2. ✅ Livros PDF de verdade com várias páginas (15 autores, 2 páginas cada)
3. ✅ Coordenadas apontam para Google Maps (links clicáveis, 6 equipes)

---

**Última atualização:** Dezembro 2024
