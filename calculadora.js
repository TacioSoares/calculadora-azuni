const pecas = document.querySelectorAll('.opcoes')
const botao = document.querySelector('#botao-calcular')
const compras = document.querySelector('.itens-comprados')
const total = document.querySelector('.valor-total')
const precoTotal = document.querySelector('#custo')



let texto = 'Não houve compra'
let valor = 0
let todasCompras = []
let totalValor = []
let totalQuantidade = []

let custo = 0

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

function limpaTela() {
    compras.innerHTML = '' 
    total.innerHTML = ''
    precoTotal.innerHTML = ''
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
        total.innerHTML += `<p>${extrato}</p>`

        custo = custo + Number(extrato)
    })
    precoTotal.innerHTML = `${custo.toFixed(2)}`
    limpaValores()
}


botao.addEventListener('click', iniciaCalculo)

