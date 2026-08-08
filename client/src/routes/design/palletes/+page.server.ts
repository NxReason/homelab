import type { Actions } from './$types';

export const actions = {
  save: async event => {
    console.log('save action handler');
  },

  update: async event => {
    console.log('update action handler');
  },
} satisfies Actions;
