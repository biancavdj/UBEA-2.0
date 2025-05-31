// ===== DADOS SIMULADOS =====
// Em uma aplicação real, isso viria de um banco de dados

const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@ubea.org.br",
    password: "admin123",
    role: "ADMIN",
    telefone: "(11) 99999-9999",
    possuiAnimais: true,
    possuiCasaSegura: true,
    descricaoAdicional: "Administrador do sistema",
  },
]

const gatos = [
  {
    id: 1,
    nome: "Mimi",
    sexo: "F",
    idade: 8,
    descricao: "Gatinha muito carinhosa e brincalhona. Adora colo e é muito sociável.",
    adotado: false,
    foto: "assets/images/gatos/gato1.png",
  },
  {
    id: 2,
    nome: "Thor",
    sexo: "M",
    idade: 24,
    descricao: "Gato adulto, calmo e independente. Perfeito para quem busca um companheiro tranquilo.",
    adotado: false,
    foto: "assets/images/gatos/gato2.png",
  },
  {
    id: 3,
    nome: "Luna",
    sexo: "F",
    idade: 3,
    descricao: "Filhote muito ativa e curiosa. Precisa de uma família que tenha tempo para brincar.",
    adotado: true,
    foto: "assets/images/gatos/gato3.png",
  },
  {
    id: 4,
    nome: "Simba",
    sexo: "M",
    idade: 3,
    descricao: "Filhote, muito brincalhão e carinhoso. Ama brincar com bolinhas.",
    adotado: false,
    foto: "assets/images/gatos/gato4.png",
  },
  {
    id: 5,
    nome: "Nala",
    sexo: "F",
    idade: 18,
    descricao: "Gata adulta, muito tranquila e carinhosa. Ideal para apartamento.",
    adotado: false,
    foto: "assets/images/gatos/gato5.png",
  },
]

const parceiros = [
  {
    id: 1,
    nome: "Clínica Veterinária Amor Animal",
    categoria: "veterinario",
    email: "contato@amoranimal.com.br",
    telefone: "(11) 3333-4444",
    endereco: "Rua das Flores, 123 - São Paulo",
    descricao: "Clínica especializada em felinos com atendimento 24h",
    cnpj: "12.345.678/0001-90",
  },
  {
    id: 2,
    nome: "Pet Shop Gatinho Feliz",
    categoria: "petshop",
    email: "vendas@gatinhofeliz.com.br",
    telefone: "(11) 2222-3333",
    endereco: "Av. Principal, 456 - São Paulo",
    descricao: "Produtos e acessórios para gatos com desconto especial para adotantes",
    cnpj: "98.765.432/0001-10",
  },
  {
    id: 3,
    nome: "ONG Patinhas Carentes",
    categoria: "ong",
    email: "contato@patinhascarentes.org",
    telefone: "(11) 1111-2222",
    endereco: "Rua da Esperança, 789 - São Paulo",
    descricao: "ONG parceira que ajuda no resgate e cuidado de animais abandonados",
    cnpj: "11.222.333/0001-44",
  },
]

const pedidosAdocao = []

// ===== VARIÁVEIS GLOBAIS =====
let currentUser = null
const nextId = {
  users: 2,
  gatos: 6,
  parceiros: 4,
  pedidos: 1,
}

// ===== CONSTANTES =====
const CATEGORIA_TEXTOS = {
  veterinario: "Veterinário",
  petshop: "Pet Shop",
  ong: "ONG",
  clinica: "Clínica",
  hotel: "Hotel Pet",
  outro: "Outro",
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  loadGatos()
  loadParceiros()
  setupEventListeners()

  // Verificar se há usuário logado no localStorage
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUserInterface()
  }

  // Mostrar apenas a seção inicial
  document.querySelectorAll("section").forEach((section) => {
    if (section.id !== "inicio") {
      section.style.display = "none"
    }
  })
})

