"use strict"

import BotaoConclui from "./componentes/concluirTarefa.js";
import BotaoDeletarTarefa from "./componentes/deletaTarefa.js";


const criarTarefa = (evento) => {

    evento.preventDefault();

    const lista = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const newTarefaDescr = input.value;

    const tarefa = document.createElement('li');
    tarefa.classList.add('task');
    const conteudo = `
        <p class="content">${newTarefaDescr}</p>
    `;

    tarefa.innerHTML = conteudo;

    tarefa.appendChild(BotaoConclui());
    tarefa.appendChild(BotaoDeletarTarefa());
    lista.appendChild(tarefa);
    input.value = "";

}
const novaTarefa = document.querySelector('[data-form-button]')

novaTarefa.addEventListener('click', criarTarefa);