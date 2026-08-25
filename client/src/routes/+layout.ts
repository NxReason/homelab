import type { LayoutLoad } from './$types';
import { MenuItem } from './MenuItem';

export const load: LayoutLoad = async ({ url }) => {
  const { pathname } = url;
  return {
    pages: [
      new MenuItem('/', 'Home', pathname),
      new MenuItem('/design', 'Design', isActiveGroup('/design', pathname), [
        new MenuItem('/design/palletes', 'Palletes', pathname),
        new MenuItem('/design/library', 'Library', pathname),
      ]),
      new MenuItem('/pomodoro', 'Pomodoro', pathname),
    ],
  };
};

function isActiveGroup(itemPath: string, urlPath: string): boolean {
  return urlPath.startsWith(itemPath);
}
