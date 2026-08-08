import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { IPallete } from '../IPallete';

export const load: PageLoad = async ({ params, fetch }) => {
  const { id } = params;
  const res = await fetch(`/api/palletes/${id}`);
  if (!res.ok) {
    error(404, `Can't find Color Pallete with id ${id}`);
  }
  return {
    pallete: (await res.json()) as IPallete,
  };
};
