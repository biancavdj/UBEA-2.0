// ===== SISTEMA DE GATOS =====

// Declare variables before using them
const gatos = []
const pedidosAdocao = []
const currentUser = null
const nextId = { gatos: 0, pedidos: 0 }

// Function to format age
function formatarIdade(idade) {
  return `${idade} anos`
}

// Function to categorize age
function categorizarIdade(idade) {
  if (idade < 1) return "bebê"
  if (idade < 3) return "jovem"
  if (idade < 7) return "adulto"
  return "idoso"
}

// Function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "block"
  }
}

// Function to close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
  }
}

// Function to show notification
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = message
  document.body.appendChild(notification)

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

// Function to clear form
function limparFormulario(formId) {
  const form = document.getElementById(formId)
  if (form) {
    form.reset()
  }
}

// Carregar gatos na interface
function loadGatos() {
  const gatosGrid = document.getElementById("gatosGrid")
  gatosGrid.innerHTML = ""

  gatos.forEach((gato) => {
    const gatoCard = createGatoCard(gato)
    gatosGrid.appendChild(gatoCard)
  })
}

// Criar card do gato
function createGatoCard(gato) {
  const card = document.createElement("div")
  card.className = "gato-card"

  const idadeTexto = formatarIdade(gato.idade)
  const categoriaIdade = categorizarIdade(gato.idade)

  // Determinar botões baseado no usuário e status do gato
  let botoesAcao = ""

  if (!gato.adotado && (!currentUser || currentUser.role === "ADOTANTE")) {
    botoesAcao += `<button class="btn btn-primary" onclick="tentarAdocao(${gato.id})">Adotar</button>`
  }

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

// Ver detalhes do gato
function verDetalhesGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  const idadeTexto = formatarIdade(gato.idade)

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

// Cadastrar novo gato
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

  limparFormulario("cadastroGatoForm")
}

// Filtrar gatos
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

// Solicitar adoção
function solicitarAdocao(gatoId) {
  if (!currentUser) {
    showNotification("Você precisa estar logado para solicitar adoção!", "error")
    return
  }

  // Verificar se já existe pedido pendente
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

// Tentar adoção (com verificação de login)
function tentarAdocao(gatoId) {
  if (!currentUser) {
    showNotification("Para adotar um gatinho, você precisa fazer login ou se cadastrar!", "info")
    localStorage.setItem("gatoParaAdocao", gatoId)
    openModal("loginModal")
    return
  }

  if (currentUser.role !== "ADOTANTE") {
    showNotification("Apenas usuários adotantes podem solicitar adoção!", "error")
    return
  }

  solicitarAdocao(gatoId)
}

// Editar gato
function editarGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  // Preencher form
  document.getElementById("gatoNome").value = gato.nome
  document.getElementById("gatoSexo").value = gato.sexo
  document.getElementById("gatoIdade").value = gato.idade
  document.getElementById("gatoDescricao").value = gato.descricao

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
    limparFormulario("cadastroGatoForm")
  }
}

// Excluir gato
function excluirGato(gatoId) {
  const gato = gatos.find((g) => g.id === gatoId)
  if (!gato) return

  if (confirm(`Tem certeza que deseja excluir o gato "${gato.nome}"?`)) {
    const index = gatos.findIndex((g) => g.id === gatoId)
    if (index !== -1) {
      // Remover pedidos relacionados
      for (let i = pedidosAdocao.length - 1; i >= 0; i--) {
        if (pedidosAdocao[i].gatoId === gatoId) {
          pedidosAdocao.splice(i, 1)
        }
      }

      gatos.splice(index, 1)
      loadGatos()
      showNotification(`Gato "${gato.nome}" excluído com sucesso!`, "success")
    }
  }
}
