function nomeCSP(email) {
  const nomes = {
    "carlacosta@sas.com.br": "Carla Costa",
    "flaviodasilva@sas.com.br": "Flávio Silva",
    "gabriellabarreto@sas.com.br": "Gabriella Barreto",
    "josedemetrio@sas.com.br": "José Demétrio",
    "julianabarbosa@sas.com.br": "Juliana Barbosa",
    "marceloanjos@sas.com.br": "Marcelo Anjos",
    "sabrinagarcia@sas.com.br": "Sabrina Garcia",
    "yannacavalcante@sas.com.br": "Yanna Cavalcante"
  };
  return nomes[email] || email;
}
