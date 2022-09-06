function alternarCaixa(a) {
    let localPag = document.querySelector('.caixa_dados')
    let pag = new XMLHttpRequest()

    pag.onreadystatechange = () => {
        if(pag.readyState == 4 && pag.status == 200 ) {
            localPag.innerHTML = pag.response
        }
    }

    pag.open('GET', `../${a}.html`)
    pag.send()
}

function alternarCentro(a) {
    let localPag = document.querySelector('.centro')
    let pag = new XMLHttpRequest()

    pag.onreadystatechange = () => {
        if(pag.readyState == 4 && pag.status == 200 ) {
            localPag.innerHTML = pag.response
        }
    }

    pag.open('GET', `../${a}.html`)
    pag.send()
}

class Produto {

    constructor() {
        JSON.parse(localStorage.getItem('arrayProdutos'));
        this.arrayProdutos = []
    }

    salvar() {
        let produto = this.lerDados();

        if(this.validCampos(produto)) {
            this.adicionar(produto);
        }

        this.listaTabela();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_quantidade = tr.insertCell();

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_produto.innerHTML = this.arrayProdutos[i].nomeProduto;
            td_quantidade.innerHTML = this.arrayProdutos[i].quantidadeProduto;
        }

    }

    adicionar(produto) {
        this.arrayProdutos.push(produto)
        this.salvar_localStorage()
    }

    lerDados() {
        let produto = {}
        
        produto.id = document.getElementById('codigo_produto').value;
        produto.nomeProduto = document.getElementById('nome_produto').value;
        produto.quantidadeProduto = document.getElementById('quantidade_produto').value;

        return produto;
    }

    validCampos(produto) {
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }
        if(produto.quantidadeProduto == '') {
            msg += '- Informe a quantidade do produto \n';
        }
        if(msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    salvar_localStorage() {
        localStorage.setItem("lista_item", JSON.stringify(produto))
    }
}

var produto = new Produto();