// ===== CONFIGURAÇÃO DE EVENTOS =====
function setupEventListeners() {
  // Navegação
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href").substring(1)
      showSection(target)
      updateActiveNav(this)
    })
  })

  // Formulários
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("cadastroForm").addEventListener("submit", handleCadastro)
  document.getElementById("cadastroGatoForm").addEventListener("submit", handleCadastroGato)
  document.getElementById("cadastroParceiroForm").addEventListener("submit", handleCadastroParceiro)

  // Filtros
  document.getElementById("filtroSexo").addEventListener("change", filterGatos)
  document.getElementById("filtroIdade").addEventListener("change", filterGatos)
  document.getElementById("filtroParceiros").addEventListener("change", filterParceiros)

  // Contato form
  document.querySelector(".contato-form").addEventListener("submit", handleContato)

  // Fechar modals clicando fora
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none"
    }
  })

  // Fechar user panel clicando fora
  document.addEventListener("click", (e) => {
    const userPanel = document.querySelector(".user-panel")
    const loginBtn = document.querySelector(".btn-login")

    if (
      userPanel &&
      userPanel.style.display === "block" &&
      !userPanel.contains(e.target) &&
      !loginBtn.contains(e.target)
    ) {
      userPanel.style.display = "none"
    }
  })
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function showSection(sectionId) {
  // Esconder todas as seções
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none"
  })

  // Mostrar seção específica
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.style.display = "block"
    targetSection.scrollIntoView({ behavior: "smooth" })
  }
}

function updateActiveNav(activeLink) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  activeLink.classList.add("active")
}

// ===== CONTROLE DE MODAIS =====
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  document.body.style.overflow = "auto"
}

// ===== SISTEMA DE AUTENTICAÇÃO =====
function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    updateUserInterface()
    closeModal("loginModal")
    showNotification("Login realizado com sucesso!", "success")

    // Limpar form
    document.getElementById("loginForm").reset()

    // Verificar se há uma adoção pendente
    const gatoParaAdocao = localStorage.getItem("gatoParaAdocao")
    if (gatoParaAdocao && currentUser.role === "ADOTANTE") {
      localStorage.removeItem("gatoParaAdocao")
      setTimeout(() => {
        tentarAdocao(Number.parseInt(gatoParaAdocao))
      }, 1000)
    }
  } else {
    showNotification("Email ou senha incorretos!", "error")
  }
}

