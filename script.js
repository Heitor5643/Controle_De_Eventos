const K_USERS = 'ef_users';
const K_SESSION = 'ef_session';
const K_EVENTS = 'ef_events';
const $ = (id) => document.getElementById(id);
let eventos = ler(K_EVENTS, []);

function ler(chave, padrao) {
  try { return JSON.parse(localStorage.getItem(chave)) || padrao; }
  catch { return padrao; }
}
function salvar(chave, valor) { localStorage.setItem(chave, JSON.stringify(valor)); }
function usuario() { return ler(K_SESSION, null); }
function aviso(msg) {
  $('toast').textContent = msg;
  $('toast').classList.add('show');
  clearTimeout($('toast').timer);
  $('toast').timer = setTimeout(() => $('toast').classList.remove('show'), 2200);
}
function idNovo() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function nulo(v) { return v ? v : 'N/A'; }
function dataBR(v) { if (!v) return 'N/A'; const [a, m, d] = v.split('-'); return `${d}/${m}/${a}`; }

function ir(pagina) {
  if (['form', 'list'].includes(pagina) && !usuario()) {
    aviso('Faca login para acessar o CRUD.');
    pagina = 'login';
  }
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  $(pagina).classList.add('active');
  if (pagina === 'list') render();
}

function atualizarMenu() {
  const logado = !!usuario();
  document.body.classList.toggle('logado', logado);
}

document.querySelectorAll('[data-page]').forEach((b) => b.onclick = () => ir(b.dataset.page));
$('sair').onclick = () => {
  localStorage.removeItem(K_SESSION);
  atualizarMenu();
  limparForm();
  aviso('Voce saiu do sistema.');
  ir('home');
};

$('formCriar').onsubmit = (e) => {
  e.preventDefault();
  const nome = $('cadNome').value.trim();
  const email = $('cadEmail').value.trim().toLowerCase();
  const senha = $('cadSenha').value;
  if (senha.length < 4) return aviso('A senha precisa ter pelo menos 4 caracteres.');
  const users = ler(K_USERS, []);
  if (users.some((u) => u.email === email)) return aviso('Esse email ja foi cadastrado.');
  const user = { id: idNovo(), nome, email, senha };
  users.push(user);
  salvar(K_USERS, users);
  salvar(K_SESSION, user);
  atualizarMenu();
  aviso('Usuario criado.');
  e.target.reset();
  ir('list');
};

$('formLogin').onsubmit = (e) => {
  e.preventDefault();
  const email = $('loginEmail').value.trim().toLowerCase();
  const senha = $('loginSenha').value;
  const user = ler(K_USERS, []).find((u) => u.email === email && u.senha === senha);
  if (!user) return aviso('Email ou senha incorretos.');
  salvar(K_SESSION, user);
  atualizarMenu();
  aviso(`Bem-vindo, ${user.nome}!`);
  e.target.reset();
  ir('list');
};

function dadosForm() {
  return {
    id: $('eventoId').value || idNovo(),
    nome: $('nome').value.trim(),
    responsavel: $('responsavel').value.trim(),
    telefone: $('telefone').value.trim(),
    data: $('data').value,
    status: $('status').value,
    local: $('local').value.trim(),
    imagem: $('imagem').value.trim(),
    atualizadoEm: new Date().toISOString(),
  };
}

$('formEvento').onsubmit = (e) => {
  e.preventDefault();
  const ev = dadosForm();
  const repetido = eventos.some((x) => x.id !== ev.id && x.nome.toLowerCase() === ev.nome.toLowerCase());
  if (repetido) return aviso('Ja existe um evento com esse nome.');
  const i = eventos.findIndex((x) => x.id === ev.id);
  if (i >= 0) eventos[i] = ev; else eventos.unshift({ ...ev, criadoEm: new Date().toISOString() });
  salvar(K_EVENTS, eventos);
  limparForm();
  aviso('Evento salvo.');
  ir('list');
};

function limparForm() {
  $('formEvento').reset();
  $('eventoId').value = '';
  $('tituloForm').textContent = 'Cadastrar evento';
  $('cancelar').classList.add('escondido');
}
$('cancelar').onclick = limparForm;

function editar(id) {
  const ev = eventos.find((x) => x.id === id);
  if (!ev) return;
  ['nome', 'responsavel', 'telefone', 'data', 'status', 'local', 'imagem'].forEach((c) => $(c).value = ev[c] || '');
  $('eventoId').value = ev.id;
  $('tituloForm').textContent = 'Editar evento';
  $('cancelar').classList.remove('escondido');
  ir('form');
}

function excluir(id) {
  const ev = eventos.find((x) => x.id === id);
  if (!ev || !confirm(`Excluir ${ev.nome}?`)) return;
  eventos = eventos.filter((x) => x.id !== id);
  salvar(K_EVENTS, eventos);
  aviso('Evento excluido.');
  render();
}

function filtro(ev) {
  const t = $('busca').value.trim().toLowerCase();
  return !t || [ev.nome, ev.responsavel, ev.local].join(' ').toLowerCase().includes(t);
}
function render() {
  const lista = eventos.filter(filtro);
  $('resumo').textContent = `${eventos.length} registro(s) no LocalStorage.`;
  $('lista').innerHTML =
lista.length
? lista.map(linha).join('')
: '<p>Nenhum evento encontrado.</p>';
function linha(ev){

  const imagem =
    ev.imagem ||
    "https://via.placeholder.com/400x200?text=Evento";

  return `
    <div class="card-evento">

      <img
        src="${imagem}"
        alt="${ev.nome}"
      >

      <div class="card-conteudo">

        <h3>${ev.nome}</h3>

        <p class="card-info">
          👤 <strong>Responsável:</strong>
          ${ev.responsavel}
        </p>

        <p class="card-info">
          📞 <strong>Telefone:</strong>
          ${nulo(ev.telefone)}
        </p>

        <p class="card-info">
          📅 <strong>Data:</strong>
          ${dataBR(ev.data)}
        </p>

        <p class="card-info">
          📍 <strong>Local:</strong>
          ${nulo(ev.local)}
        </p>

        <p class="card-info">
          🎯 <strong>Status:</strong>
          ${ev.status}
        </p>

        <div class="card-acoes">
          <button onclick="editar('${ev.id}')">
            ✏️ Editar
          </button>

          <button onclick="excluir('${ev.id}')">
            🗑️ Excluir
          </button>
        </div>

      </div>

    </div>
  `;
}
}
$('busca').oninput = render;
atualizarMenu();
ir(usuario() ? 'list' : 'home'); 
