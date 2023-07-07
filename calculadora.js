
const selecionar = document.querySelector('#joia')
const colares = document.querySelector('.colares')
const brincos = document.querySelector('.brincos')
const pulseiras = document.querySelector('.pulseiras')
const conjuntos = document.querySelector('.conjuntos')
const pecas = document.querySelectorAll('.opcoes')
const botao = document.querySelector('#botao-calcular')
const botaoFinalizar = document.querySelector('#botao-finalizar')
const botaoLimpar = document.querySelector('#botao-limpar')
const compras = document.querySelector('.itens-comprados')
const total = document.querySelector('.valor-total')
const precoTotal = document.querySelector('#custo')
const descontoNao = document.querySelector('#opcao-desconto-nao')
const descontoSim = document.querySelector('#opcao-desconto-sim')
const containerDesconto = document.querySelector('.valores-desconto')
const valorDesconto = document.querySelector('#selecionar-desconto')
const campoValorComDesconto = document.querySelector('#custo-com-desconto')


let texto = 'Não houve compra'
let valor = 0
let todasCompras = []
let totalValor = []
let totalQuantidade = []

let custo = 0

function mostraOpcao(event) {
    if(event.target.value == 'brinco') {
        brincos.style.display = 'flex'
        colares.style.display = 'none'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'colar') {
        brincos.style.display = 'none'
        colares.style.display = 'flex'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'conjunto') {
        brincos.style.display = 'none'
        colares.style.display = 'none'
        conjuntos.style.display = 'flex'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'pulseira') {
        brincos.style.display = 'none'
        colares.style.display = 'none'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'flex'
    }
}

function exibeDesconto(event) {
    if(event.target.value == 'sim') {
        containerDesconto.style.display = 'flex'
    } else {
        containerDesconto.style.display = 'none'
    }
}

function calculaDesconto(event) {
    valorComDesconto = custo - (custo * ((event.target.value)/100))
    campoValorComDesconto.innerHTML = valorComDesconto.toFixed(2)
    precoTotal.style.textDecoration = 'line-through'
}

function limpaValores() {
    texto = 'Não houve compra'
    valor = 0
    todasCompras = []
    totalValor = []
    totalQuantidade = []
    custo = 0
    pecas.forEach(opcao =>{
        opcao.getElementsByTagName('input')[0].checked = false
    })
}

function limparTudo() {
    limpaValores();
    limpaTela();
}

function limpaTela() {
    compras.innerHTML = '' 
    total.innerHTML = ''
    precoTotal.innerHTML = ''
    brincos.style.display = 'flex'
    colares.style.display = 'flex'
    conjuntos.style.display = 'flex'
    pulseiras.style.display = 'flex'
}

function iniciaCalculo() {
    limpaTela()
    pecas.forEach(opcao => {
        if (opcao.getElementsByTagName('input')[0].checked) {
            texto = opcao.getElementsByTagName('label')
            valor = opcao.getElementsByTagName('span')
            quantidade = opcao.getElementsByClassName('quantidade')
            totalQuantidade.push(quantidade[0].value)
            todasCompras.push(texto[0].innerHTML)
            totalValor.push(valor[0].innerHTML)
        }
    })
    resultado(totalValor, todasCompras)
}

function resultado(totalidade, produtos) {
    produtos.forEach(function (produto, index) {
        compras.innerHTML += `<p>${totalQuantidade[index]} ${produto}</p>`
    })
    totalidade.forEach(function (valor, index) {
        var extrato = (parseFloat(valor) * totalQuantidade[index]).toFixed(2)
        total.innerHTML += `<p>R$ ${extrato}</p>`

        custo = custo + Number(extrato)
    })
    precoTotal.innerHTML = `R$ ${custo.toFixed(2)}`
    
}


botao.addEventListener('click', iniciaCalculo)
selecionar.addEventListener('change', mostraOpcao)
botaoLimpar.addEventListener('click', limparTudo)
botaoFinalizar.addEventListener('click', limparTudo)
descontoNao.addEventListener('change', exibeDesconto)
descontoSim.addEventListener('change', exibeDesconto)
valorDesconto.addEventListener('change', calculaDesconto)