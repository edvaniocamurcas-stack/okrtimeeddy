function carregarDashboard(resumo) {

    preencher("acv-base", moeda(resumo.ACV_Base));
    preencher("acv-renovado", moeda(resumo.ACV_Renovado));
    preencher("percentual-renovacao", percentual(resumo.Percentual_Renovacao));
    preencher("escolas", resumo.Escolas);

}
