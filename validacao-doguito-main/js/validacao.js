export function valida(input) {
    const tipoInput = input.dataset.tipo

    if (validadores[tipoInput]) {
        validadores[tipoInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemErro(tipoInput, input)
    }
}

const tipoDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const msgErros = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter de 6 a 12 caracteres, conter pelo menos uma letra maíuscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo cpf não pode estar vazio.',
        customError: 'CPF inválido'
    },
    cep: {
        valueMissing: 'O campo cep não pode estar vazio.',
        patternMismatch: 'CEP inválido',
        customError: 'CEP não encontrado na base dos correios.'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo preço não pode estar vazio.'
    }
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input)
}


function mostraMensagemErro(tipoInput, input) {

    let mensagem = ''

    tipoDeErros.forEach( erro => {
        if (input.validity[erro]) {
            mensagem = msgErros[tipoInput][erro]
        }
    })

    return mensagem
}

function validaDataNascimento(input) {

    const dataRecebida = new Date(input.value)
    let mensagem = "";

    if (!validaMaiorIdade(dataRecebida)) {
        mensagem = 'Você deve ser maior de 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function validaMaiorIdade(data) {
    const dataAtual = new Date()

    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}


function validaCPF(input) {

    const cpfFomatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    // if (!checaCPFRepetido(cpfFomatado)) {
    //     mensagem = 'CPF inválido'
    // }
    if (!checaEstruturaCPF(cpfFomatado)) {
        mensagem = 'CPF inválido'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {

    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]

    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if (valor == cpf){
            cpfValido = false
        }
    })

    return cpfValido
}

function checaEstruturaCPF(strCPF) {

    var Soma;
    var Resto;
    Soma = 0;

    for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;

    return true;

}


function recuperarCEP(input) {

    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utg-8'
        }
    }

    if (!input.validity.valueMissing && !input.validity.valueMissing) {
        fetch(url, options).then (
            (response) => response.json()
        ).then (
            data => {

                if (data.erro) {
                    input.setCustomValidity('CEP não encontrado na base dos correios.')
                    return
                } else {
                    input.setCustomValidity('')
                    preencheCamposEndereco(data)
                    return
                }
            }
        )
    }
}

function preencheCamposEndereco(endereco) {

    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = endereco.logradouro
    cidade.value = endereco.localidade
    estado.value = endereco.uf

}