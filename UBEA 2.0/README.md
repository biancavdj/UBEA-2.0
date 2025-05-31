# UBEA - Unidos pelo Bem Estar Animal

Site para adoção de gatos desenvolvido em HTML, CSS e JavaScript puro.

## 🐱 Sobre o Projeto

A UBEA (Unidos pelo Bem Estar Animal) é um grupo de protetoras independentes que trabalha desde 2010 para resgatar, cuidar e encontrar lares amorosos para felinos em situação de vulnerabilidade. Este site foi desenvolvido para facilitar o processo de adoção e conectar gatinhos carentes com famílias amorosas.

## 📁 Estrutura do Projeto

\`\`\`
ubea-site/
├── index.html                    # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilos do site
│   ├── js/
│   │   └── script.js            # Funcionalidades JavaScript
│   └── images/
│       ├── logo.svg             # Logo da UBEA
│       ├── hero-cat.jpg         # Imagem principal
│       ├── placeholder-cat.jpg  # Placeholder para gatos
│       ├── favicon.ico          # Ícone do site
│       └── gatos/               # Fotos dos gatos
│           ├── mimi.jpg
│           ├── thor.jpg
│           ├── luna.jpg
│           ├── simba.jpg
│           └── nala.jpg
├── docs/
│   └── ESTRUTURA_PASTAS.md      # Guia de estrutura
└── README.md                    # Este arquivo
\`\`\`

## ✨ Funcionalidades

### 👥 Sistema de Usuários
- ✅ Cadastro de usuários (adotantes)
- ✅ Login e logout
- ✅ Diferentes tipos de usuário (Admin e Adotante)
- ✅ Painel do usuário
- ✅ Persistência de dados no localStorage

### 🐾 Gestão de Gatos
- ✅ Cadastro de gatos (apenas admin)
- ✅ Listagem com filtros por sexo e idade
- ✅ Status de adoção
- ✅ Edição de informações dos gatos
- ✅ Fotos dos gatos

### 💝 Sistema de Adoção
- ✅ Solicitação de adoção
- ✅ Gerenciamento de pedidos pelo admin
- ✅ Status dos pedidos (Pendente, Aprovado, Rejeitado)
- ✅ Histórico de pedidos do usuário

### 🤝 Parceiros
- ✅ Cadastro de parceiros (veterinários, pet shops, etc.)
- ✅ Listagem por categoria
- ✅ Informações de contato

### 🛠️ Painel Administrativo
- ✅ Gerenciamento de pedidos de adoção
- ✅ Visualização de usuários
- ✅ Controle de status dos gatos
- ✅ Edição de informações

## 🚀 Como Usar

### Para Usuários Comuns:
1. Acesse o site
2. Clique em "Quero Adotar" para se cadastrar
3. Navegue pelos gatos disponíveis
4. Solicite adoção dos gatos de interesse
5. Acompanhe seus pedidos no painel do usuário

### Para Administradores:
1. Faça login com as credenciais de admin:
   - **Email:** admin@ubea.org.br
   - **Senha:** admin123
2. Acesse o painel administrativo
3. Cadastre novos gatos e parceiros
4. Gerencie pedidos de adoção
5. Edite informações dos gatos

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com Flexbox e Grid
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome** - Ícones
- **LocalStorage** - Persistência de dados

## 📱 Recursos Responsivos

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- 🖥️ **Desktop** (1200px+)
- 📱 **Tablet** (768px - 1199px)
- 📱 **Mobile** (até 767px)

## 🛠️ Instalação

1. Baixe todos os arquivos do projeto
2. Mantenha a estrutura de pastas conforme indicado
3. Adicione as imagens na pasta `assets/images/`
4. Abra o arquivo `index.html` em um navegador web

## 📊 Estrutura de Dados

O sistema utiliza objetos JavaScript para simular um banco de dados:

### Usuários
\`\`\`javascript
{
    id: number,
    username: string,
    email: string,
    password: string,
    role: "ADMIN" | "ADOTANTE",
    telefone: string,
    possuiAnimais: boolean,
    possuiCasaSegura: boolean,
    descricaoAdicional: string
}
\`\`\`

### Gatos
\`\`\`javascript
{
    id: number,
    nome: string,
    sexo: "M" | "F",
    idade: number, // em meses
    descricao: string,
    adotado: boolean,
    foto: string
}
\`\`\`

### Parceiros
\`\`\`javascript
{
    id: number,
    nome: string,
    categoria: string,
    email: string,
    telefone: string,
    endereco: string,
    cnpj: string,
    descricao: string
}
\`\`\`

### Pedidos de Adoção
\`\`\`javascript
{
    id: number,
    gatoId: number,
    adotanteId: number,
    data: string,
    status: "PENDENTE" | "APROVADO" | "REJEITADO",
    dataAprovacao: string | null
}
\`\`\`

## 🎨 Paleta de Cores

- **Primária:** #8B4513 (Marrom)
- **Secundária:** #D2691E (Laranja)
- **Accent:** #A0522D (Marrom claro)
- **Background:** #F5E6D3 (Bege)
- **Sucesso:** #28a745 (Verde)
- **Erro:** #dc3545 (Vermelho)
- **Info:** #17a2b8 (Azul)

## 🔮 Próximos Passos

Para uma implementação completa, considere:

1. **🗄️ Banco de Dados Real**: Integrar com MySQL, PostgreSQL ou MongoDB
2. **🔧 Backend**: Implementar API REST com Node.js, PHP ou Python
3. **📸 Upload de Imagens**: Sistema para upload real de fotos dos gatos
4. **🔐 Autenticação Segura**: Hash de senhas e JWT tokens
5. **📧 Notificações**: Sistema de email para pedidos de adoção
6. **🔍 Busca Avançada**: Filtros mais específicos e busca por texto
7. **💬 Chat**: Sistema de mensagens entre adotantes e administradores
8. **📱 PWA**: Transformar em Progressive Web App
9. **🌐 SEO**: Otimização para motores de busca
10. **📊 Analytics**: Implementar Google Analytics

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato:

- **Email:** contato@ubea.org.br
- **Telefone:** (11) 99999-9999
- **Instagram:** @ubea_oficial

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração. Sinta-se livre para usar e modificar conforme necessário.

## 🙏 Agradecimentos

- Às protetoras independentes que inspiraram este projeto
- À comunidade de desenvolvedores que contribui com ferramentas open source
- A todos que apoiam a causa animal

---

**Desenvolvido com ❤️ para ajudar nossos amigos felinos**

*"Até que todos tenham um lar" - UBEA*