function handleCadastro(e) {
  e.preventDefault()

  const userData = {
    id: nextId.users++,
    username: document.getElementById("cadastroUsername").value,
    email: document.getElementById("cadastroEmail").value,
    password: document.getElementById("cadastroPassword").value,
    role: "ADOTANTE",
    telefone: document.getElementById("cadastroTelefone").value,
    possuiAnimais: document.getElementById("possuiAnimais").checked,
    possuiCasaSegura: document.getElementById("possuiCasaSegura").checked,
    descricaoAdicional: document.getElementById("descricaoAdicional").value,
  }

  // Verificar se email já existe
  if (users.find((u) => u.email === userData.email)) {
    showNotification("Este email já está cadastrado!", "error")
    return
  }

  users.push(userData)
  currentUser = userData
  localStorage.setItem("currentUser", JSON.stringify(userData))

  updateUserInterface()
  closeModal("cadastroModal")
  showNotification("Cadastro realizado com sucesso!", "success")

  // Limpar form
  document.getElementById("cadastroForm").reset()

  // Verificar se há uma adoção pendente
  const gatoParaAdocao = localStorage.getItem("gatoParaAdocao")
  if (gatoParaAdocao) {
    localStorage.removeItem("gatoParaAdocao")
    setTimeout(() => {
      tentarAdocao(Number.parseInt(gatoParaAdocao))
    }, 1000)
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserInterface()
  showNotification("Logout realizado com sucesso!", "info")


  
}

function updateUserInterface() {
  const loginBtn = document.querySelector(".btn-login")
  const btnCadastroGato = document.getElementById("btnCadastroGato")
  const btnCadastroParceiro = document.getElementById("btnCadastroParceiro")

  if (currentUser) {
    loginBtn.textContent = currentUser.username
    loginBtn.onclick = toggleUserPanel

    // Remover painel existente para forçar recriação com dados atualizados
    const existingPanel = document.querySelector(".user-panel")
    if (existingPanel) {
      existingPanel.remove()
    }

    if (currentUser.role === "ADMIN") {
      btnCadastroGato.style.display = "block"
      btnCadastroParceiro.style.display = "block"
    } else {
      btnCadastroGato.style.display = "none"
      btnCadastroParceiro.style.display = "none"
    }

    // Recarregar gatos para mostrar botões de adoção
    loadGatos()
    loadParceiros()
  } else {
    loginBtn.textContent = "Login"
    loginBtn.onclick = () => openModal("loginModal")
    btnCadastroGato.style.display = "none"
    btnCadastroParceiro.style.display = "none"

    // Remover painel do usuário
    const existingPanel = document.querySelector(".user-panel")
    if (existingPanel) {
      existingPanel.remove()
    }

    // Recarregar gatos para esconder botões de adoção
    loadGatos()
    loadParceiros()
  }
}

function toggleUserPanel() {
  let panel = document.querySelector(".user-panel")

  if (panel && panel.style.display === "block") {
    panel.style.display = "none"
  } else {
    // Remover painel existente
    if (panel) {
      panel.remove()
    }

    // Criar novo painel com dados atualizados
    panel = createUserPanel()
    document.body.appendChild(panel)
    panel.style.display = "block"
  }
}

function createUserPanel() {
  const panel = document.createElement("div")
  panel.className = "user-panel"

  panel.innerHTML = `
    <div class="user-info">
      <strong>${currentUser.username}</strong>
      <div>${currentUser.email}</div>
      <div>Tipo: ${currentUser.role}</div>
    </div>
    <div class="user-actions">
      ${currentUser.role === "ADMIN" ? "<button onclick=\"openModal('adminModal'); loadAdminPanel()\">Painel Admin</button>" : ""}
      <button onclick="verMeusPedidos()">Meus Pedidos</button>
      <button onclick="logout(); toggleUserPanel()">Sair</button>
    </div>
  `

  return panel
}

// ===== SISTEMA DE GATOS =====
function loadGatos() {
  const gatosGrid = document.getElementById("gatosGrid")
  gatosGrid.innerHTML = ""

  gatos.forEach((gato) => {
    const gatoCard = createGatoCard(gato)
    gatosGrid.appendChild(gatoCard)
  })
}

function createGatoCard(gato) {
  const card = document.createElement("div")
  card.className = "gato-card"

  const idadeTexto = gato.idade < 12 ? `${gato.idade} meses` : `${Math.floor(gato.idade / 12)} anos`
  const categoriaIdade = gato.idade < 12 ? "filhote" : gato.idade < 36 ? "jovem" : "adulto"

  // Determinar botões baseado no usuário e status do gato
  let botoesAcao = ""

  // Botão de adotar apenas para adotantes e gatos disponíveis
  if (!gato.adotado && (!currentUser || currentUser.role === "ADOTANTE")) {
    botoesAcao += `<button class="btn btn-primary" onclick="tentarAdocao(${gato.id})">Adotar</button>`
  }

  // Botões de admin apenas para administradores
  if (currentUser && currentUser.role === "ADMIN") {
    botoesAcao += `
      <button class="btn btn-secondary btn-small" onclick="editarGato(${gato.id})">Editar</button>
      <button class="btn btn-danger btn-small" onclick="excluirGato(${gato.id})">Excluir</button>
    `
  }

  botoesAcao += `<button class="btn btn-outline btn-small" onclick="verDetalhesGato(${gato.id})">Ver Detalhes</button>`

  card.innerHTML = `
    <img src="${gato.foto}" alt="${gato.nome}" onerror="this.src='assets/images/placeholder-cat.jpg'" onclick="verDetalhesGato(${gato.id})">
    <div class="gato-card-content">
      <h3 onclick="verDetalhesGato(${gato.id})" style="cursor: pointer;">${gato.nome}</h3>
      <div class="gato-info">
        <span><i class="fas fa-venus-mars"></i> ${gato.sexo === "M" ? "Macho" : "Fêmea"}</span>
        <span><i class="fas fa-birthday-cake"></i> ${idadeTexto}</span>
      </div>
      <p>${gato.descricao}</p>
      <div class="gato-status ${gato.adotado ? "status-adotado" : "status-disponivel"}">
        ${gato.adotado ? "Adotado" : "Disponível"}
      </div>
      <div class="gato-actions">
        ${botoesAcao}
      </div>
    </div>
  `

  // Adicionar atributos para filtros
  card.setAttribute("data-sexo", gato.sexo)
  card.setAttribute("data-idade", categoriaIdade)
  card.setAttribute("data-adotado", gato.adotado)

  return card
}

function verDetalhesGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  const idadeTexto = gato.idade < 12 ? `${gato.idade} meses` : `${Math.floor(gato.idade / 12)} anos`

  // Determinar botões de ação no modal
  let botoesAcao = ""

  if (!gato.adotado && (!currentUser || currentUser.role === "ADOTANTE")) {
    botoesAcao += `<button class="btn btn-primary" onclick="tentarAdocao(${gato.id}); this.closest('.modal').remove()">Adotar</button>`
  }

  if (currentUser && currentUser.role === "ADMIN") {
    botoesAcao += `
      <button class="btn btn-secondary" onclick="editarGato(${gato.id}); this.closest('.modal').remove()">Editar</button>
      <button class="btn btn-danger" onclick="excluirGato(${gato.id}); this.closest('.modal').remove()">Excluir</button>
    `
  }

  const modal = document.createElement("div")
  modal.className = "modal"
  modal.style.display = "block"
  modal.innerHTML = `
    <div class="modal-content modal-detalhes-gato">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <div class="detalhes-gato-content">
        <div class="detalhes-gato-imagem">
          <img src="${gato.foto}" alt="${gato.nome}" onerror="this.src='assets/images/placeholder-cat.jpg'">
        </div>
        <div class="detalhes-gato-info">
          <h2>${gato.nome}</h2>
          <div class="gato-status ${gato.adotado ? "status-adotado" : "status-disponivel"}">
            ${gato.adotado ? "Adotado" : "Disponível para Adoção"}
          </div>
          <div class="detalhes-info-grid">
            <div class="info-item">
              <i class="fas fa-venus-mars"></i>
              <span><strong>Sexo:</strong> ${gato.sexo === "M" ? "Macho" : "Fêmea"}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-birthday-cake"></i>
              <span><strong>Idade:</strong> ${idadeTexto}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-heart"></i>
              <span><strong>Status:</strong> ${gato.adotado ? "Adotado" : "Disponível"}</span>
            </div>
          </div>
          <div class="descricao-completa">
            <h3>Sobre ${gato.nome}</h3>
            <p>${gato.descricao}</p>
          </div>
          <div class="detalhes-actions">
            ${botoesAcao}
          </div>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)
}

function handleCadastroGato(e) {
  e.preventDefault()

  const gatoData = {
    id: nextId.gatos++,
    nome: document.getElementById("gatoNome").value,
    sexo: document.getElementById("gatoSexo").value,
    idade: Number.parseInt(document.getElementById("gatoIdade").value),
    descricao: document.getElementById("gatoDescricao").value,
    adotado: false,
    foto: "assets/images/placeholder-cat.jpg",
  }

  gatos.push(gatoData)
  loadGatos()
  closeModal("cadastroGatoModal")
  showNotification("Gato cadastrado com sucesso!", "success")

  // Limpar form
  document.getElementById("cadastroGatoForm").reset()
}

function filterGatos() {
  const filtroSexo = document.getElementById("filtroSexo").value
  const filtroIdade = document.getElementById("filtroIdade").value

  const gatoCards = document.querySelectorAll(".gato-card")

  gatoCards.forEach((card) => {
    const sexo = card.getAttribute("data-sexo")
    const idade = card.getAttribute("data-idade")

    let show = true

    if (filtroSexo && sexo !== filtroSexo) show = false
    if (filtroIdade && idade !== filtroIdade) show = false

    card.style.display = show ? "block" : "none"
  })
}

function solicitarAdocao(gatoId) {
  if (!currentUser) {
    showNotification("Você precisa estar logado para solicitar adoção!", "error")
    return
  }

  // Verificar se já existe pedido pendente para este gato
  const pedidoExistente = pedidosAdocao.find(
    (p) => p.gatoId === gatoId && p.adotanteId === currentUser.id && p.status === "PENDENTE",
  )

  if (pedidoExistente) {
    showNotification("Você já possui um pedido pendente para este gato!", "error")
    return
  }

  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  const pedido = {
    id: nextId.pedidos++,
    gatoId: gatoId,
    adotanteId: currentUser.id,
    data: new Date().toISOString(),
    status: "PENDENTE",
    dataAprovacao: null,
  }

  pedidosAdocao.push(pedido)
  showNotification(`Pedido de adoção para ${gato.nome} enviado com sucesso!`, "success")
}

function tentarAdocao(gatoId) {
  if (!currentUser) {
    // Usuário não está logado - mostrar modal de login
    showNotification("Para adotar um gatinho, você precisa fazer login ou se cadastrar!", "info")

    // Salvar o ID do gato para depois da autenticação
    localStorage.setItem("gatoParaAdocao", gatoId)

    // Abrir modal de login
    openModal("loginModal")
    return
  }

  if (currentUser.role !== "ADOTANTE") {
    showNotification("Apenas usuários adotantes podem solicitar adoção!", "error")
    return
  }

  // Se chegou aqui, está logado como adotante
  solicitarAdocao(gatoId)
}

function editarGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  // Preencher form com dados do gato
  document.getElementById("gatoNome").value = gato.nome
  document.getElementById("gatoSexo").value = gato.sexo
  document.getElementById("gatoIdade").value = gato.idade
  document.getElementById("gatoDescricao").value = gato.descricao

  // Abrir modal
  openModal("cadastroGatoModal")

  // Alterar comportamento do form para edição
  const form = document.getElementById("cadastroGatoForm")
  form.onsubmit = (e) => {
    e.preventDefault()

    gato.nome = document.getElementById("gatoNome").value
    gato.sexo = document.getElementById("gatoSexo").value
    gato.idade = Number.parseInt(document.getElementById("gatoIdade").value)
    gato.descricao = document.getElementById("gatoDescricao").value

    loadGatos()
    closeModal("cadastroGatoModal")
    showNotification("Gato atualizado com sucesso!", "success")

    // Restaurar comportamento original
    form.onsubmit = handleCadastroGato
    form.reset()
  }
}

function excluirGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  if (confirm(`Tem certeza que deseja excluir o gato "${gato.nome}"?`)) {
    const index = gatos.findIndex((g) => g.id === gatoId)
    if (index !== -1) {
      // Remover pedidos de adoção relacionados a este gato
      for (let i = pedidosAdocao.length - 1; i >= 0; i--) {
        if (pedidosAdocao[i].gatoId === gatoId) {
          pedidosAdocao.splice(i, 1)
        }
      }

      // Remover o gato
      gatos.splice(index, 1)
      loadGatos()
      showNotification(`Gato "${gato.nome}" excluído com sucesso!`, "success")
    }
  }
}

// ===== SISTEMA DE PARCEIROS =====
function loadParceiros() {
  const parceirosGrid = document.getElementById("parceirosGrid")
  parceirosGrid.innerHTML = ""

  parceiros.forEach((parceiro) => {
    const parceiroCard = createParceiroCard(parceiro)
    parceirosGrid.appendChild(parceiroCard)
  })
}

function createParceiroCard(parceiro) {
  const card = document.createElement("div")
  card.className = "parceiro-card"

  card.innerHTML = `
    <h3>${parceiro.nome}</h3>
    <div class="parceiro-categoria">${CATEGORIA_TEXTOS[parceiro.categoria]}</div>
    <p>${parceiro.descricao}</p>
    <div class="parceiro-contato">
      <div><i class="fas fa-envelope"></i> ${parceiro.email}</div>
      <div><i class="fas fa-phone"></i> ${parceiro.telefone}</div>
      ${parceiro.endereco ? `<div><i class="fas fa-map-marker-alt"></i> ${parceiro.endereco}</div>` : ""}
    </div>
    ${
      currentUser && currentUser.role === "ADMIN"
        ? `<div class="parceiro-actions">
            <button class="btn btn-secondary btn-small" onclick="editarParceiro(${parceiro.id})">Editar</button>
            <button class="btn btn-danger btn-small" onclick="excluirParceiro(${parceiro.id})">Excluir</button>
           </div>`
        : ""
    }
  `

  card.setAttribute("data-categoria", parceiro.categoria)
  return card
}

function editarParceiro(parceiroId) {
  const parceiro = parceiros.find((p) => p.id === parceiroId)
  if (!parceiro) return

  // Preencher form com dados do parceiro
  document.getElementById("parceiroNome").value = parceiro.nome
  document.getElementById("parceiroCategoria").value = parceiro.categoria
  document.getElementById("parceiroEmail").value = parceiro.email
  document.getElementById("parceiroTelefone").value = parceiro.telefone
  document.getElementById("parceiroEndereco").value = parceiro.endereco
  document.getElementById("parceiroCnpj").value = parceiro.cnpj
  document.getElementById("parceiroDescricao").value = parceiro.descricao

  // Abrir modal
  openModal("cadastroParceiroModal")

  // Alterar comportamento do form para edição
  const form = document.getElementById("cadastroParceiroForm")
  form.onsubmit = (e) => {
    e.preventDefault()

    parceiro.nome = document.getElementById("parceiroNome").value
    parceiro.categoria = document.getElementById("parceiroCategoria").value
    parceiro.email = document.getElementById("parceiroEmail").value
    parceiro.telefone = document.getElementById("parceiroTelefone").value
    parceiro.endereco = document.getElementById("parceiroEndereco").value
    parceiro.cnpj = document.getElementById("parceiroCnpj").value
    parceiro.descricao = document.getElementById("parceiroDescricao").value

    loadParceiros()
    closeModal("cadastroParceiroModal")
    showNotification("Parceiro atualizado com sucesso!", "success")

    // Restaurar comportamento original
    form.onsubmit = handleCadastroParceiro
    form.reset()
  }
}

function excluirParceiro(parceiroId) {
  if (confirm("Tem certeza que deseja excluir este parceiro?")) {
    const index = parceiros.findIndex((p) => p.id === parceiroId)
    if (index !== -1) {
      parceiros.splice(index, 1)
      loadParceiros()
      showNotification("Parceiro excluído com sucesso!", "success")
    }
  }
}

function handleCadastroParceiro(e) {
  e.preventDefault()

  const parceiroData = {
    id: nextId.parceiros++,
    nome: document.getElementById("parceiroNome").value,
    categoria: document.getElementById("parceiroCategoria").value,
    email: document.getElementById("parceiroEmail").value,
    telefone: document.getElementById("parceiroTelefone").value,
    endereco: document.getElementById("parceiroEndereco").value,
    cnpj: document.getElementById("parceiroCnpj").value,
    descricao: document.getElementById("parceiroDescricao").value,
  }

  parceiros.push(parceiroData)
  loadParceiros()
  closeModal("cadastroParceiroModal")
  showNotification("Parceiro cadastrado com sucesso!", "success")

  // Limpar form
  document.getElementById("cadastroParceiroForm").reset()
}

function filterParceiros() {
  const filtroCategoria = document.getElementById("filtroParceiros").value
  const parceiroCards = document.querySelectorAll(".parceiro-card")

  parceiroCards.forEach((card) => {
    const categoria = card.getAttribute("data-categoria")
    const show = !filtroCategoria || categoria === filtroCategoria
    card.style.display = show ? "block" : "none"
  })
}

// ===== PAINEL ADMINISTRATIVO =====
function loadAdminPanel() {
  showAdminTab("pedidos")
}

function showAdminTab(tab) {
  // Atualizar botões de tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[onclick="showAdminTab('${tab}')"]`).classList.add("active")

  const adminContent = document.getElementById("adminContent")

  switch (tab) {
    case "pedidos":
      adminContent.innerHTML = createPedidosAdminContent()
      break
    case "usuarios":
      adminContent.innerHTML = createUsuariosAdminContent()
      break
    case "gatos":
      adminContent.innerHTML = createGatosAdminContent()
      break
  }
}

