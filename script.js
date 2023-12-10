const key = '276da7a3b5f4c122f19ba3a5bd2eab47';

function colocarDados(dados) {
  document.querySelector('.cidade').innerHTML = 'Tempo em ' + dados.name;
  // Caso nao existir o nome da cidade apagar dodos e mostrar que cidade nao existe
  if (dados.name === undefined) {
    document.querySelector('.cidade').innerHTML = 'cidade nao existe';
    document.querySelector('.graus').innerHTML = '';
    document.querySelector('.status-ceu').innerHTML = '';
    document.querySelector('.umidade').innerHTML = '';
    document.querySelector('.img-status').src = '';
  }

  document.querySelector('.graus').innerHTML =
    Math.floor(dados.main.temp) + 'º celsius';
  document.querySelector('.status-ceu').innerHTML =
    dados.weather[0].description;

  if (dados.weather[0].description === 'nublado') {
    document.body.style.backgroundImage =
      'url("https://images.pexels.com/photos/6334829/pexels-photo-6334829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';
  }

  document.querySelector('.umidade').innerHTML =
    'umidade de: ' + dados.main.humidity + '%';
  document.querySelector(
    '.img-status'
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());
  colocarDados(dados);
  console.log(dados);
}

function cliqueiNoBotao() {
  const cidade = document.querySelector('.input-cidade').value;
  buscarCidade(cidade);
}

function handleKeyboard(event) {
  if (event.key === 'Enter') return cliqueiNoBotao();
}
window.addEventListener('keydown', handleKeyboard);
