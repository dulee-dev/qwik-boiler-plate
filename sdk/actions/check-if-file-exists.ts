import { promises as fs } from 'fs';

export const checkIfFileExists = async (
  targetPath: string
): Promise<boolean> => {
  try {
    await fs.access(targetPath);
    return true;
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
    return false;
  }
};
