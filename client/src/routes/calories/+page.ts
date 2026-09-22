import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { IFood } from './IFood';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/food');

  if (!res.ok) error(404, 'Failed to load food');

  const food: IFood[] = await res.json();

  return {
    food,
  };
};
