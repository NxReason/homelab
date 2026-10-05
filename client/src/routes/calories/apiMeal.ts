import type { IMeal } from './IMeal';

const URL = '/api/meals/';

export async function saveMeal(meal: IMeal): APIResponse {
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(meal),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`Something went wrong: ${res}`);
    return "Can't save new meal";
  }
}

type APISuccess = IMeal | [IMeal];
type APIError = string | Error;
type APIResponse = Promise<APISuccess | APIError>;
