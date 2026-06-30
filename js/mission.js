function carregarMissionControl(dados) {
  const alvo = document.getElementById("mission-control");
  if (!alvo) return;

  const lista = (dados.top_prioritarias || [])
    .map((item) => ({
      ...item,
      mission: calcularMissionScore(item),
    }))
    .sort((a, b) => b.mission.score - a.mission.score)
    .slice(0, 5);

  alvo.innerHTML = `
    <div class="cards-saude">
      ${lista.map((item, index) => `
        <div class="card-saude">
          <h3>${index + 1}º ${item.mission.classificacao}</h3>
          <p><strong>${item.escola}</strong></p>
          <p>${nomeCSP(item.csp)}</p>
          <p><strong>${moeda(item.acv_base)}</strong></p>
          <p>${item.risco} • ${item.etapa}</p>

          <hr>

          <p><strong>Ação sugerida:</strong></p>
          <p>${item.mission.acaoPrincipal}</p>

          <p><strong>Por que priorizar:</strong></p>
          <ul>
            ${item.mission.motivos.map((motivo) => `<li>${motivo}</li>`).join("")}
          </ul>

          <p><strong>Mission Score:</strong> ${item.mission.score}</p>
        </div>
      `).join("")}
    </div>
  `;
}