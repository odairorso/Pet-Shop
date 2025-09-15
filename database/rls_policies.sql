-- Políticas de Segurança (RLS) para o Pet Shop
-- Row Level Security para Supabase

-- Habilitar RLS em todas as tabelas
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE animais ENABLE ROW LEVEL SECURITY;
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_venda ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentacoes_financeiras ENABLE ROW LEVEL SECURITY;

-- Políticas para Clientes
-- Permitir que usuários autenticados vejam e gerenciem clientes
CREATE POLICY "Usuários autenticados podem ver clientes" ON clientes
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir clientes" ON clientes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar clientes" ON clientes
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar clientes" ON clientes
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Animais
CREATE POLICY "Usuários autenticados podem ver animais" ON animais
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir animais" ON animais
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar animais" ON animais
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar animais" ON animais
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Funcionários
CREATE POLICY "Usuários autenticados podem ver funcionários" ON funcionarios
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir funcionários" ON funcionarios
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar funcionários" ON funcionarios
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar funcionários" ON funcionarios
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Produtos
CREATE POLICY "Usuários autenticados podem ver produtos" ON produtos
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir produtos" ON produtos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar produtos" ON produtos
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar produtos" ON produtos
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Agendamentos
CREATE POLICY "Usuários autenticados podem ver agendamentos" ON agendamentos
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir agendamentos" ON agendamentos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar agendamentos" ON agendamentos
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar agendamentos" ON agendamentos
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Vendas
CREATE POLICY "Usuários autenticados podem ver vendas" ON vendas
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir vendas" ON vendas
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar vendas" ON vendas
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar vendas" ON vendas
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Itens de Venda
CREATE POLICY "Usuários autenticados podem ver itens de venda" ON itens_venda
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir itens de venda" ON itens_venda
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar itens de venda" ON itens_venda
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar itens de venda" ON itens_venda
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Movimentações Financeiras
CREATE POLICY "Usuários autenticados podem ver movimentações" ON movimentacoes_financeiras
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir movimentações" ON movimentacoes_financeiras
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar movimentações" ON movimentacoes_financeiras
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar movimentações" ON movimentacoes_financeiras
    FOR DELETE USING (auth.role() = 'authenticated');

-- Função para verificar se o usuário é admin (opcional)
-- CREATE OR REPLACE FUNCTION is_admin()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--     RETURN (SELECT auth.jwt() ->> 'role' = 'admin');
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Exemplo de política mais restritiva para funcionários (apenas admins podem deletar)
-- DROP POLICY IF EXISTS "Usuários autenticados podem deletar funcionários" ON funcionarios;
-- CREATE POLICY "Apenas admins podem deletar funcionários" ON funcionarios
--     FOR DELETE USING (is_admin());