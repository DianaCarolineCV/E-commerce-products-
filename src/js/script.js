let ul = document.querySelector("ul")
let input = document.querySelector("input")
let botaoBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
let botaoFiltro = document.querySelector("#botoesContainer")
let total = document.querySelector(".total")
let totalProdutos = document.querySelector(".precoTotal h5")
let quantidadeProdutos = document.querySelector(".quantidade h5")
let ulCarrinho = document.querySelector("#ulCarrinho")
let conteudoCarrinho = document.querySelector(".conteudoCarrinho")
let carrinho_produtos = []


function listarCards(produtos, secao) {
    secao.innerText = ''
    produtos.forEach(function (element) {
        let card = criarCard(element)
        secao.appendChild(card)
    })
}
listarCards(produtos, ul)


function criarCard(element) {
    const {
        id,
        nome,
        preco,
        secao,
        categoria,
        img,
        promocao,
        precoPromocao,
        componentes
    } = element;
    let li = document.createElement("li")

    let imgUrl = document.createElement("img")
    imgUrl.src = img

    let divInformacao = document.createElement("div")
    divInformacao.classList.add("divInformacao")

    let h3 = document.createElement("h3")
    h3.innerText = nome

    let span = document.createElement("span")
    span.innerText = secao

    let spanCategoria = document.createElement("span")
    spanCategoria.innerText = categoria
    spanCategoria.classList.add("categoria")

    let p = document.createElement("p")
    p.innerText = `R$ ${parseFloat(preco)}.00`

    let pPrecoPromocao = document.createElement("p")
    let button = document.createElement("button")
    button.innerText = "Comprar"

    let ulComponentes = document.createElement("ul")
    ulComponentes.classList.add("ulComponentes")

    componentes.forEach(function (componente) {
        let li = document.createElement("li")
        li.classList.add("listaComponente")
        let spanComponente = document.createElement("span")
        spanComponente.innerText = componente
        li.appendChild(spanComponente)
        ulComponentes.appendChild(li)
    })


    let div = document.createElement("div")
    div.classList.add("precos")

    if (promocao === true) {
        li.classList.add("oferta")
        p.classList.add("precoAntigo")
        pPrecoPromocao.innerText = `R$ ${parseInt(precoPromocao)}.00`
    }

    if (id != undefined) {
        button.id = id
    }
    div.append(p, pPrecoPromocao)
    divInformacao.append(h3, span, spanCategoria, div, ulComponentes)
    li.append(imgUrl, divInformacao, button)
    return li

}


botaoBusca.addEventListener("click", function () {
    let pesquisa = input.value
    listarCards(busca(pesquisa), ul)
})

function busca(valorPesquisa) {
    return produtos.filter(element => element.nome.toLowerCase().includes(valorPesquisa.toLowerCase()) || element.categoria.toLowerCase().includes(valorPesquisa.toLowerCase()) || element.secao.toLowerCase().includes(valorPesquisa.toLowerCase()))
}



botaoFiltro.addEventListener("click", function (evento) {
    let filtro = evento.target.innerText
    if (filtro !== 'Todos Produtos') {
        let produtosFiltro = produtos.filter(element => element.secao == filtro)
        listarCards(produtosFiltro, ul)
    } else {
        listarCards(produtos, ul)
    }
})


ul.addEventListener("click", interceptandoProduto);

function interceptandoProduto(event) {
    conteudoCarrinho.style.display = "none"
    let btnComprar = event.target
    if (btnComprar.tagName === "BUTTON") {
        let idProduto = btnComprar.id
        let produto = produtos.find(function (produto) {
            if (produto.id == idProduto) {
                return produto

            }
        })

        let produtoCarrinho = carrinho_produtos.push(produto)

        adicionarCarrinho(produtoCarrinho)
    }

};


function adicionarCarrinho() {
    listarCards(carrinho_produtos, ulCarrinho)
    soma(carrinho_produtos)
    quantidade(carrinho_produtos)
}



ulCarrinho.addEventListener("click", removerCarrinho)

function removerCarrinho(event) {
    let btnRemover = event.target
    if (btnRemover.tagName === "BUTTON") {
        let parent = btnRemover.parentElement
        let parentIndex = Array.from(ulCarrinho.children).indexOf(parent)
        carrinho_produtos.splice(parentIndex, 1)
        ulCarrinho.removeChild(parent)
        quantidadeProdutos.innerText = carrinho_produtos.length
        soma()

        if (carrinho_produtos.length === 0) {

            let div = document.createElement("div")
            div.classList.add("conteudoCarrinho")
            let img = document.createElement("img")
            img.src = "./src/img/shopping-bag.png"

            let p = document.createElement("p")
            p.innerText = "Por enquanto não temos produtos no carrinho"

           div.append(img, p)
           ulCarrinho.append(div)
            
        }
    }
}


function soma() {
    let soma = carrinho_produtos.reduce((anterior, atual) => atual.promocao ? anterior + parseInt(atual.precoPromocao) : anterior + parseInt(atual.preco), 0)
    totalProdutos.innerText = `R$ ${soma}.00`
}

function quantidade() {
    let quantidadeCarrinho = carrinho_produtos.length
    quantidadeProdutos.innerText = quantidadeCarrinho
}