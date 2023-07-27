
const selecionar = document.querySelector('#joia')
const aneis = document.querySelector('.aneis')
const colares = document.querySelector('.colares')
const brincos = document.querySelector('.brincos')
const pulseiras = document.querySelector('.pulseiras')
const conjuntos = document.querySelector('.conjuntos')
const pecas = document.querySelectorAll('.opcoes')
const botaoComprar = document.querySelector('#botao-calcular')
const botaoFinalizar = document.querySelector('#botao-finalizar')
const botaoLimpar = document.querySelector('#botao-limpar')
const compras = document.querySelector('.itens-comprados')
const total = document.querySelector('.valor-total')
const precoTotal = document.querySelector('#custo')
const containerOpcaoDesconto = document.querySelector('.abatimentos')
const descontoNao = document.querySelector('#opcao-desconto-nao')
const descontoSim = document.querySelector('#opcao-desconto-sim')
const containerDesconto = document.querySelector('.valores-desconto')
const valorDesconto = document.querySelector('#selecionar-desconto')
const campoValorComDesconto = document.querySelector('#custo-com-desconto')

let porcentagemDesconto = 0
let valorComDesconto = 0
let texto = 'Não houve compra'
let valor = 0
let todasCompras = []
let totalValor = []
let totalQuantidade = []

let custo = 0

function mostraOpcao(event) {
    if(event.target.value == 'brinco') {
        aneis.style.display = 'none'
        brincos.style.display = 'flex'
        colares.style.display = 'none'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'colar') {
        aneis.style.display = 'none'
        brincos.style.display = 'none'
        colares.style.display = 'flex'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'conjunto') {
        aneis.style.display = 'none'
        brincos.style.display = 'none'
        colares.style.display = 'none'
        conjuntos.style.display = 'flex'
        pulseiras.style.display = 'none'
    } else if (event.target.value == 'pulseira') {
        aneis.style.display = 'none'
        brincos.style.display = 'none'
        colares.style.display = 'none'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'flex'
    } else if (event.target.value == 'anel') {
        aneis.style.display = 'flex'
        brincos.style.display = 'none'
        colares.style.display = 'none'
        conjuntos.style.display = 'none'
        pulseiras.style.display = 'none'
    } else {
        aneis.style.display = 'flex'
        brincos.style.display = 'flex'
        colares.style.display = 'flex'
        conjuntos.style.display = 'flex'
        pulseiras.style.display = 'flex'
    }
}

function exibeDesconto(event) {
    if(event.target.value == 'sim') {
        containerDesconto.style.display = 'flex'
        precoTotal.style.textDecoration = 'line-through'
    } else {
        containerDesconto.style.display = 'none'
        precoTotal.style.textDecoration = 'none'
    }
}

function calculaDesconto(event) {
    porcentagemDesconto = event.target.value
    valorComDesconto = custo - (custo * ((porcentagemDesconto)/100))
    campoValorComDesconto.innerHTML = valorComDesconto.toFixed(2)
    precoTotal.style.textDecoration = 'line-through'
}

function limpaValores(event) {
    texto = 'Não houve compra'
    valor = 0
    todasCompras = []
    totalValor = []
    totalQuantidade = []
    custo = 0
    if(event.target) {
        valorComDesconto = 0
        console.log('Ok')
        pecas.forEach(opcao => {
            opcao.getElementsByTagName('input')[0].checked = false
        })
    }

}

function limparTudo(event) {
    limpaValores(event);
    limpaTela(event);
}

function limpaTela(event) {
    compras.innerHTML = '' 
    total.innerHTML = ''
    precoTotal.innerHTML = ''
    brincos.style.display = 'flex'
    colares.style.display = 'flex'
    conjuntos.style.display = 'flex'
    pulseiras.style.display = 'flex'
    containerOpcaoDesconto.style.display = 'none'
    if(event.target) {
        campoValorComDesconto.innerHTML = ''
        containerDesconto.style.display = 'none'
        descontoNao.checked = true
        precoTotal.style.textDecoration = 'none'
    }
}

function iniciaCalculo() {
    if(valor != 0) {
        limparTudo(valor)
        iniciaCalculo()
    } else {
        
        containerOpcaoDesconto.style.display = 'flex'
        pecas.forEach(opcao => {
            if (opcao.getElementsByTagName('input')[0].checked) {
                texto = opcao.getElementsByTagName('label')[0].innerHTML
                valor = opcao.getElementsByTagName('span')[0].innerHTML
                quantidade = opcao.getElementsByClassName('quantidade')
                totalQuantidade.push(quantidade[0].value)
                todasCompras.push(texto)
                totalValor.push(valor)
            }
        })
        
        resultado(totalValor, todasCompras)
    }
}

function resultado(totalidade, produtos) {
    if(totalidade.length < 1) {
        campoValorComDesconto.innerHTML = ''
        return window.alert('Preencha os campos antes de calcular')
    }
    produtos.forEach(function (produto, index) {
        compras.innerHTML += `<p>${totalQuantidade[index]} ${produto}</p>`
    })
    totalidade.forEach(function (valor, index) {
        var extrato = (parseFloat(valor) * totalQuantidade[index]).toFixed(2)
        total.innerHTML += `<p>R$ ${extrato}</p>`

        custo = custo + Number(extrato)
    })
    precoTotal.innerHTML = `R$ ${custo.toFixed(2)}`
    valorComDesconto = custo - (custo * ((porcentagemDesconto)/100))
    campoValorComDesconto.innerHTML = valorComDesconto.toFixed(2)
    
}


botaoComprar.addEventListener('click', iniciaCalculo)
selecionar.addEventListener('change', mostraOpcao)
botaoLimpar.addEventListener('click', limparTudo)
botaoFinalizar.addEventListener('click', limparTudo)
descontoNao.addEventListener('change', exibeDesconto)
descontoSim.addEventListener('change', exibeDesconto)
valorDesconto.addEventListener('change', calculaDesconto)