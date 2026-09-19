(function () {
  const STORAGE_KEY = "arg-placar-v1";
  const ROSTER_KEY = "arg-equipes-v1";
  const COMPETITORS_KEY = "arg-competidores-v1";
  const BRACKET_RESULTS_KEY = "arg-vencedores-chaveamentos-v1";
  const teams = ["azul", "verde", "amarela", "roxa", "laranja", "vermelha"];
  const teamNames = { azul: "Azul", verde: "Verde", amarela: "Amarela", roxa: "Roxa", laranja: "Laranja", vermelha: "Vermelha" };
  const teamColors = { azul: "#2474a6", verde: "#4f7d2c", amarela: "#d89b19", roxa: "#7352a4", laranja: "#d66d2b", vermelha: "#c0392b" };
  const games = ARG_CONFIG.jogos;
  const basePoints = ARG_CONFIG.graduacaoJogos;
  let results = readResults();
  let roster = readStorage(ROSTER_KEY, {});
  let competitors = readStorage(COMPETITORS_KEY, {});
  let bracketResults = readStorage(BRACKET_RESULTS_KEY, {});

  const elements = {
    rankingGrid: document.getElementById("rankingGrid"),
    resultsList: document.getElementById("resultsList"), roundCount: document.getElementById("roundCount"),
    statusText: document.getElementById("statusText"), pointsLegend: document.getElementById("pointsLegend"), gameSections: document.getElementById("gameSections")
  };

  const setupElements = {
    rosterInput: document.getElementById("rosterInput"), rosterFile: document.getElementById("rosterFile"),
    rosterList: document.getElementById("rosterList"), rosterCount: document.getElementById("rosterCount"),
    rosterFeedback: document.getElementById("rosterFeedback")
  };

  function readResults() {
    return readStorage(STORAGE_KEY, {});
  }

  function readStorage(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (error) { return fallback; }
  }

  function saveResults() { localStorage.setItem(STORAGE_KEY, JSON.stringify(results)); }
  function saveRoster() { localStorage.setItem(ROSTER_KEY, JSON.stringify(roster)); }
  function saveCompetitors() { localStorage.setItem(COMPETITORS_KEY, JSON.stringify(competitors)); }
  function saveBracketResults() { localStorage.setItem(BRACKET_RESULTS_KEY, JSON.stringify(bracketResults)); }
  function teamLabel(team) { return teamNames[team] || team; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]; }); }
  const placementKeys = ["primeiro", "segundo", "terceiro", "quarto", "quinto", "sexto"];
  const placementLabels = ["1º", "2º", "3º", "4º", "5º", "6º"];
  function pointsFor(game, placement) { return basePoints[placement] * game.peso; }

  function fillSelect(select) {
    select.innerHTML = "<option value=\"\">Escolha a equipe</option>" + teams.map(function (team) {
      return "<option value=\"" + team + "\">" + teamLabel(team) + "</option>";
    }).join("");
  }

  function ranking() {
    const totals = teams.map(function (team) { return { team: team, total: 0, wins: 0 }; });
    games.forEach(function (game) {
      const result = results[game.id];
      if (!result || !result.finalized) return;
      result.placements.forEach(function (team, index) {
        const entry = totals.find(function (item) { return item.team === team; });
        const placement = placementKeys[index];
        if (entry) { entry.total += pointsFor(game, placement); if (index === 0) entry.wins += 1; }
      });
    });
    return totals.sort(function (a, b) { return b.total - a.total || b.wins - a.wins || teams.indexOf(a.team) - teams.indexOf(b.team); });
  }

  function renderRanking() {
    elements.rankingGrid.innerHTML = ranking().map(function (entry, index) {
      return "<article class=\"rank-card rank-" + (index + 1) + "\" style=\"--team-color:" + teamColors[entry.team] + "\"><div class=\"rank-number\">" + String(index + 1).padStart(2, "0") + "</div><div class=\"team-mark\">" + teamLabel(entry.team).charAt(0) + "</div><div class=\"team-info\"><strong>Equipe " + teamLabel(entry.team) + "</strong><span>" + entry.wins + " vitória" + (entry.wins === 1 ? "" : "s") + "</span></div><div class=\"total-points\"><strong>" + entry.total + "</strong><span>pontos</span></div></article>";
    }).join("");
  }

  function renderResults() {
    const completed = games.filter(function (game) { return results[game.id] && results[game.id].finalized; });
    elements.roundCount.textContent = completed.length + "/" + games.length + " jogos";
    elements.statusText.textContent = completed.length ? completed.length + " de " + games.length + " jogos encerrados" : "nenhum jogo encerrado";
    elements.resultsList.innerHTML = games.map(function (game) {
      const result = results[game.id];
      if (!result || !result.finalized) return "<div class=\"result-row pending\"><span class=\"result-status\">○</span><strong>" + game.nome + "</strong><span class=\"pending-label\">" + (result ? "resultado preparado · não finalizado" : "aguardando resultado") + "</span></div>";
      return "<div class=\"result-row\"><span class=\"result-status done\">✓</span><strong>" + game.nome + "</strong><span class=\"result-winners\">" + result.placements.map(function (team, index) { return "<b>" + placementLabels[index] + " " + teamLabel(team) + "</b>"; }).join("") + "</span><button class=\"edit-result\" type=\"button\" data-game=\"" + game.id + "\">Editar</button></div>";
    }).join("");
  }

  function renderRoster() {
    const names = Object.values(roster).reduce(function (total, members) { return total + members.length; }, 0);
    setupElements.rosterCount.textContent = names + (names === 1 ? " nome" : " nomes");
    setupElements.rosterList.innerHTML = teams.map(function (team) {
      const members = roster[team] || [];
      return "<div class=\"roster-team\" style=\"--team-color:" + teamColors[team] + "\"><strong>" + teamLabel(team) + "</strong><span>" + (members.length ? members.join(" · ") : "nenhum nome importado") + "</span></div>";
    }).join("");
  }

  function renderGameSections() {
    const openGames = Array.from(elements.gameSections.querySelectorAll("[data-game-card][open]")).map(function (card) { return card.dataset.gameCard; });
    elements.gameSections.innerHTML = games.map(function (game) {
      const finalized = results[game.id] && results[game.id].finalized;
      return "<details class=\"game-card\" data-game-card=\"" + game.id + "\"><summary class=\"game-card-summary\"><div><p class=\"eyebrow\">Jogo " + (games.indexOf(game) + 1) + "</p><h3>" + game.nome + "</h3><span>peso " + game.peso + " · " + (finalized ? "finalizado e pontuando" : "em preparação") + "</span></div><label class=\"final-toggle\" onclick=\"event.stopPropagation()\"><input type=\"checkbox\" data-finalize-game=\"" + game.id + "\"" + (finalized ? " checked" : "") + "><span></span><b>Finalizado</b></label></summary><div class=\"game-card-body\"><div class=\"game-subsection\" data-competitors=\"" + game.id + "\"></div><div class=\"game-subsection\" data-format=\"" + game.id + "\"></div></div></details>";
    }).join("");
    openGames.forEach(function (gameId) {
      const card = elements.gameSections.querySelector("[data-game-card=\"" + gameId + "\"]");
      if (card) card.open = true;
    });
  }

  function parseRoster(text) {
    const parsed = {};
    text.split(/\r?\n/).forEach(function (line) {
      const clean = line.trim();
      if (!clean) return;
      let separator = clean.match(/^([^:;,]+)\s*[:;,]\s*(.+)$/);
      if (!separator) return;
      const team = teams.find(function (item) { return teamLabel(item).toLowerCase() === separator[1].trim().toLowerCase(); });
      if (!team) return;
      separator[2].split(/\s*,\s*/).map(function (name) { return name.trim(); }).filter(Boolean).forEach(function (name) {
        if (!parsed[team]) parsed[team] = [];
        if (!parsed[team].includes(name)) parsed[team].push(name);
      });
    });
    return parsed;
  }

  function renderFormats() {
    games.forEach(function (game) {
      const formatTarget = document.querySelector("[data-format=\"" + game.id + "\"]");
      formatTarget.innerHTML = (function () {
      const gameResults = bracketResults[game.id] || {};
      const participantsFor = function (team) {
        if (game.tipo === "arg") return "equipe inteira";
        const selected = competitors[game.id] && competitors[game.id][team];
        return selected && selected.length ? selected.map(escapeHtml).join(" · ") : "participante não definido";
      };
      const teamBlock = function (team, role, key) { const selected = gameResults[key] === team ? " selected" : ""; return "<button type=\"button\" class=\"bracket-team bracket-clickable" + selected + "\" data-bracket-game=\"" + game.id + "\" data-bracket-key=\"" + key + "\" data-bracket-team=\"" + team + "\" style=\"--team-color:" + teamColors[team] + "\"><i>" + teamLabel(team).charAt(0) + "</i><div><strong>" + (role ? role + " · " : "") + teamLabel(team) + "</strong><small>" + participantsFor(team) + "</small></div></button>"; };
      const orderFor = function (key, availableTeams) { const savedOrder = gameResults[key]; return savedOrder && savedOrder.length === availableTeams.length && savedOrder.every(function (team) { return availableTeams.includes(team); }) ? savedOrder : availableTeams; };
      const orderLane = function (label, key, availableTeams) { return "<div class=\"order-lane\"><span>" + label + "</span><div class=\"order-list\" data-order-game=\"" + game.id + "\" data-order-key=\"" + key + "\">" + orderFor(key, availableTeams).map(function (team, index) { return "<button type=\"button\" draggable=\"true\" class=\"order-team\" data-order-team=\"" + team + "\" style=\"--team-color:" + teamColors[team] + "\"><b>" + (index + 1) + "</b><i>" + teamLabel(team).charAt(0) + "</i><span><strong>" + teamLabel(team) + "</strong><small>" + participantsFor(team) + "</small></span><em>arraste</em></button>"; }).join("") + "</div></div>"; };
      const finalSlots = function (slots) { return "<div class=\"final-column\"><span class=\"stage-label\">CLASSIFICAÇÃO FINAL</span>" + slots.map(function (slot) { const team = slot.team || gameResults[slot.key]; return team ? "<div class=\"final-slot filled\" style=\"--team-color:" + teamColors[team] + "\"><strong>" + slot.label + " · " + teamLabel(team) + "</strong><small>" + participantsFor(team) + "</small></div>" : "<div class=\"final-slot\"><strong>" + slot.label + "</strong><small>ordem ainda não definida</small></div>"; }).join("") + "</div>"; };
      const match = function (first, second, key) { const winner = gameResults[key]; return "<div class=\"match\"><button type=\"button\" class=\"match-pill" + (winner === first ? " selected" : "") + "\" style=\"--team-color:" + teamColors[first] + "\" data-bracket-game=\"" + game.id + "\" data-bracket-key=\"" + key + "\" data-bracket-team=\"" + first + "\"><strong>" + teamLabel(first) + "</strong><small>" + participantsFor(first) + "</small></button><b class=\"match-x\">×</b><button type=\"button\" class=\"match-pill" + (winner === second ? " selected" : "") + "\" style=\"--team-color:" + teamColors[second] + "\" data-bracket-game=\"" + game.id + "\" data-bracket-key=\"" + key + "\" data-bracket-team=\"" + second + "\"><strong>" + teamLabel(second) + "</strong><small>" + participantsFor(second) + "</small></button></div>"; };
      const finalOrder = function (finalTeams) { return orderFor("ordem-final", finalTeams); };
      const standings = function (groupTeams, prefix) { return groupTeams.slice().sort(function (a, b) { return (gameResults[prefix + "-" + b] || 0) - (gameResults[prefix + "-" + a] || 0); }).map(function (team, index) { return "<div class=\"standing-row\"><b>" + (index + 1) + "º</b><strong>" + teamLabel(team) + "</strong><span>" + (gameResults[prefix + "-" + team] || 0) + " vitórias</span></div>"; }).join(""); };
      const winnerOf = function (groupTeams, prefix) { return groupTeams.slice().sort(function (a, b) { return (gameResults[prefix + "-" + b] || 0) - (gameResults[prefix + "-" + a] || 0); })[0]; };
      let visual;
      let typeLabel;
      if (game.chaveamento === "grupos-final-4") {
        typeLabel = "2 grupos de 3 → final com 4";
        const orderA = orderFor("ordem-a", teams.slice(0, 3));
        const orderB = orderFor("ordem-b", teams.slice(3));
        const finalists = [orderA[0], orderA[1], orderB[0], orderB[1]];
        const finalTeams = finalOrder(finalists);
        visual = "<div class=\"bracket-flow bracket-groups\"><div class=\"group-pair\"><div class=\"bracket-column\"><span class=\"heat-label\">Grupo A · arraste para ordenar</span>" + orderLane("ordem final do grupo", "ordem-a", orderA) + "</div><div class=\"bracket-column\"><span class=\"heat-label\">Grupo B · arraste para ordenar</span>" + orderLane("ordem final do grupo", "ordem-b", orderB) + "</div></div><div class=\"bracket-arrow\">→</div><div class=\"final-column\"><span class=\"stage-label\">FINAL · arraste para ordenar</span>" + orderLane("resultado da final", "ordem-final", finalTeams) + "</div></div>";
      } else if (game.chaveamento === "todos-contra-todos-final") {
        typeLabel = "3 confrontos por grupo → final";
        const championA = winnerOf(teams.slice(0, 3), "a");
        const championB = winnerOf(teams.slice(3), "b");
        const groupsComplete = ["a-1", "a-2", "a-3", "b-1", "b-2", "b-3"].every(function (key) { return gameResults[key]; });
        const finalMatch = function (first, second) { return "<div class=\"final-match\"><span class=\"stage-label\">FINAL · clique no campeão</span><button type=\"button\" class=\"match-pill" + (gameResults.final === first ? " selected" : "") + "\" style=\"--team-color:" + teamColors[first] + "\" data-bracket-game=\"" + game.id + "\" data-bracket-key=\"final\" data-bracket-team=\"" + first + "\"><strong>" + teamLabel(first) + "</strong><small>" + participantsFor(first) + "</small></button><b class=\"match-x\">×</b><button type=\"button\" class=\"match-pill" + (gameResults.final === second ? " selected" : "") + "\" style=\"--team-color:" + teamColors[second] + "\" data-bracket-game=\"" + game.id + "\" data-bracket-key=\"final\" data-bracket-team=\"" + second + "\"><strong>" + teamLabel(second) + "</strong><small>" + participantsFor(second) + "</small></button></div>"; };
        visual = "<div class=\"bracket-flow bracket-groups\"><div class=\"group-pair\"><div class=\"bracket-column matches-column\"><span class=\"heat-label\">Grupo A · clique na vencedora</span>" + match("azul", "verde", "a-1") + match("azul", "amarela", "a-2") + match("verde", "amarela", "a-3") + "<div class=\"standings\"><b>Classificação</b>" + standings(teams.slice(0, 3), "a") + "</div></div><div class=\"bracket-column matches-column\"><span class=\"heat-label\">Grupo B · clique na vencedora</span>" + match("roxa", "laranja", "b-1") + match("roxa", "vermelha", "b-2") + match("laranja", "vermelha", "b-3") + "<div class=\"standings\"><b>Classificação</b>" + standings(teams.slice(3), "b") + "</div></div></div><div class=\"bracket-arrow\">→</div><div class=\"final-column\">" + (groupsComplete ? finalMatch(championA, championB) : "<span class=\"stage-label\">FINAL</span><div class=\"final-slot\"><strong>Campeões dos grupos</strong><small>conclua os 6 confrontos acima</small></div>") + "</div></div>";
      } else {
        typeLabel = "bateria única com 6 equipes";
        const order = orderFor("ordem", teams);
        visual = "<div class=\"bracket-flow\"><div class=\"bracket-column all-teams\"><span class=\"heat-label\">Largada · arraste para ordenar</span>" + orderLane("ordem de chegada", "ordem", order) + "</div><div class=\"bracket-arrow\">→</div>" + finalSlots(order.map(function (team, index) { return { team: team, label: placementLabels[index] + " lugar" }; })) + "</div>";
      }
      return "<div class=\"format-card\"><div class=\"format-card-header\"><div><strong>Chaveamento</strong><span>" + typeLabel + "</span></div><span class=\"weight-tag\">peso " + game.peso + "</span></div>" + visual + "</div>";
      }());
    });
  }

  function renderCompetitors() {
    games.forEach(function (game) {
      if (game.tipo === "arg") {
        document.querySelector("[data-competitors=\"" + game.id + "\"]").innerHTML = "<article class=\"competitor-card all-participants\"><div class=\"competitor-card-heading\"><div><strong>" + game.nome + "</strong><span>Todos participam automaticamente</span></div><b>equipe inteira</b></div><p>O ARG pontua a equipe inteira. Não é necessário escalar integrantes.</p></article>";
        return;
      }
      const saved = competitors[game.id] || {};
      const teamCards = teams.map(function (team) {
        const members = roster[team] || [];
        if (!members.length) return "<div class=\"competitor-team empty\"><strong>" + teamLabel(team) + "</strong><span>Cadastre os nomes na seção 1</span></div>";
        const selectedMembers = saved[team] || [];
        return "<fieldset class=\"competitor-team\"><legend style=\"--team-color:" + teamColors[team] + "\">" + teamLabel(team) + "</legend>" + members.map(function (member) {
          const checked = saved[team] && saved[team].includes(member) ? " checked" : "";
          const disabled = !checked && selectedMembers.length >= game.maxCompetidores ? " disabled" : "";
          return "<label class=\"member-check\"><input type=\"checkbox\" data-game=\"" + game.id + "\" data-team=\"" + team + "\" value=\"" + escapeHtml(member) + "\"" + checked + disabled + "><span>" + escapeHtml(member) + "</span></label>";
        }).join("") + "</fieldset>";
      }).join("");
      document.querySelector("[data-competitors=\"" + game.id + "\"]").innerHTML = "<div class=\"competitor-card\"><div class=\"competitor-card-heading\"><div><strong>Escalação</strong><span>" + (game.limiteDescricao || "Até " + game.maxCompetidores + " competidor" + (game.maxCompetidores === 1 ? "" : "es") + " por equipe") + "</span></div><b>" + (game.chaveamento === "bateria-unica" ? "bateria única" : "por grupos") + "</b></div><div class=\"competitor-teams\">" + teamCards + "</div></div>";
    });
  }

  function updateAutomaticResult(game) {
    const gameResults = bracketResults[game.id] || {};
    let placements;
    if (game.chaveamento === "bateria-unica") {
      placements = (gameResults.ordem || []).slice(0, 6);
    } else if (game.chaveamento === "grupos-final-4") {
      const orderA = gameResults["ordem-a"] || [];
      const orderB = gameResults["ordem-b"] || [];
      const finalists = [orderA[0], orderA[1], orderB[0], orderB[1]];
      const finalOrder = (gameResults["ordem-final"] || finalists).slice(0, 4);
      placements = finalOrder.concat(orderA[2], orderB[2]);
    } else {
      const finalWinner = gameResults.final;
      const championA = winnerOfGroup(teams.slice(0, 3), "a", gameResults);
      const championB = winnerOfGroup(teams.slice(3), "b", gameResults);
      const finalLoser = finalWinner === championA ? championB : championA;
      const remaining = teams.filter(function (team) { return team !== finalWinner && team !== finalLoser; }).sort(function (a, b) { return groupWins(b, gameResults) - groupWins(a, gameResults); });
      placements = [finalWinner, finalLoser].concat(remaining);
    }
    if (placements.length === 6 && placements.every(Boolean) && new Set(placements).size === 6) {
      results[game.id] = { placements: placements, finalized: Boolean(results[game.id] && results[game.id].finalized), updatedAt: new Date().toISOString() };
      saveResults();
    }
  }

  function groupWins(team, gameResults) { return ["a-1", "a-2", "a-3", "b-1", "b-2", "b-3"].reduce(function (total, key) { return total + (gameResults[key] === team ? 1 : 0); }, 0); }
  function winnerOfGroup(groupTeams, prefix, gameResults) { return groupTeams.slice().sort(function (a, b) { return groupWins(b, gameResults) - groupWins(a, gameResults); })[0]; }

  function render() {
    elements.pointsLegend.innerHTML = placementLabels.map(function (label, index) {
      return "<span>" + label + " " + basePoints[placementKeys[index]] + " pts</span>";
    }).join("");
    renderGameSections(); renderRanking(); renderResults(); renderRoster(); renderCompetitors(); renderFormats();
  }

  document.getElementById("saveRoster").addEventListener("click", function () {
    const imported = parseRoster(setupElements.rosterInput.value);
    roster = Object.assign({}, roster, imported); saveRoster(); renderRoster(); renderCompetitors();
    const importedCount = Object.values(imported).reduce(function (total, members) { return total + members.length; }, 0);
    setupElements.rosterFeedback.textContent = importedCount ? importedCount + " nomes salvos." : "Nenhum nome reconhecido. Confira o formato das linhas.";
    setupElements.rosterFeedback.className = "form-feedback " + (importedCount ? "success" : "error");
  });

  setupElements.rosterFile.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", function () { setupElements.rosterInput.value = reader.result; });
    reader.readAsText(file);
  });

  elements.gameSections.addEventListener("click", function (event) {
    const finalize = event.target.closest("[data-finalize-game]");
    if (finalize) {
      return;
    }
    const orderTeam = event.target.closest("[data-order-team]");
    const orderList = event.target.closest("[data-order-game][data-order-key]");
    if (orderTeam && orderList) {
      const selectedTeam = orderList.dataset.selectedTeam;
      if (!selectedTeam) {
        orderList.dataset.selectedTeam = orderTeam.dataset.orderTeam;
        orderTeam.classList.add("selected");
        return;
      }
      if (selectedTeam === orderTeam.dataset.orderTeam) {
        delete orderList.dataset.selectedTeam;
        orderTeam.classList.remove("selected");
        return;
      }
      const order = Array.from(orderList.querySelectorAll("[data-order-team]")).map(function (item) { return item.dataset.orderTeam; });
      const fromIndex = order.indexOf(selectedTeam);
      const toIndex = order.indexOf(orderTeam.dataset.orderTeam);
      order[fromIndex] = order[toIndex];
      order[toIndex] = selectedTeam;
      const gameId = orderList.dataset.orderGame;
      if (!bracketResults[gameId]) bracketResults[gameId] = {};
      bracketResults[gameId][orderList.dataset.orderKey] = order;
      saveBracketResults();
      updateAutomaticResult(games.find(function (item) { return item.id === gameId; }));
      render();
      return;
    }
    const option = event.target.closest("[data-bracket-game][data-bracket-key][data-bracket-team]");
    if (!option) return;
    const gameId = option.dataset.bracketGame;
    const game = games.find(function (item) { return item.id === gameId; });
    if (!bracketResults[gameId]) bracketResults[gameId] = {};
    const gameResults = bracketResults[gameId];
    const key = option.dataset.bracketKey;
    const team = option.dataset.bracketTeam;
    Object.keys(gameResults).forEach(function (savedKey) {
      if (savedKey !== key && gameResults[savedKey] === team && (key.indexOf("place-") === 0 || key.indexOf("grupo-") === 0)) delete gameResults[savedKey];
    });
    gameResults[key] = team;
    if (game.chaveamento === "todos-contra-todos-final" && /^(a|b)-\d+$/.test(key)) {
      const prefix = key.charAt(0);
      const groupTeams = prefix === "a" ? teams.slice(0, 3) : teams.slice(3);
      groupTeams.forEach(function (groupTeam) { delete gameResults[prefix + "-" + groupTeam]; });
      ["1", "2", "3"].forEach(function (matchNumber) {
        const winner = gameResults[prefix + "-" + matchNumber];
        if (winner) gameResults[prefix + "-" + winner] = (gameResults[prefix + "-" + winner] || 0) + 1;
      });
    }
    saveBracketResults();
    updateAutomaticResult(game);
    renderFormats();
    renderRanking();
    renderResults();
  });

  elements.gameSections.addEventListener("change", function (event) {
    const finalize = event.target.closest("[data-finalize-game]");
    if (!finalize) return;
    const gameId = finalize.dataset.finalizeGame;
    const game = games.find(function (item) { return item.id === gameId; });
    updateAutomaticResult(game);
    if (!results[gameId]) results[gameId] = { placements: [], finalized: false };
    results[gameId].finalized = finalize.checked;
    saveResults();
    render();
  });

  elements.gameSections.addEventListener("dragstart", function (event) {
    const item = event.target.closest("[data-order-team]");
    if (item) { event.stopPropagation(); event.dataTransfer.setData("text/plain", item.dataset.orderTeam); }
  });

  elements.gameSections.addEventListener("dragover", function (event) {
    if (event.target.closest("[data-order-team]")) event.preventDefault();
  });

  elements.gameSections.addEventListener("drop", function (event) {
    const target = event.target.closest("[data-order-team]");
    const list = event.target.closest("[data-order-game][data-order-key]");
    if (!target || !list) return;
    event.preventDefault();
    event.stopPropagation();
    const draggedTeam = event.dataTransfer.getData("text/plain");
    const order = Array.from(list.querySelectorAll("[data-order-team]")).map(function (item) { return item.dataset.orderTeam; });
    const fromIndex = order.indexOf(draggedTeam);
    const toIndex = order.indexOf(target.dataset.orderTeam);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
    order.splice(fromIndex, 1); order.splice(toIndex, 0, draggedTeam);
    const gameId = list.dataset.orderGame;
    if (!bracketResults[gameId]) bracketResults[gameId] = {};
    bracketResults[gameId][list.dataset.orderKey] = order;
    saveBracketResults();
    const game = games.find(function (item) { return item.id === gameId; });
    updateAutomaticResult(game);
    render();
  });

  elements.gameSections.addEventListener("change", function (event) {
    const input = event.target;
    if (!input.matches("[data-game][data-team]")) return;
    const game = games.find(function (item) { return item.id === input.dataset.game; });
    if (!competitors[input.dataset.game]) competitors[input.dataset.game] = {};
    if (!competitors[input.dataset.game][input.dataset.team]) competitors[input.dataset.game][input.dataset.team] = [];
    const selected = competitors[input.dataset.game][input.dataset.team];
    if (input.checked && !selected.includes(input.value)) {
      if (selected.length >= game.maxCompetidores) { input.checked = false; window.alert("Esta equipe pode ter no máximo " + game.maxCompetidores + " competidor" + (game.maxCompetidores === 1 ? "" : "es") + " nesta modalidade."); return; }
      selected.push(input.value);
    }
    if (!input.checked) competitors[input.dataset.game][input.dataset.team] = selected.filter(function (member) { return member !== input.value; });
    saveCompetitors(); renderCompetitors(); renderFormats();
  });


  document.getElementById("resetButton").addEventListener("click", function () {
    if (window.confirm("Zerar todos os resultados deste computador?")) { results = {}; bracketResults = {}; saveResults(); saveBracketResults(); render(); }
  });

  document.getElementById("refreshButton").addEventListener("click", function () {
    window.location.reload();
  });

  render();
}());
