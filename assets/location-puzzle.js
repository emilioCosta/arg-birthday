const ARG_LOCATION_PUZZLE = {
  mount({ team, coordinates }) {
    if (!coordinates || coordinates.includes('PREENCHER')) {
      return;
    }

    const root = document.createElement('section');
    root.className = 'location-puzzle';
    root.innerHTML = `
      <h2>Monte a pista</h2>
      <p class="puzzle-instruction">Reorganize o doodle e revele o próximo destino.</p>
      <div class="puzzle-board" role="group" aria-label="Quebra-cabeça deslizante 4 por 4"></div>
      <p class="puzzle-status" aria-live="polite">Toque em uma peça ao lado do espaço vazio.</p>
      <div class="puzzle-reward" hidden>
        <p>A passagem foi reconstruída.</p>
        <p class="coordinates-output"></p>
      </div>
    `;
    const container = document.querySelector('.container');
    const footer = container.querySelector('.footer');
    container.insertBefore(root, footer || null);

    const board = root.querySelector('.puzzle-board');
    const status = root.querySelector('.puzzle-status');
    const reward = root.querySelector('.puzzle-reward');
    const coordinatesOutput = reward.querySelector('.coordinates-output');
    const solved = Array.from({ length: 16 }, (_, index) => index === 15 ? null : index);
    const tiles = solved.slice();
    let emptyIndex = 15;

    for (let move = 0; move < 80; move += 1) {
      const neighbors = ARG_LOCATION_PUZZLE.neighbors(emptyIndex);
      const nextIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
      tiles[emptyIndex] = tiles[nextIndex];
      tiles[nextIndex] = null;
      emptyIndex = nextIndex;
    }

    if (tiles.every((tile, index) => tile === solved[index])) {
      const nextIndex = ARG_LOCATION_PUZZLE.neighbors(emptyIndex)[0];
      tiles[emptyIndex] = tiles[nextIndex];
      tiles[nextIndex] = null;
      emptyIndex = nextIndex;
    }

    function render() {
      board.replaceChildren();
      tiles.forEach((tile, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = tile === null ? 'puzzle-tile puzzle-empty' : 'puzzle-tile';
        button.setAttribute('aria-label', tile === null ? 'Espaço vazio' : `Trecho ${tile + 1} do doodle`);
        if (tile !== null) {
          const row = Math.floor(tile / 4);
          const column = tile % 4;
          button.style.setProperty('--tile-position-x', `${column * 33.3333}%`);
          button.style.setProperty('--tile-position-y', `${row * 33.3333}%`);
          button.addEventListener('click', () => moveTile(index));
        }
        board.appendChild(button);
      });
    }

    function moveTile(index) {
      if (!reward.hidden) {
        return;
      }

      if (!ARG_LOCATION_PUZZLE.neighbors(emptyIndex).includes(index)) {
        return;
      }
      tiles[emptyIndex] = tiles[index];
      tiles[index] = null;
      emptyIndex = index;
      render();

      if (tiles.every((tile, tileIndex) => tile === solved[tileIndex])) {
        finishPuzzle();
      }
    }

    function finishPuzzle() {
      tiles.splice(0, tiles.length, ...solved);
      emptyIndex = 15;
      render();
      status.hidden = true;
      const [latitude, longitude] = coordinates.split(',').map(value => value.trim());
      coordinatesOutput.replaceChildren();
      [
        ['Latitude', latitude],
        ['Longitude', longitude]
      ].forEach(([label, value]) => {
        const item = document.createElement('span');
        item.className = 'coordinate-item';
        item.innerHTML = `<small>${label}</small><strong>${value}</strong>`;
        coordinatesOutput.appendChild(item);
      });
      reward.hidden = false;
      board.setAttribute('aria-hidden', 'true');
      board.hidden = true;
      board.style.pointerEvents = 'none';
      board.querySelectorAll('button').forEach(button => {
        button.disabled = true;
      });
      ARG_LOCATION_PUZZLE.celebrate();
    }

    render();
  },

  neighbors(index) {
    const row = Math.floor(index / 4);
    const column = index % 4;
    const result = [];
    if (row > 0) result.push(index - 4);
    if (row < 3) result.push(index + 4);
    if (column > 0) result.push(index - 1);
    if (column < 2) result.push(index + 1);
    return result;
  },

  celebrate() {
    const confettiLayer = document.createElement('div');
    const colors = ['#C0392B', '#2474A6', '#F1C232', '#38761D', '#674EA7', '#E69138'];
    confettiLayer.className = 'confetti-layer';
    confettiLayer.setAttribute('aria-hidden', 'true');

    for (let index = 0; index < 72; index += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--confetti-color', colors[index % colors.length]);
      piece.style.setProperty('--confetti-left', `${Math.random() * 100}%`);
      piece.style.setProperty('--confetti-delay', `${Math.random() * 0.35}s`);
      piece.style.setProperty('--confetti-duration', `${1.8 + Math.random() * 1.2}s`);
      piece.style.setProperty('--confetti-rotation', `${Math.random() * 720 - 360}deg`);
      confettiLayer.appendChild(piece);
    }

    document.body.appendChild(confettiLayer);
    window.setTimeout(() => confettiLayer.remove(), 3400);
  }
};
