import inquirer from 'inquirer';
import { createE2eTest } from '../processes/create-e2e-test';

/**
 * 복사할 파일을 sourcePath에서 targetPath로 복사합니다.
 * 기존 파일은 유지되며, target 디렉터리가 없으면 생성됩니다.
 *
 * @param sourcePath 복사할 원본 파일의 절대경로 또는 상대경로
 * @param targetPath 복사될 대상 파일의 절대경로 또는 상대경로
 */
const run = async (): Promise<void> => {
  const { dirName, fileName, withHelper } = await inquirer.prompt([
    {
      type: 'input',
      name: 'dirName',
      message: 'Enter component dir-name (kebab-case):',
      required: true,
    },
    {
      type: 'input',
      name: 'fileName',
      message: 'Enter component file-name (kebab-case):',
      required: true,
      default: 'main',
    },
    {
      type: 'confirm',
      name: 'withHelper',
      message: 'with helper?:',
      default: true,
    },
  ]);

  await createE2eTest(dirName, fileName, withHelper);
};

run();
