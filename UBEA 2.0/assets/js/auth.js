// ===== SISTEMA DE AUTENTICAÇÃO =====

// Declaração de variáveis globais
const users = []
let currentUser = null
const nextId = { users: 0 }
const pedidosAdocao = []
const gatos = []

// Função para validar email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Função para formatar data
function formatarData(data) {
  return new Date(data).toLocaleDateString()
}

// Função para limpar formulário
function limparFormulario(formId) {
  const form = document.getElementById(formId)
  form.reset()
}

// Função para abrir modal
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "block"
}

// Função para fechar modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "none"
}

// Função para carregar gatos
function loadGatos() {
  // Implementação para carregar gatos
}

// Função para carregar parceiros
function loadParceiros() {
  // Implementação para carregar parceiros
}

// Função para carregar painel admin
function loadAdminPanel() {
  // Implementação para carregar painel admin
}

// Manipulação do login
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

    limparFormulario("loginForm")

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

// Manipulação do cadastro
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

  // Validar email
  if (!validarEmail(userData.email)) {
    showNotification("Por favor, insira um email válido!", "error")
    return
  }

  users.push(userData)
  currentUser = userData
  localStorage.setItem("currentUser", JSON.stringify(userData))

  updateUserInterface()
  closeModal("cadastroModal")
  showNotification("Cadastro realizado com sucesso!", "success")

  limparFormulario("cadastroForm")

  // Verificar se há uma adoção pendente
  const gatoParaAdocao = localStorage.getItem("gatoParaAdocao")
  if (gatoParaAdocao) {
    localStorage.removeItem("gatoParaAdocao")
    setTimeout(() => {
      tentarAdocao(Number.parseInt(gatoParaAdocao))
    }, 1000)
  }
}

// Logout
function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserInterface()
  showNotification("Logout realizado com sucesso!", "info")
}

// Atualizar interface do usuário
function updateUserInterface() {
  const loginBtn = document.querySelector(".btn-login")
  const btnCadastroGato = document.getElementById("btnCadastroGato")
  const btnCadastroParceiro = document.getElementById("btnCadastroParceiro")

  if (currentUser) {
    loginBtn.textContent = currentUser.username
    loginBtn.onclick = toggleUserPanel

    // Remover painel existente
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

    // Recarregar interfaces
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

    loadGatos()
    loadParceiros()
  }
}

// Controle do painel do usuário
function toggleUserPanel() {
  let panel = document.querySelector(".user-panel")

  if (panel && panel.style.display === "block") {
    panel.style.display = "none"
  } else {
    if (panel) {
      panel.remove()
    }

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

// Ver pedidos do usuário
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
          <div>Data do pedido: ${formatarData(pedido.data)}</div>
          ${pedido.dataAprovacao ? `<div>Data de aprovação: ${formatarData(pedido.dataAprovacao)}</div>` : ""}
        </div>
      `
    })
  }

  // Criar modal temporário
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
  toggleUserPanel()
}

// Função para tentar adoção
function tentarAdocao(gatoId) {
  // Implementação para tentar adoção
}

// Função para mostrar notificação
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
