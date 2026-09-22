import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { IPallete } from './IPallete';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/palletes');
  if (!res.ok) {
    error(404, 'Palletes not found');
  }

  let palletes: IPallete[] = await res.json();
  palletes.map(p => {
    p.createdAt = p.createdAt ? new Date(p.createdAt) : new Date();
  });

  return {
    title: 'Palletes library',
    palletes: palletes,
  };
};