function createPedidosAdminContent() {
  let content = "<h3>Pedidos de Adoção</h3>"

  if (pedidosAdocao.length === 0) {
    content += "<p>Nenhum pedido de adoção encontrado.</p>"
    return content
  }

  pedidosAdocao.forEach((pedido) => {
    const gato = gatos.find((g) => g.id === pedido.gatoId)
    const adotante = users.find((u) => u.id === pedido.adotanteId)

    content += `
      <div class="pedido-item">
        <div class="pedido-header">
          <strong>${gato ? gato.nome : "Gato não encontrado"}</strong>
          <span class="pedido-status status-${pedido.status.toLowerCase()}">${pedido.status}</span>
        </div>
        <div>Adotante: ${adotante ? adotante.username : "Usuário não encontrado"}</div>
        <div>Email: ${adotante ? adotante.email : "N/A"}</div>
        <div>Telefone: ${adotante ? adotante.telefone : "N/A"}</div>
        <div>Data do pedido: ${new Date(pedido.data).toLocaleDateString("pt-BR")}</div>
        ${
          pedido.status === "PENDENTE"
            ? `
            <div class="pedido-actions">
              <button class="btn btn-primary btn-small" onclick="aprovarPedido(${pedido.id})">Aprovar</button>
              <button class="btn btn-secondary btn-small" onclick="rejeitarPedido(${pedido.id})">Rejeitar</button>
            </div>
          `
            : ""
        }
      </div>
    `
  })

  return content
}

