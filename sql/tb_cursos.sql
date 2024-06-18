CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    carga_horaria INT NOT NULL,
    codigo_unico VARCHAR(50) UNIQUE NOT NULL
);
