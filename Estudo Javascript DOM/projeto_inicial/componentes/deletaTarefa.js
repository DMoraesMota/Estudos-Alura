const BotaoDeletarTarefa = () => {

    const botaoDeletarTarefa = document.createElement('button');

    botaoDeletarTarefa.innerText = "Deletar";
    botaoDeletarTarefa.classList.add('delete-button');
    botaoDeletarTarefa.addEventListener('click', deletarTarefa);

    return botaoDeletarTarefa;
}

const deletarTarefa = (evento) => {
    const botaoDeletarTarefa = evento.target;

    const tarefaDeletar = botaoDeletarTarefa.parentElement;

    tarefaDeletar.remove();

    console.log(tarefaDeletar);
}

export default BotaoDeletarTarefa;