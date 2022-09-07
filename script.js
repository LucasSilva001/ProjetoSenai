function alternarCaixa(a) {
    let localPag = document.querySelector('body')
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
        this.arrayProdutos = []
        this.editar = null;
    }

    mostrarModal() {
        this.modal = document.getElementById("modal")
        modal.classList.add("mostrar-modal");
    }

    sumirModal() {
        this.modal = document.getElementById("modal")
        modal.classList.remove("mostrar-modal");
    
        this.limparCampos()
    
    }

    salvar() {
        let produto = this.lerDados();

        if(this.validCampos(produto)) {
            if(this.editar == null){
                this.adicionar(produto);
            }
            else {
                this.atualizarProduto(this.editar, produto)
            }
        }

        this.listaTabela();
        this.limparCampos();
        

    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_codigo = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_categoria = tr.insertCell();
            let td_cor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_codigo.innerText = this.arrayProdutos[i].codigo;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_quantidade.innerText = this.arrayProdutos[i].quantidadeProduto;
            td_categoria.innerText = this.arrayProdutos[i].categoria;
            td_cor.innerText = this.arrayProdutos[i].cor;

            td_codigo.classList.add('center');
            td_quantidade.classList.add('center');

            let imgEditar = document.createElement('img');
            imgEditar.src = 'assets/escrever.png';
            imgEditar.setAttribute("onclick","produto.editarProduto("+ JSON.stringify(this.arrayProdutos[i])+")");

            let imgExcluir = document.createElement('img');
            imgExcluir.src = 'assets/excluir.png';
            imgExcluir.setAttribute("onclick","produto.deletarProduto("+ this.arrayProdutos[i].codigo +")");

            td_acoes.appendChild(imgEditar);
            td_acoes.appendChild(imgExcluir);
        }

    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
    }

    lerDados() {
        let produto = {}
        
        produto.codigo = document.getElementById('codigo_produto').value;
        produto.nomeProduto = document.getElementById('nome_produto').value;
        produto.quantidadeProduto = document.getElementById('quantidade_produto').value;
        produto.categoria = document.getElementById('categoria_produto').value;
        produto.cor = document.getElementById('cor_produto').value;

        return produto;
    }

    validCampos(produto) {
        let msg = '';

        if(produto.codigo == '') {
            msg += '- Informe o código do produto \n';
        }

        if(produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }

        if(produto.quantidadeProduto == '') {
            msg += '- Informe a quantidade do produto \n';
        }

        if(produto.categoria == '') {
            msg += '- Informe a categoria do produto \n';
        }

        if(produto.cor == '') {
            msg += '- Informe a cor do produto \n';
        }
        
        if(msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    limparCampos() {
        document.getElementById('codigo_produto').value = '';
        document.getElementById('nome_produto').value = '';
        document.getElementById('quantidade_produto').value = '';
        document.getElementById('categoria_produto').value = '';
        document.getElementById('cor_produto').value = '';
        
        document.getElementById('botao_cadastrar').innerText = '+ Novo';
        this.editar = null;

    }

    atualizarProduto(codigo, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].codigo == codigo) {
                this.arrayProdutos[i].codigo = produto.codigo;
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].quantidadeProduto = produto.quantidadeProduto;
                this.arrayProdutos[i].categoria = produto.categoria;
                this.arrayProdutos[i].cor = produto.cor;
            }
        }
    }

   editarProduto(dados){
    this.editar = dados.codigo

    this.mostrarModal();

    document.getElementById('codigo_produto').value = dados.codigo;
    document.getElementById('nome_produto').value = dados.nomeProduto;
    document.getElementById('quantidade_produto').value = dados.quantidadeProduto;
    document.getElementById('categoria_produto').value = dados.categoria;
    document.getElementById('cor_produto').value = dados.cor;

    document.getElementById('botao_cadastrar').innerText = 'Atualizar';
   }

    deletarProduto(codigo) {
        if(confirm("Deseja deletar esse produto? Id: " + codigo)) {
            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].codigo == codigo) {
                    this.arrayProdutos.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

var produto = new Produto();