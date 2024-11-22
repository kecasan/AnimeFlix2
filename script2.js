// Função para exibir a lista de pessoas
function loadCharacters() {
    fetch('http://localhost:3000/api/pessoa')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('character-list');
        list.innerHTML = '';
        data.forEach(person => {
            list.innerHTML += `
            <div>
                <p>${person.nome} (${person.idade}) - ${person.email}</p>
                <button onclick="deleteCharacter(${person.id_pessoa})">Deletar</button>
                <button onclick="editCharacter(${person.id_pessoa}, '${person.nome}', ${person.idade}, '${person.email}')">Editar</button>
            </div>`;                
        });
    })
    .catch(error => console.error('Erro:', error));
}

// Adicionar nova pessoa
document.getElementById('character-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/api/pessoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade, email })
    })
    .then(() => {
        loadCharacters();
        document.getElementById('character-form');
    })
    .catch(error => console.error('Erro:', error));
});

// Deletar pessoa
function deleteCharacter(id) {
    fetch(`http://localhost:3000/api/pessoa/${id}`, { method: 'DELETE' })
    .then(() => loadCharacters())
    .catch(error => console.error('Erro:', error));
}

// Editar pessoa
function editCharacter(id, nome, idade, email) {
    const nomeNovo = prompt('Novo nome:', nome);
    const idadeNova = prompt('Nova idade:', idade);
    const emailNovo = prompt('Novo email:', email);

    fetch(`http://localhost:3000/api/pessoa/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeNovo, idade: idadeNova, email: emailNovo })
    })
    .then(() => loadCharacters())
    .catch(error => console.error('Erro:', error));
}
loadCharacters();

//=======================================================

// Função para exibir a lista de animes
function loadMedias() {
    fetch('http://localhost:3000/api/anime')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('media-list');
        list.innerHTML = '';
        data.forEach(anime => {
            list.innerHTML += `
            <div>
                <p>${anime.titulo} (${anime.ano_lancamento}) - ${anime.genero}</p>
                <button onclick="deleteMedias(${anime.id_anime})">Deletar</button>
                <button onclick="editMedias(${anime.id_anime}, '${anime.titulo}', ${anime.ano_lancamento}, '${anime.genero}')">Editar</button>
            </div>`;                
        });
    })
    .catch(error => console.error('Erro:', error));
}

// Adicionar novo anime
document.getElementById('media-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const ano_lancamento = document.getElementById('ano_lancamento').value;
    const genero = document.getElementById('genero').value;

    fetch('http://localhost:3000/api/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, ano_lancamento, genero })
    })
    .then(() => {
        loadMedias();
        document.getElementById('media-form').requestFullscreen();
    })
    .catch(error => console.error('Erro:', error));
});

// Deletar anime
function deleteMedias(id) {
    fetch(`http://localhost:3000/api/anime/${id}`, { method: 'DELETE' })
    .then(() => loadMedias())
    .catch(error => console.error('Erro:', error));
}

// Editar anime
function editMedias(id, titulo, ano_lancamento, genero) {
    const tituloNovo = prompt('Novo titulo:', titulo);
    const anoNovo = prompt('Novo ano:', ano_lancamento);
    const generoNovo = prompt('Novo genero:', genero);

    fetch(`http://localhost:3000/api/anime/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: tituloNovo, ano_lancamento: anoNovo, genero: generoNovo })
    })
    .then(() => loadMedias())
    .catch(error => console.error('Erro:', error));
}
loadMedias();

//=======================================================

// Função para exibir a lista de quem assistiu, o que e quando
function loadViews(){
    fetch('http://localhost:3000/api/assiste')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('assiste-list');
        list.innerHTML = '';
        data.forEach(viu => {
            list.innerHTML += `
            <div>
                <p>${viu.nome} - ${viu.titulo} - ${viu.data_assistiu}</p>
            </div>`; 
        });
    })
    .catch(error => console.error('Erro :', error));
}
loadViews();