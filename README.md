# AchaServiços

Plataforma de busca de serviços construída com Next.js, Tailwind CSS e Supabase.

## 🚀 Stack Tecnológico

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **Supabase** - Backend e banco de dados
- **Lucide React** - Ícones

## 📱 Características

- ✅ Design Mobile-First
- ✅ Busca de prestadores por nome/descrição
- ✅ Filtro por categoria
- ✅ Página de detalhe com integração WhatsApp
- ✅ Cadastro de novos prestadores
- ✅ Upload de foto de perfil
- ✅ Sistema de avaliação com estrelas

## 🛠️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/pedrohenrique0708-arch/achaservicos.git
cd achaservicos
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

- Crie um projeto em [supabase.com](https://supabase.com)
- Copie a URL e a chave anônima
- Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 4. Execute o SQL schema

1. No Supabase, vá para SQL Editor
2. Copie o conteúdo de `SQL_SCHEMA.md`
3. Execute as queries

### 5. Crie o bucket de storage

1. Vá para Storage no Supabase
2. Crie um novo bucket chamado `prestadores-fotos`
3. Marque como "Public bucket"

### 6. Inicie o servidor

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── globals.css          # Estilos globais
│   │   ├── page.tsx             # Home com grid de prestadores
│   │   ├── servico/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Detalhe do prestador
│   │   └── cadastro/
│   │       └── page.tsx         # Formulário de cadastro
│   ├── components/
│   │   ├── Header.tsx           # Navegação
│   │   ├── Hero.tsx             # Seção hero com busca
│   │   ├── CategoryGrid.tsx     # Grid de categorias
│   │   ├── PrestadorCard.tsx    # Card do prestador
│   │   └── PrestadorGrid.tsx    # Grid de prestadores
│   ├── lib/
│   │   └── supabase.ts          # Cliente Supabase
│   └── types/
│       └── index.ts             # Tipos TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── SQL_SCHEMA.md
```

## 🎨 Cores

- **Primária**: #2563eb (Azul)
- **Secundária**: #ffffff (Branco)
- **Sucesso**: #22c55e (Verde para WhatsApp)

## 🌐 Páginas

### / (Home)
- Hero com barra de busca
- Grid de 12 categorias com ícones
- Lista de 12 prestadores em destaque
- Filtro por categoria

### /servico/[id]
- Foto grande do prestador
- Nome, nota com estrelas
- Descrição completa
- Categoria
- Botão verde "Chamar no WhatsApp"

### /cadastro
- Formulário com campos: nome, telefone, WhatsApp, categoria, descrição
- Upload de foto de perfil
- Salva no Supabase com RLS habilitado

## 📝 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

## 🚀 Deploy

### Vercel

1. Faça push no GitHub
2. Conecte no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente
4. Deploy automático!

## 📄 Licença

MIT

## 👨‍💻 Autor

[Pedro Henrique](https://github.com/pedrohenrique0708-arch)
