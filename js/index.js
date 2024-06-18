document.addEventListener('DOMContentLoaded', function() {
    fetchCursos();
    fetchInscricoes();

    function fetchCursos() {
        fetch('/api/cursos')
            .then(response => response.json())
            .then(data => {
                const listaCursos = document.getElementById('lista-cursos');
                data.forEach(curso => {
                    const div = document.createElement('div');
                    div.classList.add('curso');
                    div.innerHTML = `
                        <h3>${curso.nome}</h3>
                        <p>${curso.descricao}</p>
                        <p>Carga Horária: ${curso.carga_horaria} horas</p>
                    `;
                    listaCursos.appendChild(div);
                });
            });
    }

    function fetchInscricoes() {
        fetch('/api/inscricoes')
            .then(response => response.json())
            .then(data => {
                const listaInscricoes = document.getElementById('lista-inscricoes');
                data.forEach(inscricao => {
                    const div = document.createElement('div');
                    div.classList.add('inscricao');
                    div.innerHTML = `
                        <h3>Curso: ${inscricao.curso_nome}</h3>
                        <p>Data de Inscrição: ${inscricao.data_inscricao}</p>
                        ${inscricao.data_cancelamento ? `<p>Data de Cancelamento: ${inscricao.data_cancelamento}</p>` : ''}
                    `;
                    listaInscricoes.appendChild(div);
                });
            });
    }
});
