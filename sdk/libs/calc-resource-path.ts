import { fileURLToPath } from 'url';
import { PathBuilder } from './path-builder';

export const calcResourcePath = (resourcePath: string) => {
  const path = new PathBuilder(fileURLToPath(import.meta.url))
    .up()
    .up()
    .append('resources')
    .append(resourcePath)
    .toString();
  return path;
};
