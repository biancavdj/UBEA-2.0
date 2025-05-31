// ===== INICIALIZAÇÃO E EVENTOS PRINCIPAIS =====

// Declaração de variáveis
let currentUser
let loadGatos
let loadParceiros
let showSection
let updateActiveNav
let handleLogin
let handleCadastro
let handleCadastroGato
let handleCadastroParceiro
let filterGatos
let filterParceiros
let showNotification
let updateUserInterface

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  checkSavedUser()
})

// Inicializar aplicação
function initializeApp() {
  loadGatos()
  loadParceiros()

  // Mostrar apenas a seção inicial
  document.querySelectorAll("section").forEach((section) => {
    if (section.id !== "inicio") {
      section.style.display = "none"
    }
  })
}

// Configurar event listeners
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

  // Formulário de contato
  document.querySelector(".contato-form").addEventListener("submit", handleContato)

  // Fechar modais clicando fora
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

// Verificar usuário salvo no localStorage
function checkSavedUser() {
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUserInterface()
  }
}

// Manipular formulário de contato
function handleContato(e) {
  e.preventDefault()
  showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
  e.target.reset()
}

// Funções a serem implementadas
function loadGatos() {
  // Implementação para carregar gatos
}

function loadParceiros() {
  // Implementação para carregar parceiros
}

function showSection(target) {
  // Implementação para mostrar seção
}

function updateActiveNav(link) {
  // Implementação para atualizar nav ativo
}

function handleLogin(e) {
  // Implementação para lidar com login
}

function handleCadastro(e) {
  // Implementação para lidar com cadastro
}

function handleCadastroGato(e) {
  // Implementação para lidar com cadastro de gato
}

function handleCadastroParceiro(e) {
  // Implementação para lidar com cadastro de parceiro
}

function filterGatos() {
  // Implementação para filtrar gatos
}

function filterParceiros() {
  // Implementação para filtrar parceiros
}

function showNotification(message, type) {
  // Implementação para mostrar notificação
}

function updateUserInterface() {
  // Implementação para atualizar interface do usuário
}
