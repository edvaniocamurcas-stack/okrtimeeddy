function gerarRadarExecutivo(dados){

    const radar = [];

    const resumo = dados.resumo || {};

    if(Number(resumo.Percentual_Renovacao) < 20){
        radar.push({
            nivel:"🔴",
            titulo:"Renovação abaixo da meta",
            descricao:`Renovação atual em ${resumo.Percentual_Renovacao}% da carteira.`
        });
    }

    if(Number(resumo.Fundo_Funil_ACV) > 5000000){
        radar.push({
            nivel:"🟡",
            titulo:"Grande fundo de funil",
            descricao:`Existem ${moeda(resumo.Fundo_Funil_ACV)} próximos da assinatura.`
        });
    }

    if(Number(resumo.Gap_Real) > 50000000){
        radar.push({
            nivel:"🔴",
            titulo:"Gap elevado",
            descricao:`Gap atual de ${moeda(resumo.Gap_Real)}.`
        });
    }

    return radar;

}
