document.addEventListener('DOMContentLoaded', function() {
    fetchCursos();
    fetchInscricoes();

    function fetchCursos() {
        fetch('/api.php?entity=cursos')
            .then(response => response.json())
            .then(data => {
                const listaCursos = document.getElementById('lista-cursos');
                listaCursos.innerHTML = '';
                data.forEach(curso => {
                    const div = document.createElement('div');
                    div.classList.add('curso');
                    div.innerHTML = `
                        <img src="images/${curso.codigo_unico}.jpg" alt="${curso.nome}">
                        <h3>${curso.nome}</h3>
                        <p>${curso.descricao}</p>
                        <p>Carga Horária: ${curso.carga_horaria} horas</p>
                        <button onclick="inscrever(${curso.id})">Inscrever-se</button>
                    `;
                    listaCursos.appendChild(div);
                });
            });
    }

    function fetchInscricoes() {
        fetch('/api.php?entity=inscricoes')
            .then(response => response.json())
            .then(data => {
                const listaInscricoes = document.getElementById('lista-inscricoes');
                listaInscricoes.innerHTML = '';
                data.forEach(inscricao => {
                    const div = document.createElement('div');
                    div.classList.add('inscricao');
                    div.innerHTML = `
                        <img src="images/inscricao.jpg" alt="Inscrição">
                        <h3>Curso: ${inscricao.curso_nome}</h3>
                        <p>Data de Inscrição: ${inscricao.data_inscricao}</p>
                        ${inscricao.data_cancelamento ? `<p>Data de Cancelamento: ${inscricao.data_cancelamento}</p>` : ''}
                        <button onclick="cancelarInscricao(${inscricao.id})">Cancelar Inscrição</button>
                    `;
                    listaInscricoes.appendChild(div);
                });
            });
    }

    window.inscrever = function(cursoId) {
        const clienteId = 1; // Exemplo de cliente logado com ID 1
        const dataInscricao = new Date().toISOString().split('T')[0];

        fetch('/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'inscrever',
                curso_id: cursoId,
                cliente_id: clienteId,
                data_inscricao: dataInscricao
            })
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inscrição realizada com sucesso!');
                fetchInscricoes();
            } else {
                alert('Erro ao realizar inscrição.');
            }
        });
    };

    window.cancelarInscricao = function(inscricaoId) {
        const dataCancelamento = new Date().toISOString().split('T')[0];

        fetch('/api.php', {
            method: 'POST',
            headers: {
                'Content-Type':
