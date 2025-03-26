import { forceWriteFile } from '../actions/force-write-file';
import { readFile } from '../actions/read-file';
import { calcResourcePath } from '../libs/calc-resource-path';

export const forceHandleWriteFile = async (
  targetPath: string,
  srcPath: string,
  replaces: {
    from: string;
    to: string;
  }[]
) => {
  const tsxSrc = calcResourcePath(srcPath);

  let content = await readFile(tsxSrc);

  replaces.map((set) => {
    content = content.replaceAll(set.from, set.to);
  });

  await forceWriteFile(targetPath, content);
};
