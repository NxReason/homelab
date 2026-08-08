import type { PageLoad } from './$types';

async function loadCats(fetch: any) {
  const res = await fetch('http://server:3000/cats');
  if (res.ok) {
    return await res.json();
  }
  return [];
}

export const load: PageLoad = async ({ params, fetch }) => {
  return {
    cats: await loadCats(fetch),
  };
};
