const JogadorasIniciais = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

function getJogadoras() {
  return JSON.parse(localStorage.getItem("jogadoras")) || [];
}

function setJogadoras(jogadoras) {
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  renderJogadoras();
}

function initStorage() {
  if (!localStorage.getItem("jogadoras")) {
    setJogadoras(initialData);
  }
}

function renderJogadoras() {
  const cards = document.getElementById("cards");
  const jogadoras = getJogadoras();
  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter").value;

  const clubes = [...new Set(jogadoras.map(j => j.clube))];
  const filtroSelect = document.getElementById("filter");
  filtroSelect.innerHTML = '<option value="">Filtrar por clube</option>';
  clubes.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filtroSelect.appendChild(opt);
  });
  filtroSelect.value = filter;

  cards.innerHTML = "";
jogadoras
  .filter(j => (j.nome.toLowerCase().includes(search) || j.posicao.toLowerCase().includes(search)) &&
               (filter === "" || j.clube === filter))
  .forEach((j, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="favorita ${j.favorita ? 'ativa' : ''}" onclick="favoritarJogadora(${index})">★</span>
      <img src="${j.foto}" alt="${j.nome}">
      <h3>${j.nome}</h3>
      <p><b>Posição:</b> ${j.posicao}</p>
      <p><b>Clube:</b> ${j.clube}</p>
      <p><b>Gols:</b> ${j.gols} | <b>Assistências:</b> ${j.assistencias} | <b>Jogos:</b> ${j.jogos}</p>
    `;
    cards.appendChild(card);
  });
}
function salvarJogadora() {
  const nome = document.getElementById("nome").value.trim();
  const posicao = document.getElementById("posicao").value.trim();
  const clube = document.getElementById("clube").value.trim();
  const gols = Number(document.getElementById("gols").value);
  const assistencias = Number(document.getElementById("assistencias").value);
  const jogos = Number(document.getElementById("jogos").value);
  const foto = document.getElementById("foto").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  function favoritarJogadora(index) {
  const jogadoras = getJogadoras();
  jogadoras[index].favorita = !jogadoras[index].favorita;
  setJogadoras(jogadoras);
}

document.getElementById("search").addEventListener("input", renderJogadoras);
document.getElementById("filter").addEventListener("change", renderJogadoras);
}


initStorage();
