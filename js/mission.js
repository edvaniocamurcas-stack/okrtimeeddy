function carregarMissionControl(dados){

  const alvo = document.getElementById("mission-control");
  if(!alvo) return;

  const escolas = dados.top_prioritarias || [];

  const lista = (dados.top_prioritarias || [])
    .map(item => ({
        ...item,
        mission: calcularMissionScore(item)
    }))
    .sort((a,b) => b.mission.score - a.mission.score)
    .slice(0,5);

  alvo.innerHTML = `
    <div class="cards-saude">
      ${lista.map((item, index) => `
        <div class="card-saude">
          <h3>${item.mission.classificacao}</h3>
          <p><strong>${item.escola}</strong></p>
          <p>${nomeCSP(item.csp)}</p>
          <p><strong>${moeda(item.acv_base)}</strong></p>
          <p><strong>Mission Score:</strong> ${item.mission.score}</p>
          <p>${item.risco} • ${item.etapa}</p>
        </div>
      `).join("")}
    </div>
  `;
}
