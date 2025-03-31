import chalk from 'chalk';

export const logComponentCreated = (
  count: number,
  {
    tsxPath,
    storyPath,
    stylePath,
  }: {
    tsxPath: string | undefined;
    storyPath: string | undefined;
    stylePath: string | undefined;
  },
  path: string
) => {
  console.log('');
  console.log('\t', chalk.yellow(`✨ create ${count} file(s):`), '\t', path);
  console.log('');
  if (tsxPath)
    console.log('\t', chalk.green(`🧩 component:`), '\t', '\t', tsxPath);
  if (stylePath)
    console.log('\t', chalk.green(`🎨 styles:`), '\t', '\t', stylePath);
  if (storyPath)
    console.log('\t', chalk.green(`📖 storybook:`), '\t', '\t', storyPath);

  console.log('');
};
