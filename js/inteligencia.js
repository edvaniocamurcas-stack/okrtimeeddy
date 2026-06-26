function calcularInteligencia(dados){

    const resumo = dados.resumo;

    return {

        renovacaoBaixa:
            numero(resumo.Percentual_Renovacao) < 20,

        gapAlto:
            numero(resumo.Gap_Real) > 50000000,

        fundoGrande:
            numero(resumo.Fundo_Funil_ACV) > 5000000,

        churnBaixo:
            numero(resumo.Churn_ACV) < 1000000

    };

}
