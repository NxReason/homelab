import type { IFood } from './IFood';

const URL = '/api/food/';

export async function saveFood(food: IFood): APIResponse {
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(food),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`Something went wrong: ${res}`);
    return "Can't save new food";
  }
}

export async function updateFood(food: IFood): APIResponse {
  const res = await fetch(URL + food.id, {
    method: 'PUT',
    body: JSON.stringify(food),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.log(`Something went wrong: ${res}`);
    return `Can't update food ${food}`;
  }
}

export async function deleteFood(foodId: number): APIResponse {
  const res = await fetch(URL + foodId, { method: 'DELETE' });
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`Something went wrong: ${res}`);
    return `Can't delete food with id ${foodId}`;
  }
}

type APISuccess = IFood | [IFood];
type APIError = string | Error;
type APIResponse = Promise<APISuccess | APIError>;
