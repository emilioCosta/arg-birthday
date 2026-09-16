# Sistema de Coordenadas com Google Maps

## ✅ Implementação Concluída

Todas as 6 páginas de equipes agora incluem integração com Google Maps para as coordenadas.

### Páginas Atualizadas:
- ✅ `equipes/azul.html`
- ✅ `equipes/verde.html`
- ✅ `equipes/amarela.html`
- ✅ `equipes/roxa.html`
- ✅ `equipes/laranja.html`
- ✅ `equipes/vermelha.html`

---

## Como Funciona

### 1. Console do Navegador
Quando a equipe abre a página, o console exibe:
```
📍 COORDENADAS ENCONTRADAS!
Equipe [Cor] - Ponto de Partida
Coordenadas: -23.550520, -46.633308
🗺️  Abrir no Google Maps: https://www.google.com/maps/search/?api=1&query=-23.550520,%20-46.633308
```

### 2. Link Oculto Clicável
Um elemento oculto é injetado na página com um botão estilizado:
- Invisível por padrão
- Pode ser revelado pelo console com o comando:
```javascript
document.getElementById('secret-location-[cor]').style.cssText = 'display: block; opacity: 1; position: fixed; bottom: 20px; right: 20px; z-index: 9999; padding: 20px; background: rgba(26,26,26,0.95); border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.8);';
```

### 3. Formato do Link
```html
https://www.google.com/maps/search/?api=1&query=LATITUDE,LONGITUDE
```

---

## Personalização por Equipe

Cada página tem cores específicas:

| Equipe   | Cor Console | Cor Botão    |
|----------|-------------|--------------|
| Azul     | #0B5394     | #0B5394      |
| Verde    | #38761D     | #38761D      |
| Amarela  | #F1C232     | #F1C232      |
| Roxa     | #674EA7     | #674EA7      |
| Laranja  | #E69138     | #E69138      |
| Vermelha | #C0392B     | #8B0000      |

---

## Para os Organizadores

### Definir Coordenadas
Edite o arquivo `assets/config.js`:

```javascript
coordenadas: {
  azul: "-23.550520,-46.633308",     // Praça da Sé, São Paulo
  verde: "-23.561414,-46.655881",    // Parque Ibirapuera
  amarela: "PREENCHER",
  roxa: "PREENCHER",
  laranja: "PREENCHER",
  vermelha: "PREENCHER"
}
```

### Como Obter Coordenadas
1. Abra o Google Maps
2. Clique com botão direito no local desejado
3. Clique nas coordenadas que aparecem no topo
4. Cole no formato: `latitude,longitude` (sem espaços extras)

---

## Experiência do Participante

1. **Descobrir a Pista**: Equipes precisam inspecionar o código ou abrir o console
2. **Ver as Coordenadas**: Console mostra as coordenadas formatadas
3. **Abrir no Maps**: Podem clicar no link do console OU revelar o botão oculto
4. **Ir até o Local**: Google Maps abre mostrando o ponto exato

---

## Vantagens desta Implementação

✅ **Link Direto**: Clique e vá direto para o Google Maps  
✅ **Compatível**: Funciona em desktop e mobile  
✅ **Oculto**: Mantém o espírito investigativo do ARG  
✅ **Estilizado**: Botões com cores das equipes  
✅ **Consistente**: Mesmo padrão em todas as 6 páginas  

---

## Exemplo de Uso

```javascript
// No console da página azul:
📍 COORDENADAS ENCONTRADAS!
Equipe Azul - Ponto de Partida
Coordenadas: -23.550520,-46.633308
🗺️  Abrir no Google Maps: https://www.google.com/maps/search/?api=1&query=-23.550520,-46.633308

// Clicar no link abre automaticamente o Google Maps na localização
```

---

**Documentação atualizada:** Dezembro 2024
