# 🚀 Deploy no Netlify - Pet Shop

## 📋 Arquivos Criados/Configurados

- ✅ `netlify.toml` - Configuração do Netlify
- ✅ `package.json` - Scripts de build
- ✅ `.env.example` - Exemplo de variáveis

## 🔧 Passos para Deploy

### 1. Acesse o Netlify
- Vá para [netlify.com](https://netlify.com)
- Faça login com GitHub

### 2. Importe o Projeto
- Clique em **"New site from Git"**
- Escolha **GitHub**
- Selecione o repositório **"Pet-Shop"**

### 3. Configurações Automáticas
O Netlify vai detectar automaticamente:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

### 4. Variáveis de Ambiente
Antes de fazer deploy, configure:

**Site settings > Environment variables**

Adicione estas variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 5. Deploy
- Clique em **"Deploy site"**
- Aguarde o build (2-3 minutos)
- Site estará disponível em: `https://nome-aleatorio.netlify.app`

## ⚙️ Configurações Automáticas

### Build Settings
- **Framework:** Vite
- **Node.js:** 18
- **Package manager:** npm

### Redirects
- SPA redirect configurado (`/* -> /index.html`)

### Headers
- Cache otimizado para assets
- Headers de segurança

## 🔄 Deploy Automático

Cada push para `main` fará deploy automático!

## 🌐 Tecnologias Configuradas

- ⚡ **Vite** - Build tool
- ⚛️ **React** - Frontend
- 🎨 **Tailwind CSS** - Styling
- 🗄️ **Supabase** - Backend
- 📱 **PWA Ready** - Progressive Web App

## ✅ Status

- [x] Código no GitHub
- [x] Configuração do Netlify
- [ ] Variáveis de ambiente
- [ ] Deploy realizado

## 🚀 Próximos Passos

1. Configure as variáveis de ambiente
2. Faça o primeiro deploy
3. Teste o site em produção
4. Configure domínio personalizado (opcional)

---

**🎉 Pronto! Seu Pet Shop estará online no Netlify!**