-- Dados de exemplo para o Pet Shop
-- Execute após criar o schema

-- Inserir funcionários
INSERT INTO funcionarios (nome, email, telefone, cargo, salario, data_admissao) VALUES
('Dr. João Silva', 'joao@petshop.com', '(11) 99999-1111', 'Veterinário', 5000.00, '2023-01-15'),
('Maria Santos', 'maria@petshop.com', '(11) 99999-2222', 'Atendente', 2500.00, '2023-02-01'),
('Carlos Oliveira', 'carlos@petshop.com', '(11) 99999-3333', 'Tosador', 3000.00, '2023-03-10');

-- Inserir clientes
INSERT INTO clientes (nome, email, telefone, endereco, cpf) VALUES
('Ana Costa', 'ana@email.com', '(11) 88888-1111', 'Rua das Flores, 123', '123.456.789-01'),
('Pedro Lima', 'pedro@email.com', '(11) 88888-2222', 'Av. Principal, 456', '987.654.321-02'),
('Julia Ferreira', 'julia@email.com', '(11) 88888-3333', 'Rua do Sol, 789', '456.789.123-03');

-- Inserir animais (usando os IDs dos clientes)
INSERT INTO animais (cliente_id, nome, especie, raca, sexo, data_nascimento, peso, cor) 
SELECT 
    c.id,
    'Rex',
    'Cão',
    'Golden Retriever',
    'Macho',
    '2020-05-15',
    25.5,
    'Dourado'
FROM clientes c WHERE c.email = 'ana@email.com';

INSERT INTO animais (cliente_id, nome, especie, raca, sexo, data_nascimento, peso, cor) 
SELECT 
    c.id,
    'Mimi',
    'Gato',
    'Persa',
    'Fêmea',
    '2021-08-20',
    4.2,
    'Branco'
FROM clientes c WHERE c.email = 'pedro@email.com';

INSERT INTO animais (cliente_id, nome, especie, raca, sexo, data_nascimento, peso, cor) 
SELECT 
    c.id,
    'Bob',
    'Cão',
    'Bulldog',
    'Macho',
    '2019-12-10',
    18.0,
    'Marrom'
FROM clientes c WHERE c.email = 'julia@email.com';

-- Inserir produtos
INSERT INTO produtos (nome, descricao, categoria, preco, estoque, estoque_minimo, codigo_barras) VALUES
('Ração Premium Cães Adultos 15kg', 'Ração super premium para cães adultos', 'Alimentação', 89.90, 50, 10, '7891234567890'),
('Ração Gatos Filhotes 3kg', 'Ração especial para gatos filhotes', 'Alimentação', 45.50, 30, 5, '7891234567891'),
('Shampoo Antipulgas', 'Shampoo medicinal antipulgas e carrapatos', 'Higiene', 25.90, 20, 5, '7891234567892'),
('Brinquedo Corda', 'Brinquedo de corda para cães', 'Brinquedos', 15.90, 40, 10, '7891234567893'),
('Coleira Ajustável', 'Coleira ajustável para cães pequenos e médios', 'Acessórios', 35.00, 25, 5, '7891234567894');

-- Inserir agendamentos
INSERT INTO agendamentos (cliente_id, animal_id, funcionario_id, servico, data_agendamento, duracao, valor, status)
SELECT 
    c.id,
    a.id,
    f.id,
    'Consulta Veterinária',
    '2024-01-20 14:00:00',
    60,
    80.00,
    'Agendado'
FROM clientes c 
JOIN animais a ON a.cliente_id = c.id 
JOIN funcionarios f ON f.cargo = 'Veterinário'
WHERE c.email = 'ana@email.com' AND a.nome = 'Rex';

INSERT INTO agendamentos (cliente_id, animal_id, funcionario_id, servico, data_agendamento, duracao, valor, status)
SELECT 
    c.id,
    a.id,
    f.id,
    'Banho e Tosa',
    '2024-01-22 10:00:00',
    90,
    50.00,
    'Confirmado'
FROM clientes c 
JOIN animais a ON a.cliente_id = c.id 
JOIN funcionarios f ON f.cargo = 'Tosador'
WHERE c.email = 'pedro@email.com' AND a.nome = 'Mimi';

-- Inserir uma venda de exemplo
INSERT INTO vendas (cliente_id, funcionario_id, subtotal, desconto, total, forma_pagamento, status)
SELECT 
    c.id,
    f.id,
    105.40,
    5.40,
    100.00,
    'Cartão de Crédito',
    'Concluída'
FROM clientes c 
JOIN funcionarios f ON f.cargo = 'Atendente'
WHERE c.email = 'ana@email.com';

-- Inserir itens da venda
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, subtotal)
SELECT 
    v.id,
    p.id,
    1,
    89.90,
    89.90
FROM vendas v 
JOIN produtos p ON p.nome = 'Ração Premium Cães Adultos 15kg'
WHERE v.total = 100.00;

INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, subtotal)
SELECT 
    v.id,
    p.id,
    1,
    15.90,
    15.90
FROM vendas v 
JOIN produtos p ON p.nome = 'Brinquedo Corda'
WHERE v.total = 100.00;

-- Inserir movimentações financeiras
INSERT INTO movimentacoes_financeiras (tipo, categoria, descricao, valor, data_movimentacao, venda_id)
SELECT 
    'Entrada',
    'Vendas',
    'Venda de produtos',
    100.00,
    CURRENT_DATE,
    v.id
FROM vendas v WHERE v.total = 100.00;

INSERT INTO movimentacoes_financeiras (tipo, categoria, descricao, valor, data_movimentacao)
VALUES 
('Saída', 'Despesas', 'Conta de luz', 250.00, CURRENT_DATE),
('Saída', 'Despesas', 'Aluguel', 1500.00, CURRENT_DATE),
('Entrada', 'Serviços', 'Consulta veterinária', 80.00, CURRENT_DATE);