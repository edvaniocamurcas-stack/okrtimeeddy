function carregarMorningBriefing(dados) {

    const alvo = document.getElementById("morning-briefing");

    if (!alvo) return;

    const altoRisco = dados.escolas.filter(e => e.risco === "Alto").length;

    const assinatura = dados.escolas.filter(e =>
        (e.etapa || "").toLowerCase().includes("assinatura")
    ).length;

    const renovacao = dados.api.renovacaoPercentual;

    alvo.innerHTML = `

        <div class="card-saude">

            <h2>☀️ Bom dia, Edvânio</h2>

            <p>Sua carteira foi atualizada.</p>

            <hr>

            <h3>🎯 Situação Atual</h3>

            <p><strong>Renovação:</strong> ${renovacao}%</p>

            <p><strong>Escolas em Assinatura:</strong> ${assinatura}</p>

            <p><strong>Escolas Alto Risco:</strong> ${altoRisco}</p>

            <hr>

            <h3>🔥 Prioridade de Hoje</h3>

            <p>Concentre esforços nas escolas em Assinatura e Alto Risco.</p>

        </div>

    `;

}