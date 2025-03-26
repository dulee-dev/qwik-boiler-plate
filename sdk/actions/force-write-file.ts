import { promises as fs } from 'fs';
import path from 'path';

/**
 * 주어진 문자열을 지정한 파일 경로에 씁니다.
 * 경로 중간에 필요한 디렉터리가 없다면 자동으로 생성합니다.
 *
 * @param targetPath 파일이 생성될 전체 경로 (예: ./output/abc/result.txt)
 * @param content 파일에 쓸 문자열
 */
export const forceWriteFile = async (
  targetPath: string,
  content: string
): Promise<void> => {
  const dir = path.dirname(targetPath);

  // 디렉터리가 없다면 생성 (재귀적으로)
  await fs.mkdir(dir, { recursive: true });

  // 파일에 쓰기 (덮어쓰기)
  await fs.writeFile(targetPath, content, 'utf-8');
};
