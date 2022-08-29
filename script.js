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