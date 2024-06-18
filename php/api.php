<?php
include 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['entity']) && $_GET['entity'] == 'cursos') {
        $sql = "SELECT * FROM cursos";
        $result = $conn->query($sql);

        $cursos = array();
        while ($row = $result->fetch_assoc()) {
            $cursos[] = $row;
        }
        echo json_encode($cursos);
    }

    if (isset($_GET['entity']) && $_GET['entity'] == 'inscricoes') {
        $sql = "SELECT i.*, c.nome AS curso_nome FROM inscricoes i JOIN cursos c ON i.curso_id = c.id";
        $result = $conn->query($sql);

        $inscricoes = array();
        while ($row = $result->fetch_assoc()) {
            $inscricoes[] = $row;
        }
        echo json_encode($inscricoes);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data['action'] == 'inscrever') {
        $curso_id = $data['curso_id'];
        $cliente_id = $data['cliente_id'];
        $data_inscricao = $data['data_inscricao'];

        $sql = "INSERT INTO inscricoes (cliente_id, curso_id, data_inscricao) VALUES ('$cliente_id', '$curso_id', '$data_inscricao')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    }

    if ($data['action'] == 'cancelar') {
        $inscricao_id = $data['inscricao_id'];
        $data_cancelamento = $data['data_cancelamento'];

        $sql = "UPDATE inscricoes SET data_cancelamento = '$data_cancelamento' WHERE id = '$inscricao_id'";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    }
}

$conn->close();
?>
