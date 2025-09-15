# 🗄️ Banco de Dados - Pet Shop

Este diretório contém todos os arquivos SQL necessários para configurar o banco de dados do Pet Shop no Supabase.

## 📁 Arquivos

### `schema.sql`
Contém a estrutura completa do banco de dados com:
- **8 tabelas principais**: clientes, animais, funcionarios, produtos, agendamentos, vendas, itens_venda, movimentacoes_financeiras
- **Índices** para otimização de performance
- **Triggers** para atualização automática de timestamps
- **Constraints** e validações de dados

### `seed.sql`
Dados de exemplo para testar o sistema:
- 3 funcionários (veterinário, atendente, tosador)
- 3 clientes com seus respectivos animais
- 5 produtos variados
- Agendamentos de exemplo
- Venda completa com itens
- Movimentações financeiras

### `rls_policies.sql`
Políticas de segurança Row Level Security (RLS):
- Proteção de todas as tabelas
- Acesso apenas para usuários autenticados
- Políticas CRUD completas
- Base para implementação de roles mais específicos

## 🚀 Como Usar

### 1. No Supabase Dashboard
1. Acesse seu projeto no [Supabase](https://supabase.com)
2. Vá para **SQL Editor**
3. Execute os arquivos na seguinte ordem:

```sql
-- 1. Primeiro, execute o schema
-- Copie e cole o conteúdo de schema.sql

-- 2. Depois, execute as políticas RLS
-- Copie e cole o conteúdo de rls_policies.sql

-- 3. Por último, insira os dados de exemplo (opcional)
-- Copie e cole o conteúdo de seed.sql
```

### 2. Via CLI do Supabase
```bash
# Se você tem o CLI do Supabase instalado
supabase db reset
supabase db push
```

## 📊 Estrutura das Tabelas

### Clientes
- Informações pessoais completas
- CPF único
- Histórico de criação/atualização

### Animais
- Vinculados aos clientes
- Informações veterinárias
- Rastreamento de peso e características

### Funcionários
- Gestão de equipe
- Controle de salários
- Status ativo/inativo

### Produtos
- Controle de estoque
- Categorização
- Código de barras único

### Agendamentos
- Vinculação cliente-animal-funcionário
- Controle de status
- Gestão de horários

### Vendas & Itens
- Sistema completo de vendas
- Múltiplos produtos por venda
- Diferentes formas de pagamento

### Movimentações Financeiras
- Controle de entradas e saídas
- Categorização de movimentações
- Vinculação com vendas e agendamentos

## 🔒 Segurança

- **RLS habilitado** em todas as tabelas
- **Autenticação obrigatória** para acesso
- **Políticas granulares** por operação (SELECT, INSERT, UPDATE, DELETE)
- **Base preparada** para implementação de roles específicos

## 🔧 Manutenção

### Backup
```sql
-- Para fazer backup de uma tabela específica
SELECT * FROM clientes;
```

### Limpeza de dados de teste
```sql
-- Para remover dados de exemplo
DELETE FROM movimentacoes_financeiras;
DELETE FROM itens_venda;
DELETE FROM vendas;
DELETE FROM agendamentos;
DELETE FROM animais;
DELETE FROM clientes;
DELETE FROM funcionarios;
DELETE FROM produtos;
```

### Verificação de integridade
```sql
-- Verificar relacionamentos
SELECT 
    c.nome as cliente,
    COUNT(a.id) as total_animais
FROM clientes c
LEFT JOIN animais a ON a.cliente_id = c.id
GROUP BY c.id, c.nome;
```

## 📈 Performance

- **Índices criados** nas colunas mais consultadas
- **Foreign keys** para integridade referencial
- **Triggers** para atualização automática de timestamps
- **UUIDs** como chaves primárias para melhor distribuição

## 🆘 Troubleshooting

### Erro de permissão
- Verifique se o RLS está configurado corretamente
- Confirme se o usuário está autenticado

### Erro de foreign key
- Verifique se os registros relacionados existem
- Execute o schema.sql antes dos dados

### Performance lenta
- Verifique se os índices foram criados
- Analise as consultas com EXPLAIN ANALYZE