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
        document.getElementById('character-form').requestFullscreen();
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
