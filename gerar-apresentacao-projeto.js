const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'ARG - A Birita Desaparecida';
pptx.title = 'ARG - A Birita Desaparecida - Roteiro de Teste';
pptx.subject = 'Fluxo do projeto completo, granular e testavel, espelhando o fluxograma de PROJETO-COMPLETO.md';
pptx.lang = 'pt-BR';

const C = {
  ink: '28313A', paper: 'F4F1EA', muted: '68727B', white: 'FFFFFF',
  blue: '2E75B6', green: '38761D', yellow: 'B58B13', purple: '674EA7',
  orange: 'E07824', black: '333333', digital: '6C63FF', physical: '38B2AC', red: '8B0000',
  assistFill: 'FFF3CD', assistText: '7A5C00', assistBorder: 'D29922'
};

function bg(slide) {
  slide.background = { color: C.paper };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.red }, line: { color: C.red } });
}

function heading(slide, text, sub) {
  slide.addText(text, { x: 0.7, y: 0.4, w: 11.8, h: 0.46, fontSize: 24, bold: true, color: C.ink, margin: 0 });
  if (sub) slide.addText(sub, { x: 0.72, y: 0.9, w: 11.4, h: 0.26, fontSize: 10.5, italic: true, color: C.muted, margin: 0 });
}

function linkButton(slide, text, x, y, w, target, fill = C.ink) {
  slide.addText(text, { x, y, w, h: 0.4, fontSize: 10.5, bold: true, color: C.white, align: 'center', valign: 'mid', margin: 0.03, fill: { color: fill }, line: { color: fill }, hyperlink: { slide: target } });
}

// Lista de verificacao de aceite (o que o testador deve confirmar antes de marcar o passo como ok)
function checklist(slide, items, startY) {
  items.forEach((item, i) => {
    slide.addText(`☐ ${item}`, { x: 0.95, y: startY + i * 0.4, w: 10.6, h: 0.36, fontSize: 13.5, color: C.ink, margin: 0 });
  });
  return startY + items.length * 0.4;
}

// Caixa de resgate: risco de erro/demora e o plano de contingencia do monitor
function redundancyBox(slide, risk, fix, y) {
  const h = 1.0;
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.9, y, w: 10.7, h, rectRadius: 0.05, fill: { color: C.assistFill }, line: { color: C.assistBorder, width: 1.5 } });
  slide.addText('⚠ SE TRAVAR OU DER ERRO (redundância)', { x: 1.1, y: y + 0.08, w: 10.2, h: 0.24, fontSize: 10.5, bold: true, color: C.assistText, margin: 0 });
  slide.addText(`Risco: ${risk}`, { x: 1.1, y: y + 0.34, w: 10.2, h: 0.3, fontSize: 11.5, color: C.assistText, margin: 0 });
  slide.addText(`Resgate: ${fix}`, { x: 1.1, y: y + 0.64, w: 10.2, h: 0.3, fontSize: 11.5, bold: true, color: C.assistText, margin: 0 });
  return y + h;
}

function nodeTag(slide, tag) {
  slide.addText(tag, { x: 10.85, y: 0.42, w: 1.6, h: 0.3, fontSize: 10, bold: true, color: C.muted, align: 'right', margin: 0 });
}

const teams = [
  { name: 'Azul', color: C.blue, page: 'equipes/azul.html', duo: 1 },
  { name: 'Verde', color: C.green, page: 'equipes/verde.html', duo: 1 },
  { name: 'Amarela', color: C.yellow, page: 'equipes/amarela.html', duo: 2 },
  { name: 'Roxa', color: C.purple, page: 'equipes/roxa.html', duo: 2 },
  { name: 'Laranja', color: C.orange, page: 'equipes/laranja.html', duo: 3 },
  { name: 'Vermelha', color: C.red, page: 'equipes/vermelha.html', duo: 3 }
];

const duos = [
  { n: 1, teams: 'Azul + Verde', color: C.blue },
  { n: 2, teams: 'Amarela + Roxa', color: C.yellow },
  { n: 3, teams: 'Laranja + Vermelha', color: C.red }
];

// Numeracao de slides (1-based, na ordem de insercao) para os hyperlinks internos
const SLIDE = {
  MAPA: 1,
  A: 2,
  BC: 3,
  D: 4,
  TEAM_START: 5, // 5..10 (Azul, Verde, Amarela, Roxa, Laranja, Vermelha)
  DUO_START: 11, // 11..13 (Dupla 1, 2, 3)
  INSTA_START: 14, // 14..16
  MALA: 17,
  NOTEBOOK: 18,
  REVEAL: 19
};

