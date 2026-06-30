function gerarDecisionEngine(dados) {
  const escolas = dados.top_prioritarias || [];

  return escolas
    .map((item) => {
      const acv = numero(item.acv_base || item.acv || 0);
      const risco = String(item.risco || "").toLowerCase();
      const etapa = String(item.etapa || "").toLowerCase();

      let score = 10;
      const motivos = [];
      let acao = "monitorar evolução";

      if (acv >= 3000000) {
        score += 40;
        motivos.push("alto impacto financeiro");
      }

      if (risco.includes("alto")) {
        score += 35;
        motivos.push("risco alto");
        acao = "acionar intervenção com o CSP";
      }

      if (etapa.includes("assinatura")) {
        score += 45;
        motivos.push("próxima de assinatura");
        acao = "priorizar fechamento hoje";
      }

      if (etapa.includes("negociação") || etapa.includes("negociacao")) {
        score += 25;
        motivos.push("negociação ativa");
        acao = "destravar negociação";
      }

      const impactoEsperado = Math.round(acv * (score / 100));

      return {
        titulo: item.escola,
        csp: nomeCSP(item.csp),
        acv,
        score,
        impactoEsperado,
        acao,
        motivos
      };
    })
    .sort((a, b) => b.impactoEsperado - a.impactoEsperado)
    .slice(0, 5);
}

function carregarDecisionCenter(decisoes) {
  const alvo = document.getElementById("decision-center");
  if (!alvo) return;

  alvo.innerHTML = `
    <div class="cards-saude">
      ${decisoes.map((d, index) => `
        <div class="card-saude">
          <h3>${index + 1}º Decisão Prioritária</h3>
          <p><strong>${d.titulo}</strong></p>
          <p>CSP: ${d.csp}</p>
          <p><strong>Impacto esperado:</strong> ${moeda(d.impactoEsperado)}</p>
          <p><strong>Ação recomendada:</strong> ${d.acao}</p>
          <p><strong>Motivos:</strong></p>
          <ul>
            ${d.motivos.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>
  `;
}