function createUsuariosAdminContent() {
  let content = "<h3>Usuários Cadastrados</h3>"

  users.forEach((user) => {
    content += `
      <div class="pedido-item">
        <div class="pedido-header">
          <strong>${user.username}</strong>
          <span class="pedido-status">${user.role}</span>
        </div>
        <div>Email: ${user.email}</div>
        <div>Telefone: ${user.telefone || "Não informado"}</div>
        <div>Possui animais: ${user.possuiAnimais ? "Sim" : "Não"}</div>
        <div>Casa segura: ${user.possuiCasaSegura ? "Sim" : "Não"}</div>
        ${user.descricaoAdicional ? `<div>Descrição: ${user.descricaoAdicional}</div>` : ""}
      </div>
    `
  })

  return content
}

function createGatosAdminContent() {
  let content = "<h3>Gatos Cadastrados</h3>"

  gatos.forEach((gato) => {
    const idadeTexto = gato.idade < 12 ? `${gato.idade} meses` : `${Math.floor(gato.idade / 12)} anos`

    content += `
      <div class="pedido-item">
        <div class="pedido-header">
          <strong>${gato.nome}</strong>
          <span class="pedido-status ${gato.adotado ? "status-adotado" : "status-disponivel"}">
            ${gato.adotado ? "Adotado" : "Disponível"}
          </span>
        </div>
        <div>Sexo: ${gato.sexo === "M" ? "Macho" : "Fêmea"}</div>
        <div>Idade: ${idadeTexto}</div>
        <div>Descrição: ${gato.descricao}</div>
        <div class="pedido-actions">
          <button class="btn btn-secondary btn-small" onclick="toggleAdocaoGato(${gato.id})">
            ${gato.adotado ? "Marcar como Disponível" : "Marcar como Adotado"}
          </button>
          <button class="btn btn-primary btn-small" onclick="editarGato(${gato.id}); closeModal('adminModal')">
            Editar
          </button>
        </div>
      </div>
    `
  })

  return content
}