function teamSlideNumber(i) { return SLIDE.TEAM_START + i; }
function duoSlideNumber(i) { return SLIDE.DUO_START + i; }
function instaSlideNumber(i) { return SLIDE.INSTA_START + i; }

// ---------- Slide 1: Mapa / índice geral ----------
const map = pptx.addSlide();
bg(map);
map.addText('A BIRITA DESAPARECIDA', { x: 0.8, y: 0.55, w: 11.3, h: 0.55, fontSize: 27, bold: true, color: C.ink, margin: 0 });
map.addText('Roteiro de teste, granular, nó a nó, seguindo o fluxograma de PROJETO-COMPLETO.md', { x: 0.82, y: 1.15, w: 10.5, h: 0.32, fontSize: 13, color: C.muted, margin: 0 });
map.addText('Cada slide seguinte é um checkpoint testável, com critérios de aceite e o resgate para erro/demora.', { x: 0.82, y: 1.5, w: 10.6, h: 0.3, fontSize: 11.5, color: C.ink, margin: 0 });

linkButton(map, '1. CARTÃO-POSTAL', 0.85, 2.05, 2.75, SLIDE.A, C.red);
linkButton(map, '2. PORTAL DE ENTRADA', 3.7, 2.05, 2.75, SLIDE.BC, C.red);
linkButton(map, '3. EQUIPE IDENTIFICADA', 6.55, 2.05, 2.75, SLIDE.D, C.red);
linkButton(map, '17. MALA FÍSICA', 9.4, 2.05, 2.75, SLIDE.MALA, C.physical);

map.addText('4-9. Coordenada → Maps → local → enigma (uma por equipe)', { x: 0.85, y: 2.65, w: 6.2, h: 0.28, fontSize: 10.5, bold: true, color: C.muted, margin: 0 });
teams.forEach((team, i) => {
  const x = 0.85 + (i % 6) * 1.95;
  linkButton(map, team.name.toUpperCase(), x, 2.95, 1.85, teamSlideNumber(i), team.color);
});

map.addText('10-12. Quebra-cabeças + biblioteca (uma por dupla)', { x: 0.85, y: 3.55, w: 6.2, h: 0.28, fontSize: 10.5, bold: true, color: C.muted, margin: 0 });
duos.forEach((duo, i) => {
  linkButton(map, `DUPLA ${duo.n}`, 0.85 + i * 2.45, 3.85, 2.3, duoSlideNumber(i), duo.color);
});

map.addText('13-15. Instagram das duplas', { x: 0.85, y: 4.45, w: 6.2, h: 0.28, fontSize: 10.5, bold: true, color: C.muted, margin: 0 });
duos.forEach((duo, i) => {
  linkButton(map, `INSTAGRAM ${duo.n}`, 0.85 + i * 2.45, 4.75, 2.3, instaSlideNumber(i), C.digital);
});

linkButton(map, '18. NOTEBOOK FINAL', 0.85, 5.55, 3.6, SLIDE.NOTEBOOK, C.red);
linkButton(map, '19. REVELAÇÃO FINAL', 4.6, 5.55, 3.6, SLIDE.REVEAL, C.red);

// ---------- Slide 2: A — Cartão-postal ----------
const sA = pptx.addSlide();
bg(sA);
heading(sA, '1. CARTÃO-POSTAL FÍSICO', 'Nó A → A1 (redundância) → B');
nodeTag(sA, 'FÍSICO · pendente');
let yA = checklist(sA, [
  'Cada equipe recebeu um cartão com código único e legível.',
  'O código impresso bate com o cadastrado em assets/config.js.',
  'O cartão de uma equipe não expõe o código de outra equipe.'
], 1.65);
redundancyBox(sA, 'Cartão perdido, molhado ou ilegível.', 'Monitor confirma o código no backup impresso do GUIA-RAPIDO-EVENTO.md.', yA + 0.3);
linkButton(sA, 'MAPA', 0.82, 6.65, 1.6, SLIDE.MAPA);
linkButton(sA, 'PRÓXIMA: PORTAL', 2.6, 6.65, 2.4, SLIDE.BC, C.red);

// ---------- Slide 3: B/C — Portal de entrada ----------
const sBC = pptx.addSlide();
bg(sBC);
heading(sBC, '2. PORTAL DE ENTRADA', 'Nós B → C → D  |  index.html');
nodeTag(sBC, 'DIGITAL · pronto');
let yBC = checklist(sBC, [
  'Campo aceita o código e normaliza maiúsculas/minúsculas.',
  'Código inválido mostra a mensagem de erro e permite nova tentativa.',
  'Código válido identifica a equipe e redireciona para e.html com o token do dia.'
], 1.65);
redundancyBox(sBC, '3+ tentativas erradas OU site fora do ar / sem internet.', 'Monitor confirma o código no guia impresso, ou usa a cópia offline do site salva em pendrive/celular.', yBC + 0.3);
linkButton(sBC, 'MAPA', 0.82, 6.65, 1.6, SLIDE.MAPA);
linkButton(sBC, 'ANTERIOR', 2.6, 6.65, 1.7, SLIDE.A);
linkButton(sBC, 'PRÓXIMA: EQUIPE', 4.45, 6.65, 2.4, SLIDE.D, C.red);

