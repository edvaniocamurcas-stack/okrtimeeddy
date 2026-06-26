function gerarExecutiveCopilot(dados){

    const resumo = dados.resumo;
    const visao = gerarVisaoExecutiva(dados);

    const texto = `
<h2>🤖 Executive Copilot</h2>

<div class="copilot-box">

<p><strong>Bom dia, Edvânio.</strong></p>

<p>
Sua carteira possui
<strong>${resumo.Escolas}</strong> escolas,
com renovação de
<strong>${resumo.Percentual_Renovacao}%</strong>.
</p>

<p>

O maior risco financeiro está concentrado em
<strong>${nomeCSP(visao.maiorRisco.csp)}</strong>,
representando
<strong>${moeda(visao.maiorRisco.alto_risco_acv)}</strong>.

</p>

<p>

A maior oportunidade comercial está em
<strong>${nomeCSP(visao.maiorOportunidade.csp)}</strong>,
com
<strong>${moeda(visao.maiorOportunidade.oportunidades_quentes_acv)}</strong>
em fundo de funil.

</p>

<p>

A recomendação para hoje é:

</p>

<ul>

<li>Priorizar reuniões de renovação.</li>

<li>Acelerar escolas em assinatura.</li>

<li>Revisar contas acima de R$ 1 milhão.</li>

</ul>

</div>
`;

    const alvo = document.getElementById("executive-copilot");

    if(alvo){
        alvo.innerHTML = texto;
    }

}
