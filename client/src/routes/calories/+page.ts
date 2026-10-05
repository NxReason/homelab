import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { IFood } from './IFood';

export const load: PageLoad = async ({ fetch }) => {
  const foodRes = fetch('/api/food');
  const mealRes = fetch('/api/meals');
  const responses = await Promise.all([foodRes, mealRes]);

  if (responses.some(res => !res.ok)) error(404, 'Failed to load data');

  return {
    food: await responses[0].json(),
    meals: await responses[1].json(),
  };
};
