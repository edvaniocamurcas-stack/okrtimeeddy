function carregarAdvisor(dados, inteligencia){

  const advisor = document.getElementById("executive-advisor");
  if(!advisor) return;

  const resumo = dados.resumo;
  const painel = dados.painel_executivo || [];

  const maiorRisco = [...painel].sort((a,b) =>
    numero(b.alto_risco_acv) - numero(a.alto_risco_acv)
  )[0];

  const maiorFundo = [...painel].sort((a,b) =>
    numero(b.oportunidades_quentes_acv) - numero(a.oportunidades_quentes_acv)
  )[0];

  advisor.innerHTML = `
    <div class="cards-saude">
      <div class="card-saude">
        <h3>🚨 Prioridade 1</h3>
        <p><strong>${nomeCSP(maiorRisco.csp)}</strong></p>
        <p>${moeda(maiorRisco.alto_risco_acv)} em alto risco.</p>
        <p>Ação: Comitê de renovação.</p>
      </div>

      <div class="card-saude">
        <h3>🚀 Prioridade 2</h3>
        <p><strong>${nomeCSP(maiorFundo.csp)}</strong></p>
        <p>${moeda(maiorFundo.oportunidades_quentes_acv)} em fundo de funil.</p>
        <p>Ação: acelerar conversão.</p>
      </div>

      <div class="card-saude">
        <h3>📉 Prioridade 3</h3>
        <p><strong>${moeda(resumo.Gap_Real)}</strong></p>
        <p>Gap real da carteira.</p>
        <p>Ação: priorizar contas de maior ACV.</p>
      </div>
    </div>
  `;
}
