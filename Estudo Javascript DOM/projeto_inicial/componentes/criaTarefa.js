"use strict"

import BotaoConclui from "./concluirTarefa.js";
import BotaoDeletarTarefa from "./deletaTarefa.js";
import { carregaTarefa } from "./carregaTarefa.js";

export const handleNovoItem = (evento) => {

    evento.preventDefault();
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const input = document.querySelector('[data-form-input]');
    const newTarefaDescr = input.value;

    const calendario = document.querySelector('[data-form-datetime]');
    const data = moment(calendario.value);
    const horario = data.format('HH:mm')

    const dataFormatada = data.format('DD/MM/YYYY');
    const concluida = false;

    const dados = {
        newTarefaDescr,
        dataFormatada,
        horario,
        concluida
    }

    const tarefasAtualizadas = [...tarefas, dados];

    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));

    input.value = "";

    carregaTarefa();
}

export const Tarefa = ({ newTarefaDescr, horario, concluida }, id) => {

    const tarefa = document.createElement('li');
    const conteudo = `
        <p class="content">${horario} * ${newTarefaDescr}</p>
    `;

    if (concluida) {
        tarefa.classList.add('done');
    }
    tarefa.classList.add('task');

    tarefa.innerHTML = conteudo;

    tarefa.appendChild(BotaoConclui(carregaTarefa, id));
    tarefa.appendChild(BotaoDeletarTarefa(carregaTarefa, id));

    return tarefa;

}