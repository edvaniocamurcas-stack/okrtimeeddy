function carregarMorningBriefing(dados) {
  const alvo = document.getElementById("morning-briefing");
  if (!alvo) return;

  const resumo = dados.resumo || {};
  const escolas = dados.top_prioritarias || [];

  const altoRisco = escolas.filter((e) =>
    String(e.risco || "").toLowerCase().includes("alto")
  ).length;

  const assinatura = escolas.filter((e) =>
    String(e.etapa || "").toLowerCase().includes("assinatura")
  ).length;

  const renovacao = resumo.Percentual_Renovacao || "--";
  const gap = resumo.Gap_Renovacao || "--";

  alvo.innerHTML = `
    <div class="card-saude">
      <h2>☀️ Bom dia, Edvânio</h2>
      <p>Sua carteira foi atualizada com os dados mais recentes.</p>

      <hr>

      <h3>🎯 Situação Atual</h3>
      <p><strong>Renovação:</strong> ${renovacao}%</p>
      <p><strong>Gap Renovação:</strong> ${moeda(gap)}</p>
      <p><strong>Escolas em Assinatura:</strong> ${assinatura}</p>
      <p><strong>Escolas Alto Risco:</strong> ${altoRisco}</p>

      <hr>

      <h3>🔥 Prioridade de Hoje</h3>
      <p>Concentre esforços nas escolas em assinatura, alto risco e maior ACV.</p>
    </div>
  `;
}