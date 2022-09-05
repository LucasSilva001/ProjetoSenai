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
        this.id = 1;
        this.arrayProdutos = [];
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

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_quantidade = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_quantidade.innerText = this.arrayProdutos[i].quantidadeProduto;
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++
    }

    lerDados() {
        let produto = {}
        
        produto.id = document.getElementById('');
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
}

var produto = new Produto();