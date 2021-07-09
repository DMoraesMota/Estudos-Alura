"use strict"

const deletarTarefa = (atualiza, id) => {

    const index = id;

    const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasCadastradas.splice(index, 1);

    localStorage.setItem('tarefas', JSON.stringify(tarefasCadastradas));

    atualiza();

}

const BotaoDeletarTarefa = (atualiza, id) => {

    const botaoDeletarTarefa = document.createElement('button');

    botaoDeletarTarefa.innerText = "Deletar";
    botaoDeletarTarefa.classList.add('delete-button');
    botaoDeletarTarefa.addEventListener('click', () => deletarTarefa(atualiza, id));

    return botaoDeletarTarefa;
}


export default BotaoDeletarTarefa;