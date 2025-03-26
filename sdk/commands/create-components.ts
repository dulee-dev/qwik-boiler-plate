import inquirer from 'inquirer';
import {
  componentType,
  createComponents,
} from '../processes/create-components';

/**
 * 복사할 파일을 sourcePath에서 targetPath로 복사합니다.
 * 기존 파일은 유지되며, target 디렉터리가 없으면 생성됩니다.
 *
 * @param sourcePath 복사할 원본 파일의 절대경로 또는 상대경로
 * @param targetPath 복사될 대상 파일의 절대경로 또는 상대경로
 */
const run = async (): Promise<void> => {
  const { type, files, name } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Pick one option:',
      choices: componentType,
    },
    {
      type: 'checkbox',
      name: 'files',
      message: 'Choose your options:',
      choices: [
        { name: 'component', value: 'component', checked: true },
        { name: 'styles', value: 'styles', checked: true },
        { name: 'stories', value: 'stories', checked: true },
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter component name (kebab-case):',
      required: true,
    },
  ]);

  await createComponents(type, files, name);
};

run();
