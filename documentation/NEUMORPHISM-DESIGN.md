# Neumorphism Design System - ARG "A Birita Desaparecida"

## ✨ Transformação Completa do Design

O ARG foi completamente redesenhado seguindo o sistema **Neumorphism (Soft UI)**, criando uma experiência visual tátil, moderna e fisicamente realista.

---

## 🎨 Filosofia de Design

### Core Concept
Neumorfismo cria a ilusão de **profundidade física** através de sombras duplas cuidadosamente balanceadas:
- **Luz** vindo do canto superior esquerdo (top-left)
- **Sombra escura** caindo no canto inferior direito (bottom-right)

### Resultado Visual
- Elementos parecem **extrudados** (levantados da superfície)
- Ou **pressionados** (inset, cavados na superfície)
- Tudo parece ser moldado do **mesmo material** contínuo
- Estética de plástico fosco ou cerâmica suave

---

## 🎯 Paleta de Cores Monocromática

### Base Cool Grey
- **Background**: `#E0E5EC` - A superfície "cool clay" de onde tudo é moldado
- **Texto Primary**: `#3D4852` - Contraste 7.5:1 (WCAG AAA)
- **Texto Muted**: `#6B7280` - Contraste 4.6:1 (WCAG AA)

### Accent Colors
- **Primary Accent**: `#6C63FF` (Violeta suave) - CTAs e foco
- **Secondary Accent**: `#38B2AC` (Teal) - Success states

### Cores das Equipes (Adaptadas)
Mantidas mas usadas apenas como **indicadores decorativos**:
- Azul: `#2E75B6`
- Verde: `#38761D`
- Amarela: `#F1C232`
- Roxa: `#674EA7`
- Laranja: `#E69138`
- Vermelha: `#C0392B`

---

## 🔤 Tipografia

### Display Font
**Plus Jakarta Sans** (500, 600, 700, 800)
- Moderna, geométrica
- Para headlines e títulos
- `font-family: var(--font-display)`

### Body Font
**DM Sans** (400, 500, 700)
- Clean, altamente legível
- Para todo corpo de texto e UI
- `font-family: var(--font-body)`

### Hierarquia
```css
h1: 2.5em, weight 800, letter-spacing -0.02em
h2: 1.75em, weight 700, letter-spacing -0.01em
p: 1.05em, weight 400
```

---

## 💎 Sistema de Sombras (O DNA do Neumorfismo)

### RGBA para Suavidade
Sempre usar `rgba()` para transparência e blend perfeito:
- **Shadow Light**: `rgba(255, 255, 255, 0.5-0.6)`
- **Shadow Dark**: `rgba(163, 177, 198, 0.6-0.7)`

### Extruded (Elementos Levantados)
```css
/* Standard extruded */
box-shadow: 9px 9px 16px var(--shadow-dark), 
            -9px -9px 16px var(--shadow-light);

/* Extruded hover (lifted) */
box-shadow: 12px 12px 20px var(--shadow-dark-strong), 
            -12px -12px 20px var(--shadow-light-strong);

/* Extruded small (para elementos menores) */
box-shadow: 5px 5px 10px var(--shadow-dark), 
            -5px -5px 10px var(--shadow-light);
```

### Inset (Elementos Pressionados)
```css
/* Standard inset (pressed) */
box-shadow: inset 6px 6px 10px var(--shadow-dark), 
            inset -6px -6px 10px var(--shadow-light);

/* Deep inset (inputs, wells) */
box-shadow: inset 10px 10px 20px var(--shadow-dark-strong), 
            inset -10px -10px 20px var(--shadow-light-strong);

/* Inset small (subtle) */
box-shadow: inset 3px 3px 6px var(--shadow-dark), 
            inset -3px -3px 6px var(--shadow-light);
```

---

## 📐 Border Radius

- **Containers/Cards**: `32px` (rounded-[32px]) - Muito suave e amigável
- **Buttons**: `16px` (rounded-2xl)
- **Smaller elements**: `12px` (rounded-xl) ou `9999px` (rounded-full)

**NUNCA use borders** - Sombras definem todas as bordas!

---

## 🎭 Componentes Principais

### Containers (.container)
```css
background: var(--bg-base);
border-radius: 32px;
padding: 48px;
box-shadow: 9px 9px 16px var(--shadow-dark), 
            -9px -9px 16px var(--shadow-light);
transition: all 300ms ease-out;
```
- **Hover**: Lift com `translateY(-2px)` + sombra aumentada

### Inputs
```css
background: var(--bg-base);
border: none;
border-radius: 16px;
/* Deep inset - parece "cavado" */
box-shadow: inset 6px 6px 10px var(--shadow-dark), 
            inset -6px -6px 10px var(--shadow-light);
```
- **Focus**: Deep inset + Accent ring

### Buttons
```css
background: var(--accent);
border-radius: 16px;
/* Extruded com cores adaptadas */
box-shadow: 5px 5px 10px rgba(108, 99, 255, 0.3), 
            -5px -5px 10px rgba(139, 132, 255, 0.1);
```
- **Hover**: `translateY(-1px)` (lift)
- **Active**: `translateY(0.5px)` (press) + inset shadow

### Cards dos Livros (.livro)
```css
background: var(--bg-base);
border-radius: 16px;
padding: 24px;
box-shadow: 5px 5px 10px var(--shadow-dark), 
            -5px -5px 10px var(--shadow-light);
```
- **Hover**: Scale(1.02) + translateY(-2px) + sombra aumentada
- **Active**: Inset shadow (pressed)