function aprovarPedido(pedidoId) {
  const pedido = pedidosAdocao.find((p) => p.id === pedidoId)
  if (pedido) {
    pedido.status = "APROVADO"
    pedido.dataAprovacao = new Date().toISOString()

    // Marcar gato como adotado
    const gato = gatos.find((g) => g.id === pedido.gatoId)
    if (gato) {
      gato.adotado = true
    }

    loadGatos()
    showAdminTab("pedidos")
    showNotification("Pedido aprovado com sucesso!", "success")
  }
}

function rejeitarPedido(pedidoId) {
  const pedido = pedidosAdocao.find((p) => p.id === pedidoId)
  if (pedido) {
    pedido.status = "REJEITADO"
    showAdminTab("pedidos")
    showNotification("Pedido rejeitado.", "info")
  }
}

function toggleAdocaoGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (gato) {
    gato.adotado = !gato.adotado
    loadGatos()
    showAdminTab("gatos")
    showNotification(`Status do gato ${gato.nome} atualizado!`, "success")
  }
}

function verMeusPedidos() {
  if (!currentUser) return

  const meusPedidos = pedidosAdocao.filter((p) => p.adotanteId === currentUser.id)

  let content = "<h2>Meus Pedidos de Adoção</h2>"

  if (meusPedidos.length === 0) {
    content += "<p>Você ainda não fez nenhum pedido de adoção.</p>"
  } else {
    meusPedidos.forEach((pedido) => {
      const gato = gatos.find((g) => g.id === pedido.gatoId)
      content += `
        <div class="pedido-item">
          <div class="pedido-header">
            <strong>${gato ? gato.nome : "Gato não encontrado"}</strong>
            <span class="pedido-status status-${pedido.status.toLowerCase()}">${pedido.status}</span>
          </div>
          <div>Data do pedido: ${new Date(pedido.data).toLocaleDateString("pt-BR")}</div>
          ${pedido.dataAprovacao ? `<div>Data de aprovação: ${new Date(pedido.dataAprovacao).toLocaleDateString("pt-BR")}</div>` : ""}
        </div>
      `
    })
  }

  // Criar modal temporário para mostrar os pedidos
  const modal = document.createElement("div")
  modal.className = "modal"
  modal.style.display = "block"
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      ${content}
    </div>
  `

  document.body.appendChild(modal)
  toggleUserPanel() // Fechar painel do usuário
}

// ===== CONTATO =====
function handleContato(e) {
  e.preventDefault()

  // Simular envio de mensagem
  showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
  e.target.reset()
}

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Mostrar notificação
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Remover notificação após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notification.parentElement) {
        notification.parentElement.removeChild(notification)
      }
    }, 300)
  }, 3000)
}






function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  nav.classList.toggle('nav-mobile-active');
  overlay.classList.toggle('active');
  body.classList.toggle('no-scroll');
}
