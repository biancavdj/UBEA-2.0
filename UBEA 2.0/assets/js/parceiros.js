// ===== SISTEMA DE PARCEIROS =====

// Declare variables before using them
const parceiros = [] // Example declaration, replace with actual data source
const CATEGORIA_TEXTOS = {} // Example declaration, replace with actual category texts
const currentUser = {} // Example declaration, replace with actual user data
const nextId = { parceiros: 1 } // Example declaration, replace with actual ID management
function validarEmail(email) {
  return true
} // Example declaration, replace with actual email validation logic
function showNotification(message, type) {
  console.log(message)
} // Example declaration, replace with actual notification logic
function closeModal(modalId) {
  console.log(modalId)
} // Example declaration, replace with actual modal closing logic
function limparFormulario(formId) {
  console.log(formId)
} // Example declaration, replace with actual form clearing logic
function openModal(modalId) {
  console.log(modalId)
} // Example declaration, replace with actual modal opening logic

// Carregar parceiros na interface
function loadParceiros() {
  const parceirosGrid = document.getElementById("parceirosGrid")
  parceirosGrid.innerHTML = ""

  parceiros.forEach((parceiro) => {
    const parceiroCard = createParceiroCard(parceiro)
    parceirosGrid.appendChild(parceiroCard)
  })
}

// Criar card do parceiro
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

// Cadastrar novo parceiro
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

  // Validar email
  if (!validarEmail(parceiroData.email)) {
    showNotification("Por favor, insira um email válido!", "error")
    return
  }

  parceiros.push(parceiroData)
  loadParceiros()
  closeModal("cadastroParceiroModal")
  showNotification("Parceiro cadastrado com sucesso!", "success")

  limparFormulario("cadastroParceiroForm")
}

// Editar parceiro
function editarParceiro(parceiroId) {
  const parceiro = parceiros.find((p) => p.id === parceiroId)
  if (!parceiro) return

  // Preencher form
  document.getElementById("parceiroNome").value = parceiro.nome
  document.getElementById("parceiroCategoria").value = parceiro.categoria
  document.getElementById("parceiroEmail").value = parceiro.email
  document.getElementById("parceiroTelefone").value = parceiro.telefone
  document.getElementById("parceiroEndereco").value = parceiro.endereco
  document.getElementById("parceiroCnpj").value = parceiro.cnpj
  document.getElementById("parceiroDescricao").value = parceiro.descricao

  openModal("cadastroParceiroModal")

  // Alterar comportamento do form para edição
  const form = document.getElementById("cadastroParceiroForm")
  form.onsubmit = (e) => {
    e.preventDefault()

    // Validar email
    const novoEmail = document.getElementById("parceiroEmail").value
    if (!validarEmail(novoEmail)) {
      showNotification("Por favor, insira um email válido!", "error")
      return
    }

    parceiro.nome = document.getElementById("parceiroNome").value
    parceiro.categoria = document.getElementById("parceiroCategoria").value
    parceiro.email = novoEmail
    parceiro.telefone = document.getElementById("parceiroTelefone").value
    parceiro.endereco = document.getElementById("parceiroEndereco").value
    parceiro.cnpj = document.getElementById("parceiroCnpj").value
    parceiro.descricao = document.getElementById("parceiroDescricao").value

    loadParceiros()
    closeModal("cadastroParceiroModal")
    showNotification("Parceiro atualizado com sucesso!", "success")

    // Restaurar comportamento original
    form.onsubmit = handleCadastroParceiro
    limparFormulario("cadastroParceiroForm")
  }
}

// Excluir parceiro
function excluirParceiro(parceiroId) {
  const parceiro = parceiros.find((p) => p.id === parceiroId)
  if (!parceiro) return

  if (confirm(`Tem certeza que deseja excluir o parceiro "${parceiro.nome}"?`)) {
    const index = parceiros.findIndex((p) => p.id === parceiroId)
    if (index !== -1) {
      parceiros.splice(index, 1)
      loadParceiros()
      showNotification(`Parceiro "${parceiro.nome}" excluído com sucesso!`, "success")
    }
  }
}

// Filtrar parceiros
function filterParceiros() {
  const filtroCategoria = document.getElementById("filtroParceiros").value
  const parceiroCards = document.querySelectorAll(".parceiro-card")

  parceiroCards.forEach((card) => {
    const categoria = card.getAttribute("data-categoria")
    const show = !filtroCategoria || categoria === filtroCategoria
    card.style.display = show ? "block" : "none"
  })
}
