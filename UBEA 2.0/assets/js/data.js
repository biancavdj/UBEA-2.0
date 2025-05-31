// ===== DADOS SIMULADOS =====
// Em uma aplicação real, estes dados viriam de um banco de dados

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
    foto: "assets/images/gatos/mimi.jpg",
  },
  {
    id: 2,
    nome: "Thor",
    sexo: "M",
    idade: 24,
    descricao: "Gato adulto, calmo e independente. Perfeito para quem busca um companheiro tranquilo.",
    adotado: false,
    foto: "assets/images/gatos/thor.jpg",
  },
  {
    id: 3,
    nome: "Luna",
    sexo: "F",
    idade: 6,
    descricao: "Filhote muito ativa e curiosa. Precisa de uma família que tenha tempo para brincar.",
    adotado: true,
    foto: "assets/images/gatos/luna.jpg",
  },
  {
    id: 4,
    nome: "Simba",
    sexo: "M",
    idade: 18,
    descricao: "Gato jovem, muito brincalhão e carinhoso. Ama brincar com bolinhas.",
    adotado: false,
    foto: "assets/images/gatos/simba.jpg",
  },
  {
    id: 5,
    nome: "Nala",
    sexo: "F",
    idade: 36,
    descricao: "Gata adulta, muito tranquila e carinhosa. Ideal para apartamento.",
    adotado: false,
    foto: "assets/images/gatos/nala.jpg",
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
const currentUser = null

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
