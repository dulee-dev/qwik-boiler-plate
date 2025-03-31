import { dash } from 'radashi';
import { assertAllFilesExist } from '../tasks/assert-all-files-exist';
import { forceHandleWriteFile } from '../tasks/force-handle-write-files';
import { logE2ECreated } from '../actions/log-e2e-created';

/**
 * 복사할 파일을 sourcePath에서 targetPath로 복사합니다.
 * 기존 파일은 유지되며, target 디렉터리가 없으면 생성됩니다.
 *
 * @param resourceName 복사할 원본 파일의 절대경로 또는 상대경로
 * @param targetPath 복사될 대상 파일의 절대경로 또는 상대경로
 */
export const createE2eTest = async (
  dirName: string,
  fileName: string,
  withHelper: boolean
): Promise<void> => {
  const dirPath = `__tests__/e2e/${dash(dirName)}`;
  const testPath = dirPath + `/${dash(fileName)}.e2e-spec.ts`;
  const helperPath = withHelper
    ? dirPath + `/${dash(fileName)}.helper.ts`
    : undefined;

  const existOnly = [testPath, helperPath].filter(
    (c) => c !== undefined
  ) as string[];

  await assertAllFilesExist(existOnly);

  await forceHandleWriteFile(testPath, 'e2e/name.e2e-spec.ts', [
    {
      from: '__name__',
      to: dash(fileName),
    },
  ]);
  if (helperPath)
    await forceHandleWriteFile(helperPath, 'e2e/name.helper.ts', []);

  logE2ECreated(existOnly.length, { testPath, helperPath }, dirPath);
};