### Book Reader Modal
```css
border-radius: 32px;
/* Strong extruded para destaque */
box-shadow: 12px 12px 24px var(--shadow-dark-strong), 
            -12px -12px 24px var(--shadow-light-strong);
```

---

## 🎬 Animações & Micro-interações

### Durations
- **UI Elements**: `300ms` (buttons, hovers)
- **Modals**: `500ms` (elementos pesados)

### Easing
- `ease-out` para desaceleração natural

### Floating Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
Usado nas decorações circulares neumórficas

### Hover States
- Cards: `-translate-y-2px` (2px lift)
- Buttons: `-translate-y-1px` (1px lift)
- Active: `translate-y-0.5px` (0.5px press down)

---

## 🎨 Decorações Visuais

### Círculos Neumórficos
Elementos decorativos em background com alternância de extruded/inset:

```html
<div class="decoration decoration-1"></div>
<div class="decoration decoration-2"></div>
```

```css
.decoration {
  position: fixed;
  border-radius: 50%;
  background: var(--bg-base);
  pointer-events: none;
  z-index: 0;
}

/* Alternando extruded e inset */
.decoration-1 {
  box-shadow: 12px 12px 24px var(--shadow-dark), 
              -12px -12px 24px var(--shadow-light);
  animation: float 6s ease-in-out infinite;
}

.decoration-2 {
  box-shadow: inset 10px 10px 20px var(--shadow-dark), 
              inset -10px -10px 20px var(--shadow-light);
  animation: float 8s ease-in-out infinite 1s;
}
```

---

## ♿ Acessibilidade

### Contraste
- **Primary text** (`#3D4852`): 7.5:1 (WCAG AAA) ✅
- **Muted text** (`#6B7280`): 4.6:1 (WCAG AA) ✅

### Focus States
```css
box-shadow: [inset shadows], 
            0 0 0 2px var(--bg-base), 
            0 0 0 4px var(--accent);
```
Ring com offset de 2px sobre background

### Touch Targets
- Minimum **44x44px** para mobile
- Buttons: `height: 48px` mínimo

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations
```css
@media (max-width: 768px) {
  .container { padding: 32px 24px; }
  h1 { font-size: 2em; }
  .estante { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
}
```

---

## 🚫 Anti-Patterns (Não Fazer)

❌ **Hard Hex Shadows**: Nunca use hex opacos (`#A3B1C6`)
✅ Use `rgba(163, 177, 198, 0.6)` para transparência

❌ **White Backgrounds**: Nunca use `bg-white`
✅ Sempre `var(--bg-base)` (#E0E5EC)

❌ **Flat Buttons**: Buttons devem ter profundidade
✅ Sempre use sombras extruded

❌ **Sharp Corners**: `rounded-lg` é muito afiado
✅ Use `rounded-2xl` (16px) ou maior

❌ **Poor Contrast**: Nunca use #A0AEC0 para body text
✅ Use `var(--text-muted)` (#6B7280) ou mais escuro

❌ **Missing Focus**: Todo elemento interativo precisa de focus visible
✅ Sempre adicione `ring-2 ring-accent` no focus

---

## 📦 Arquivos Modificados

### CSS Principal
- `assets/style.css` - **Completamente reescrito** com sistema neumórfico

### HTML com Decorações
- `index.html` - 3 círculos decorativos
- `biblioteca/dupla1.html` - 2 círculos
- `biblioteca/dupla2.html` - 2 círculos
- `biblioteca/dupla3.html` - 2 círculos
- `final/notebook.html` - 3 círculos

### Mantido Intacto
- Toda funcionalidade JavaScript
- Sistema de livros interativos
- Google Maps integration
- Lógica de validação de códigos
- Estrutura de navegação

---

## 🎯 Benefícios do Novo Design

### Visual
- ✅ **Tátil e físico** - Parece que você pode tocar
- ✅ **Moderno e limpo** - Aesthetic atemporal
- ✅ **Profundidade real** - Não é flat design
- ✅ **Monocromático sofisticado** - Elegância através de sombras

### Técnico
- ✅ **WCAG AA/AAA compliant** - Acessível
- ✅ **Sem dependências** - CSS puro
- ✅ **Performance** - Apenas box-shadow e transform
- ✅ **Responsivo** - Mobile-first

### UX
- ✅ **Feedback tátil** - Hover/active states realistas
- ✅ **Hierarquia clara** - Profundidade indica importância
- ✅ **Suave e calmo** - Não é agressivo visualmente
- ✅ **Consistente** - Mesmo material em todo lugar

---

## 🔧 Como Personalizar

### Mudar Cor Base
```css
:root {
  --bg-base: #E0E5EC; /* Sua cor aqui */
}
```
Mantenha um cinza claro/médio para melhores resultados

### Ajustar Sombras
```css
:root {
  --shadow-dark: rgba(163, 177, 198, 0.6); /* Mais escuro = mais contraste */
  --shadow-light: rgba(255, 255, 255, 0.5); /* Mais claro = menos contraste */
}
```

### Trocar Accent
```css
:root {
  --accent: #6C63FF; /* Sua cor de destaque */
}
```

---

## 📚 Recursos

- **Google Fonts**: Plus Jakarta Sans, DM Sans
- **CSS Variables**: 12 tokens principais
- **Animations**: 4 keyframes (fadeIn, float, pageFlip, bookOpen)
- **Responsive**: 2 breakpoints mobile

---

**Design System**: Neumorphism (Soft UI)  
**Implementado**: Dezembro 2024  
**Compatibilidade**: Chrome, Firefox, Safari, Edge (modernos)  
**Performance**: Excelente (apenas CSS puro)
