function carregarHealthScore(health){

  const alvo = document.getElementById("health-score");
  if(!alvo) return;

  alvo.innerHTML = `
    <div class="cards-saude">
      <div class="card-saude">
        <span>Score Geral</span>
        <strong>${health.score}/100</strong>
        <p>${health.status}</p>
      </div>

      <div class="card-saude">
        <span>Renovação</span>
        <strong>${health.renovacaoScore.toFixed(0)}</strong>
      </div>

      <div class="card-saude">
        <span>Risco</span>
        <strong>${health.riscoScore.toFixed(0)}</strong>
      </div>

      <div class="card-saude">
        <span>Forecast</span>
        <strong>${health.forecastScore.toFixed(0)}</strong>
      </div>
    </div>
  `;
}
