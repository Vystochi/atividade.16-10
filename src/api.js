// Define a URL base da API
const BASE_URL = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

// Função para buscar todos os itens da lista
export async function getItems() {
  const res = await fetch(BASE_URL); // faz requisição GET na API
  return await res.json(); // converte a resposta para JSON e retorna
}

// Função para criar um novo item
export async function createItem(item) {
  const res = await fetch(BASE_URL, {
    method: 'POST', // método POST para criar
    headers: { 'Content-Type': 'application/json' }, // informa que envia JSON
    body: JSON.stringify(item), // transforma o objeto em JSON
  });
  return await res.json(); // retorna o item criado (com ID gerado)
}

// Função para atualizar um item existente
export async function updateItem(id, item) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT', // método PUT para atualizar
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item), // envia dados atualizados
  });
  return await res.json(); // retorna o item atualizado
}

// Função para deletar um item
export async function deleteItem(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }); // apenas deleta, não retorna dados
}
