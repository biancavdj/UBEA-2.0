// ===== FUNÇÕES UTILITÁRIAS =====

// Navegação entre seções
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

// Controle de modais
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  document.body.style.overflow = "auto"
}

// Sistema de notificações
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

// Formatação de idade
function formatarIdade(idadeEmMeses) {
  return idadeEmMeses < 12 ? `${idadeEmMeses} meses` : `${Math.floor(idadeEmMeses / 12)} anos`
}

// Categorização por idade
function categorizarIdade(idadeEmMeses) {
  if (idadeEmMeses < 12) return "filhote"
  if (idadeEmMeses < 36) return "jovem"
  return "adulto"
}

// Formatação de data
function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString("pt-BR")
}

// Validação de email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Limpar formulário
function limparFormulario(formId) {
  document.getElementById(formId).reset()
}
