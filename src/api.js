const BASE_URL = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

export async function readItems() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createItem(item) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return await res.json();
}

export async function updateItem(id, item) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return await res.json();
}

export async function deleteItem(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
