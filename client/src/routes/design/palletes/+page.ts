import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { IPallete } from './IPallete';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/palletes');
  if (!res.ok) {
    error(404, 'Palletes not found');
  }

  return {
    title: 'Palletes library',
    palletes: (await res.json()) as IPallete[],
  };
};
