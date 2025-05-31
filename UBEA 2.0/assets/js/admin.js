// ===== PAINEL ADMINISTRATIVO =====

// Declare variables before using them
const pedidosAdocao = []
const gatos = []
const users = []

// Function to format date
function formatarData(date) {
  return new Date(date).toLocaleDateString()
}

// Function to format age
function formatarIdade(idade) {
  return `${idade} anos`
}

// Function to load gatos
function loadGatos() {
  // Implementation to load gatos
}

// Function to show notification
function showNotification(message, type) {
  // Implementation to show notification
}

// Carregar painel admin
function loadAdminPanel() {
  showAdminTab("pedidos")
}

// Mostrar aba do admin
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

// Criar conteúdo da aba de pedidos
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
        <div>Data do pedido: ${formatarData(pedido.data)}</div>
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

// Criar conteúdo da aba de usuários
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

// Criar conteúdo da aba de gatos
function createGatosAdminContent() {
  let content = "<h3>Gatos Cadastrados</h3>"

  gatos.forEach((gato) => {
    const idadeTexto = formatarIdade(gato.idade)

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
          <button class="btn btn-secondary btn-small" onclick="toggleAdocaoGato(${gato.id}); closeModal('adminModal')">
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

// Aprovar pedido de adoção
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

// Rejeitar pedido de adoção
function rejeitarPedido(pedidoId) {
  const pedido = pedidosAdocao.find((p) => p.id === pedidoId)
  if (pedido) {
    pedido.status = "REJEITADO"
    showAdminTab("pedidos")
    showNotification("Pedido rejeitado.", "info")
  }
}

// Alternar status de adoção do gato
function toggleAdocaoGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (gato) {
    gato.adotado = !gato.adotado
    loadGatos()
    showAdminTab("gatos")
    showNotification(`Status do gato ${gato.nome} atualizado!`, "success")
  }
}
