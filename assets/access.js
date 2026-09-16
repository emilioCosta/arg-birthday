// Controle de fluxo do ARG: impede acesso casual a URLs fora de ordem.
// Para proteção real, publique as etapas em fases ou use autenticação no servidor.
const ARG_ACCESS = {
  currentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  tokenFor(team) {
    const value = `${team}:${this.currentDate()}`;
    let hash = 2166136261;

    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, '0');
  },

  resolveTeam(token) {
    const teams = ['azul', 'verde', 'amarela', 'roxa', 'laranja', 'vermelha'];
    return teams.find(team => this.tokenFor(team) === token) || null;
  },

  startTeam(team) {
    sessionStorage.setItem('arg_team', team);
    sessionStorage.removeItem('arg_library');
    sessionStorage.removeItem('arg_final');
  },

  requireTeam(team) {
    if (sessionStorage.getItem('arg_team') !== team) {
      window.location.replace('../index.html?acesso=necessario');
      return false;
    }
    return true;
  },

  unlockLibrary(dupla) {
    sessionStorage.setItem('arg_library', dupla);
  },

  requireLibrary(dupla, teams) {
    const team = sessionStorage.getItem('arg_team');
    if (!teams.includes(team)) {
      window.location.replace('../index.html?acesso=necessario');
      return false;
    }
    this.unlockLibrary(dupla);
    return true;
  },

  requireFinal() {
    if (!sessionStorage.getItem('arg_library')) {
      window.location.replace('../index.html?acesso=necessario');
      return false;
    }
    sessionStorage.setItem('arg_final', 'true');
    return true;
  }
};
