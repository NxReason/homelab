import type { IPallete } from './IPallete';

const URL = '/api/palletes/';

export async function savePallete(pallete: IPallete): APIResponse {
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(pallete),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`Something went wrong: ${res}`);
    return "Can't save new pallete";
  }
}

export async function updatePallete(pallete: IPallete): APIResponse {
  const res = await fetch(URL + pallete.id, {
    method: 'PUT',
    body: JSON.stringify(pallete),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.log(`Something went wrong: ${res}`);
    return `Can't update pallete ${pallete}`;
  }
}

export async function deletePallete(palleteId: number): APIResponse {
  const res = await fetch(URL + palleteId, { method: 'DELETE' });
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`Something went wrong: ${res}`);
    return `Can't delete pallete with id ${palleteId}`;
  }
}

type APISuccess = IPallete | [IPallete];
type APIError = string | Error;
type APIResponse = Promise<APISuccess | APIError>;
