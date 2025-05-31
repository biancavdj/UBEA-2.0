# 📁 Estrutura de Pastas do Projeto UBEA

## 🏗️ Organização Recomendada

\`\`\`
ubea-site/
│
├── index.html                    # 🏠 Página principal do site
│
├── assets/                       # 📦 Recursos estáticos
│   ├── css/
│   │   ├── styles.css           # 🎨 Estilos principais
│   │   ├── responsive.css       # 📱 Estilos responsivos (opcional)
│   │   └── animations.css       # ✨ Animações (opcional)
│   │
│   ├── js/
│   │   ├── script.js           # ⚡ JavaScript principal
│   │   ├── auth.js             # 🔐 Funções de autenticação (opcional)
│   │   ├── gatos.js            # 🐱 Funções relacionadas aos gatos (opcional)
│   │   └── admin.js            # 👨‍💼 Funções administrativas (opcional)
│   │
│   ├── images/
│   │   ├── logo.svg            # 🏷️ Logo da UBEA
│   │   ├── hero-cat.jpg        # 🖼️ Imagem principal do hero
│   │   ├── placeholder-cat.jpg # 🖼️ Placeholder para gatos sem foto
│   │   ├── favicon.ico         # 🔖 Ícone do site
│   │   │
│   │   ├── gatos/              # 🐾 Fotos dos gatos
│   │   │   ├── mimi.jpg
│   │   │   ├── thor.jpg
│   │   │   ├── luna.jpg
│   │   │   ├── simba.jpg
│   │   │   ├── nala.jpg
│   │   │   └── ...
│   │   │
│   │   ├── parceiros/          # 🤝 Logos dos parceiros
│   │   │   ├── veterinaria1.jpg
│   │   │   ├── petshop1.jpg
│   │   │   └── ...
│   │   │
│   │   └── icons/              # 🎯 Ícones personalizados
│   │       ├── cat-icon.svg
│   │       ├── heart-icon.svg
│   │       └── ...
│   │
│   └── fonts/                  # 🔤 Fontes personalizadas (opcional)
│       ├── custom-font.woff2
│       └── ...
│
├── pages/                      # 📄 Páginas adicionais (opcional)
│   ├── sobre.html
│   ├── contato.html
│   ├── politica-privacidade.html
│   └── termos-uso.html
│
├── docs/                       # 📚 Documentação
│   ├── database-diagram.png    # 📊 Diagrama do banco de dados
│   ├── wireframes/            # 📐 Wireframes do projeto
│   ├── mockups/               # 🎨 Mockups das telas
│   └── ESTRUTURA_PASTAS.md    # 📁 Este arquivo
│
├── config/                     # ⚙️ Configurações (para versão com backend)
│   ├── database.js
│   └── config.js
│
├── backup/                     # 💾 Backups e versões antigas
│   ├── v1.0/
│   └── ...
│
├── README.md                   # 📖 Documentação principal
├── .gitignore                 # 🚫 Arquivos ignorados pelo Git
└── package.json               # 📦 Dependências (se usar Node.js)
\`\`\`

## 📝 Descrição das Pastas

### 📦 `/assets/`
Contém todos os recursos estáticos do site:
- **🎨 css/**: Arquivos de estilo
- **⚡ js/**: Scripts JavaScript
- **🖼️ images/**: Todas as imagens do site
- **🔤 fonts/**: Fontes personalizadas

### 📄 `/pages/` (Opcional)
Para sites com múltiplas páginas HTML separadas.

### 📚 `/docs/`
Documentação do projeto, diagramas e especificações.

### ⚙️ `/config/` (Para versão com backend)
Arquivos de configuração para banco de dados e servidor.

### 💾 `/backup/`
Versões antigas e backups do projeto.

## 📋 Convenções de Nomenclatura

### 🎨 Arquivos CSS
- `styles.css` - Estilos principais
- `responsive.css` - Media queries
- `animations.css` - Animações e transições

### ⚡ Arquivos JavaScript
- `script.js` - Funcionalidades principais
- `auth.js` - Autenticação e login
- `gatos.js` - Gestão de gatos
- `admin.js` - Painel administrativo

### 🖼️ Imagens
- Use nomes descritivos: `hero-cat.jpg`, `logo-ubea.svg`
- Para gatos: `nome-do-gato.jpg` (ex: `mimi.jpg`)
- Para parceiros: `nome-parceiro.jpg`
- Use hífens ao invés de espaços

### 📁 Pastas
- Use nomes em minúsculas
- Use hífens para separar palavras
- Seja descritivo: `gatos/`, `parceiros/`, `icons/`

## 📐 Tamanhos Recomendados para Imagens

### 🐱 Gatos
- **Cards**: 300x250px (proporção 6:5)
- **Detalhes**: 600x500px
- **Formato**: JPG (qualidade 80-90%)

### 🖼️ Hero/Banner
- **Desktop**: 1200x600px
- **Mobile**: 800x600px
- **Formato**: JPG ou WebP

### 🏷️ Logo
- **Formato**: SVG (preferível) ou PNG
- **Tamanhos**: 40x40px, 80x80px, 160x160px

### 🤝 Parceiros
- **Logos**: 200x100px (proporção 2:1)
- **Formato**: PNG com fundo transparente

## ⚡ Otimização

### 🚀 Performance
- Comprima imagens antes de usar
- Use WebP quando possível
- Minifique CSS e JavaScript para produção
- Implemente lazy loading para imagens

### 🔍 SEO
- Use nomes de arquivo descritivos
- Adicione alt text em todas as imagens
- Organize arquivos logicamente
- Use estrutura semântica no HTML

### 🛠️ Manutenção
- Mantenha a estrutura consistente
- Documente mudanças importantes
- Use versionamento (Git) para controle
- Faça backups regulares

## 📱 Responsividade

### 🖥️ Desktop (1200px+)
- Layout em grid com múltiplas colunas
- Navegação horizontal completa
- Imagens em alta resolução

### 📱 Tablet (768px - 1199px)
- Layout adaptado para toque
- Navegação simplificada
- Imagens otimizadas

### 📱 Mobile (até 767px)
- Layout em coluna única
- Menu hambúrguer
- Botões maiores para toque

## 🔧 Ferramentas Recomendadas

### 🎨 Design
- **Figma** - Design de interfaces
- **Adobe Photoshop** - Edição de imagens
- **Canva** - Criação de gráficos

### 💻 Desenvolvimento
- **VS Code** - Editor de código
- **Live Server** - Servidor local
- **Git** - Controle de versão

### 🔍 Testes
- **Chrome DevTools** - Debug e performance
- **Lighthouse** - Auditoria de qualidade
- **BrowserStack** - Testes cross-browser

## 📊 Métricas de Qualidade

### ⚡ Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### ♿ Acessibilidade
- **Contraste**: Mínimo 4.5:1
- **Navegação por teclado**: Funcional
- **Screen readers**: Compatível

### 🔍 SEO
- **Meta tags**: Completas
- **Estrutura HTML**: Semântica
- **URLs**: Amigáveis

---

**📝 Nota:** Esta estrutura é uma recomendação baseada em boas práticas. Adapte conforme as necessidades específicas do seu projeto.
