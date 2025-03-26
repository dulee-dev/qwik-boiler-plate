import { checkIfFileExists } from '../actions/check-if-file-exists';

export const assertAllFilesExist = async (paths: string[]) => {
  await Promise.all(
    paths.map(async (target) => {
      const exist = await checkIfFileExists(target);
      if (exist) throw new Error(`file: ${target} already exist`);
    })
  );
};
