CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_inscricao DATE NOT NULL,
    data_cancelamento DATE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