// ---------- Slide 4: D — Equipe identificada (seletor) ----------
const sD = pptx.addSlide();
bg(sD);
heading(sD, '3. EQUIPE IDENTIFICADA', 'Nó D → escolha de uma das 6 equipes');
nodeTag(sD, 'DECISÃO · pronto');
checklist(sD, [
  'Cada um dos 6 códigos leva exatamente à página da sua própria equipe.',
  'Nenhuma equipe consegue abrir a página de outra equipe sem o código dela.'
], 1.65);
sD.addText('Teste cada equipe individualmente:', { x: 0.95, y: 2.75, w: 6, h: 0.3, fontSize: 12, bold: true, color: C.muted, margin: 0 });
teams.forEach((team, i) => {
  const x = 0.95 + (i % 3) * 3.75;
  const y = 3.15 + Math.floor(i / 3) * 0.65;
  linkButton(sD, `TESTAR ${team.name.toUpperCase()}`, x, y, 3.5, teamSlideNumber(i), team.color);
});
linkButton(sD, 'MAPA', 0.82, 6.65, 1.6, SLIDE.MAPA);
linkButton(sD, 'ANTERIOR', 2.6, 6.65, 1.7, SLIDE.BC);

// ---------- Slides 5-10: uma por equipe (G+H+I+J) ----------
teams.forEach((team, i) => {
  const slide = pptx.addSlide();
  bg(slide);
  heading(slide, `4.${i + 1} EQUIPE ${team.name.toUpperCase()}`, `Nós G${i + 1} → H${i + 1} → I${i + 1} → J${i + 1}  |  ${team.page}`);
  nodeTag(slide, 'DIGITAL+FÍSICO');
  slide.addShape(pptx.ShapeType.rect, { x: 0.76, y: 1.55, w: 0.14, h: 3.55, fill: { color: team.color }, line: { color: team.color } });
  let y = checklist(slide, [
    'A pista escondida no código-fonte leva à coordenada correta da birita.',
    'A coordenada abre o local certo no Google Maps.',
    'O enigma físico do local está montado e resolvível no tempo esperado.'
  ], 1.65);
  redundancyBox(slide, '+15 min sem achar a coordenada, GPS sem sinal, ou +20 min travados no enigma.', 'Monitor dá dica gradual (leve → média → forte), usa coordenada impressa de backup, ou libera a próxima etapa no local.', y + 0.3);
  slide.addText(`Ao concluir, a equipe segue para a Dupla ${team.duo}.`, { x: 0.95, y: y + 1.45, w: 8, h: 0.3, fontSize: 12, bold: true, color: team.color, margin: 0 });
  linkButton(slide, 'MAPA', 0.82, 6.65, 1.5, SLIDE.MAPA);
  linkButton(slide, 'EQUIPES', 2.4, 6.65, 1.6, SLIDE.D);
  linkButton(slide, `DUPLA ${team.duo}`, 4.1, 6.65, 1.8, duoSlideNumber(team.duo - 1), C.digital);
});

// ---------- Slides 11-13: uma por dupla (K+L+M) ----------
duos.forEach((duo, i) => {
  const slide = pptx.addSlide();
  bg(slide);
  heading(slide, `5.${i + 1} DUPLA ${duo.n}: QUEBRA-CABEÇAS + BIBLIOTECA`, `Nós K${duo.n} → L${duo.n} → M${duo.n}  |  ${duo.teams}`);
  nodeTag(slide, 'FÍSICO+DIGITAL');
  let y = checklist(slide, [
    `As equipes ${duo.teams} se encontram no novo local físico compartilhado.`,
    'Os quebra-cabeças físicos da dupla estão completos e resolvíveis.',
    'A biblioteca lista os 15 autores e o autor-chave revela o Instagram correto.'
  ], 1.65);
  redundancyBox(slide, '+10 min sem achar o autor-chave na biblioteca.', 'Monitor revela o autor-chave diretamente para não travar a dupla.', y + 0.3);
  linkButton(slide, 'MAPA', 0.82, 6.65, 1.5, SLIDE.MAPA);
  linkButton(slide, 'INSTAGRAM', 2.4, 6.65, 1.9, instaSlideNumber(i), C.digital);
});

