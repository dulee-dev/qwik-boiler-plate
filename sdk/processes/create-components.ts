import { dash, last } from 'radashi';
import { assertAllFilesExist } from '../tasks/assert-all-files-exist';
import { forceHandleWriteFile } from '../tasks/force-handle-write-files';
import { calcCapitalCamelCase } from '../libs/calc-capital-camel-case';
import { logComponentCreated } from '../actions/log-component-created';

export const componentType = ['atom', 'molecule', 'organism', 'template'];

/**
 * 복사할 파일을 sourcePath에서 targetPath로 복사합니다.
 * 기존 파일은 유지되며, target 디렉터리가 없으면 생성됩니다.
 *
 * @param resourceName 복사할 원본 파일의 절대경로 또는 상대경로
 * @param targetPath 복사될 대상 파일의 절대경로 또는 상대경로
 */
export const createComponents = async (
  type: string,
  files: string[],
  componentName: string
): Promise<void> => {
  const isComponentType = componentType.includes(type);
  if (!isComponentType)
    throw new Error(
      `type: ${type} is not component type (one of [${componentType.join(', ')}])`
    );

  const dashed = dash(componentName);
  const dir = `src/components/ui/${type}s/${dashed}`;

  const tsxPath = files.includes('component') ? `${dir}/index.tsx` : undefined;
  const stylePath = files.includes('styles')
    ? `${dir}/styles.css.ts`
    : undefined;
  const storyPath = files.includes('stories')
    ? `${dir}/index.stories.tsx`
    : undefined;

  const existOnly = [tsxPath, stylePath, storyPath].filter(
    (c) => c !== undefined
  ) as string[];

  await assertAllFilesExist(existOnly);

  const name = last(componentName.split('/')) as string;
  if (tsxPath)
    await forceHandleWriteFile(tsxPath, 'components/index.tsx', [
      {
        from: '__Name__',
        to: calcCapitalCamelCase(name),
      },
    ]);
  if (stylePath)
    await forceHandleWriteFile(stylePath, 'components/styles.css.ts', []);
  if (storyPath)
    await forceHandleWriteFile(storyPath, 'components/index.stories.tsx', [
      {
        from: '__Name__',
        to: calcCapitalCamelCase(name),
      },
    ]);

  logComponentCreated(files.length, { tsxPath, stylePath, storyPath }, dir);
};
