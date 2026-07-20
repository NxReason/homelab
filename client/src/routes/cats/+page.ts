import type { PageLoad } from './$types';

async function loadCats() {
  const res = await fetch('http://server:3000/cats');
  if (res.ok) {
    return await res.json();
  }
  return [];
}

export const load: PageLoad = async ({ params }) => {
  return {
    cats: await loadCats(),
  };
};