// ---------- Slides 14-16: uma por dupla (N — Instagram) ----------
duos.forEach((duo, i) => {
  const slide = pptx.addSlide();
  bg(slide);
  heading(slide, `6.${i + 1} INSTAGRAM DA DUPLA ${duo.n}`, `Nó N${duo.n} → O  |  Camada social externa ao site`);
  nodeTag(slide, 'DIGITAL · externo');
  let y = checklist(slide, [
    'O perfil da dupla está público e acessível pelo link revelado na biblioteca.',
    'Os posts escondem corretamente os dígitos/pistas que levam à mala.',
    'A pista extraída aponta de forma inequívoca para o local da mala física.'
  ], 1.65);
  redundancyBox(slide, 'Perfil indisponível, privado ou fora do ar.', 'Monitor mostra a impressão em PDF dos posts salvos como backup.', y + 0.3);
  linkButton(slide, 'MAPA', 0.82, 6.65, 1.5, SLIDE.MAPA);
  linkButton(slide, 'DUPLA', 2.4, 6.65, 1.6, duoSlideNumber(i));
  linkButton(slide, 'MALA FÍSICA', 4.1, 6.65, 1.9, SLIDE.MALA, C.physical);
});

// ---------- Slide 17: O/P — Fotos + Mala física ----------
const sMala = pptx.addSlide();
bg(sMala);
heading(sMala, '7. MALA FÍSICA', 'Nós O → P  |  Convergência das 3 duplas');
nodeTag(sMala, 'FÍSICO · pendente');
let yMala = checklist(sMala, [
  'Os dígitos escondidos nas fotos das 3 duplas levam ao mesmo local da mala.',
  'A mala contém o dossiê da birita, o vídeo e a frase-chave completa.',
  'A frase-chave dentro da mala está correta e idêntica à de assets/config.js.'
], 1.65);
redundancyBox(sMala, '+15 min sem encontrar a mala.', 'Monitor aponta o local exato da mala física para manter o ritmo do evento.', yMala + 0.3);
linkButton(sMala, 'MAPA', 0.82, 6.65, 1.6, SLIDE.MAPA);
linkButton(sMala, 'PRÓXIMA: NOTEBOOK', 2.6, 6.65, 2.6, SLIDE.NOTEBOOK, C.red);

// ---------- Slide 18: Q/R — Notebook final ----------
const sNotebook = pptx.addSlide();
bg(sNotebook);
heading(sNotebook, '8. NOTEBOOK FINAL', 'Nós Q → R  |  final/notebook.html');
nodeTag(sNotebook, 'DIGITAL · pronto');
let yNote = checklist(sNotebook, [
  'A validação da frase ignora maiúsculas, minúsculas e acentos.',
  'Frase errada mostra mensagem de tentativa e permite nova tentativa.',
  'Frase correta libera a mensagem final e o efeito de confete.'
], 1.65);
redundancyBox(sNotebook, '5+ tentativas com a frase errada.', 'Monitor confirma a grafia exata da frase no guia impresso.', yNote + 0.3);
linkButton(sNotebook, 'MAPA', 0.82, 6.65, 1.6, SLIDE.MAPA);
linkButton(sNotebook, 'ANTERIOR', 2.6, 6.65, 1.7, SLIDE.MALA);
linkButton(sNotebook, 'REVELAÇÃO FINAL', 4.45, 6.65, 2.5, SLIDE.REVEAL, C.red);

// ---------- Slide 19: S — Revelação final ----------
const sReveal = pptx.addSlide();
bg(sReveal);
heading(sReveal, '9. REVELAÇÃO FINAL', 'Nó S  |  Encerramento do ARG');
nodeTag(sReveal, 'SUCESSO');
sReveal.addText('A birita desaparecida foi encontrada.', { x: 1.0, y: 1.8, w: 9.8, h: 0.5, fontSize: 23, bold: true, color: C.red, margin: 0 });
sReveal.addText('O open bar está aberto: a equipe ganhou uma garrafa especial.', { x: 1.0, y: 2.45, w: 10.2, h: 0.4, fontSize: 18, color: C.ink, margin: 0 });
checklist(sReveal, [
  'A mensagem final e o efeito de confete aparecem corretamente.',
  'O open bar é liberado apenas após a validação da frase-chave.',
  'A garrafa-prêmio é entregue somente a adultos, com água e opções sem álcool disponíveis.'
], 3.15);
linkButton(sReveal, 'MAPA', 0.82, 6.65, 1.8, SLIDE.MAPA);
linkButton(sReveal, 'NOTEBOOK', 2.85, 6.65, 1.8, SLIDE.NOTEBOOK);

pptx.writeFile({ fileName: 'APRESENTACAO-BIRITA-TESTE.pptx' });
