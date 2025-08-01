const tecidosPorSegmento = {
  Fitness: ['Poliamida', 'Suplex', 'DryFit', 'Lycra stretch', 'Neoprene leve'],
  Praia: ['Lycra UV', 'Poliéster elastano', 'Microfibra', 'Tule', 'Malha arrastão'],
  Lingerie: ['Renda', 'Tule', 'Microfibra', 'Cotton', 'Meia malha leve'],
  Festa: ['Chiffon', 'Cetim', 'Veludo', 'Tule bordado', 'Crepe', 'Organza'],
  Casual: ['Algodão', 'Tricoline', 'Malha PV', 'Malha Fria', 'Oxford', 'Linho', 'Moletom']
};

const botoes = document.querySelectorAll('.segmento');
const menu = document.getElementById('menuTecido');
const inputTecido = document.getElementById('tecidoSelecionado');
const displayTecido = document.getElementById('tecidoSelecionadoVisivel');

const qtd = document.getElementById('quantidade');
const preco = document.getElementById('preco');
const data = document.getElementById('data');
const resultado = document.getElementById('resultado');

botoes.forEach(botao => {
  botao.addEventListener('click', (event) => {
    event.preventDefault(); // impede que o botão recarregue a página

    // Ativa visualmente o botão selecionado
    botoes.forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');

    const segmento = botao.dataset.segmento;
    const tecidos = tecidosPorSegmento[segmento] || [];

    menu.innerHTML = ''; // limpa o menu
    tecidos.forEach(tecido => {
      const div = document.createElement('div');
      div.classList.add('item'); // adicionar um item para cada div
      div.textContent = tecido;
      menu.appendChild(div);
    });

    menu.classList.remove('escondido'); // exibe o menu que estava escondido com display do tipo none


    const rect = event.target.getBoundingClientRect();

    // Posiciona o menu abaixo do botão clicado
    menu.style.position = 'absolute';
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    menu.style.display = 'block';
  });
});

menu.addEventListener('click', (event) => {
  if (event.target.classList.contains('item')) {
    const tecidoEscolhido = event.target.textContent;
    inputTecido.value = tecidoEscolhido;
    displayTecido.textContent = tecidoEscolhido;
    menu.style.display = 'none';
  }
});

function calcularValorVenda() {
  const quantidade = parseFloat(qtd.value.replace(',', '.')) || 0;
  const precoMetro = parseFloat(preco.value.replace(',', '.')) || 0;
  const total = quantidade * precoMetro;

  resultado.textContent = `Valor da venda: R$ ${total.toFixed(2)}`;
}

qtd.addEventListener('input', calcularValorVenda);
preco.addEventListener('input', calcularValorVenda);



// Banco de Dados
document.getElementById('form-venda').addEventListener('submit', async function(e) {
  e.preventDefault();

  const segmento = document.querySelector('.segmento.active')?.dataset.segmento || '';
  const nomeTecido = inputTecido.value;
  const quantidade = parseFloat(qtd.value.replace(',', '.'));
  const precoMetro = parseFloat(preco.value.replace(',', '.'));
  const dataVenda = data.value;

  try {
    const resposta = await fetch('/api/vendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        segmento,
        nomeTecido,
        quantidade,
        preco: precoMetro,
        data: dataVenda
      })
    });

    const resultado = await resposta.json();
    alert(resultado.message);
  } catch (erro) {
    alert('Erro ao registrar venda');
    console.error(erro);
  }
});
