import { promises as fs } from 'fs';

/**
 * 파일을 읽고 문자열로 반환하는 함수
 * @param filePath 읽고 싶은 파일 경로
 */
export const readFile = async (filePath: string): Promise<string> => {
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
};
