# Schema Supabase - AchaServiços

## Tabela: prestadores

```sql
CREATE TABLE public.prestadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  descricao TEXT NOT NULL,
  foto_url TEXT,
  nota DECIMAL(2, 1) DEFAULT 5.0,
  criado_em TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX idx_prestadores_categoria ON public.prestadores(categoria);
CREATE INDEX idx_prestadores_nome ON public.prestadores(nome);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.prestadores ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública
CREATE POLICY "Enable read access for all users" ON public.prestadores
  FOR SELECT USING (true);

-- Política de inserção pública
CREATE POLICY "Enable insert for all users" ON public.prestadores
  FOR INSERT WITH CHECK (true);
```

## Storage: prestadores-fotos

1. Vá para Storage no Supabase
2. Clique em "New bucket"
3. Nome: `prestadores-fotos`
4. Selecione "Public bucket"
5. Clique em "Create bucket"

### Políticas de Acesso:

```sql
-- Permitir leitura pública
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'prestadores-fotos');

-- Permitir upload de qualquer um
CREATE POLICY "Enable insert for all users" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'prestadores-fotos');
```
