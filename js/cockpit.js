function carregarCockpit(dados) {
  const alvo = document.getElementById("cockpit-executivo");
  if (!alvo) return;

  const resumo = dados.resumo || {};
  const escolas = dados.top_prioritarias || [];
  const painel = dados.painel_executivo || [];

  const renovacao = numero(resumo.Percentual_Renovacao || 0);
  const acvRenovado = numero(resumo.ACV_Renovado || 0);
  const gap = numero(resumo.Gap_Renovacao || 0);
  const forecast = numero(resumo.Forecast_ACV || 0);
  const fundoFunil = numero(resumo.Fundo_Funil_ACV || 0);

  const altoRisco = escolas.filter((e) =>
    String(e.risco || "").toLowerCase().includes("alto")
  );

  const assinatura = escolas.filter((e) =>
    String(e.etapa || "").toLowerCase().includes("assinatura")
  );

  const maiorRiscoCSP = [...painel].sort(
    (a, b) => numero(b.alto_risco_acv) - numero(a.alto_risco_acv)
  )[0];

  const maiorOportunidadeCSP = [...painel].sort(
    (a, b) => numero(b.oportunidades_quentes_acv) - numero(a.oportunidades_quentes_acv)
  )[0];

  const cenarioPessimista = Math.max(0, forecast * 0.8);
  const cenarioRealista = forecast;
  const cenarioOtimista = forecast + fundoFunil * 0.35;

  alvo.innerHTML = `
    <div class="cards-saude">

      <div class="card-saude">
        <h3>🎯 Foco da Semana</h3>
        <p><strong>OKR prioritário:</strong> Renovação</p>
        <p><strong>Atual:</strong> ${renovacao}%</p>
        <p><strong>ACV renovado:</strong> ${moeda(acvRenovado)}</p>
        <p><strong>Gap:</strong> ${moeda(gap)}</p>
      </div>

      <div class="card-saude">
        <h3>🔥 Onde agir hoje</h3>
        <p><strong>${assinatura.length}</strong> escolas em assinatura</p>
        <p><strong>${altoRisco.length}</strong> escolas em alto risco</p>
        <p>Priorize conversão, risco e contas de maior ACV.</p>
      </div>

      <div class="card-saude">
        <h3>👥 Onde o líder deve atuar</h3>
        <p><strong>Maior risco:</strong> ${maiorRiscoCSP ? nomeCSP(maiorRiscoCSP.csp) : "--"}</p>
        <p>${maiorRiscoCSP ? moeda(maiorRiscoCSP.alto_risco_acv) : "--"} em alto risco</p>
        <p><strong>Maior oportunidade:</strong> ${maiorOportunidadeCSP ? nomeCSP(maiorOportunidadeCSP.csp) : "--"}</p>
        <p>${maiorOportunidadeCSP ? moeda(maiorOportunidadeCSP.oportunidades_quentes_acv) : "--"} em oportunidades quentes</p>
      </div>

      <div class="card-saude">
        <h3>📊 Cenários da Carteira</h3>
        <p>🔴 Pessimista: <strong>${moeda(cenarioPessimista)}</strong></p>
        <p>🟡 Realista: <strong>${moeda(cenarioRealista)}</strong></p>
        <p>🟢 Otimista: <strong>${moeda(cenarioOtimista)}</strong></p>
      </div>

    </div>
  `;
}