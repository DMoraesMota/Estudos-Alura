"use-strict"

const listaClientes = () => {

    const url = 'http://localhost:3000/profile';

    return fetch(url)
        .then( cliente => {

            if (cliente.ok) {
                return cliente.json()
            }
            throw new Error('Não foi possível listar os clientes');
        })
}

const criaCliente = (nome, email) => {
    const url = 'http://localhost:3000/profile';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then (
        resposta => {

            if (resposta.ok) {
                return resposta.body
            }
            throw new Error('Não foi possível criar o cliente');
    });
}

const removeCliente = (id) => {

    const url = 'http://localhost:3000/profile';

    return fetch(`${url}/${id}`, {
        method: 'DELETE'
        }
    ).then ( resposta => {
        if (! resposta.ok) {
            throw new Error('Não foi possível remover o cliente');
        }
    })
}

const detalhaCliente = (id) => {

    const url = `http://localhost:3000/profile/${id}`;

    return fetch(url)
        .then( cliente => {

            if (cliente.ok) {
                return cliente.json()
            }
            throw new Error('Não foi possível buscar o detalhes do cliente');
        })
}

const atualizaCliente = (id, nome, email) => {

    const url = `http://localhost:3000/profile/${id}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
        .then( cliente => {

            if (cliente.ok) {
                return cliente.json();
            }
            throw new Error('Não foi possível buscar o detalhes do cliente');
        })
}

export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}