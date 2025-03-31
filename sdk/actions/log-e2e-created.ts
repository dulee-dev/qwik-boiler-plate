import chalk from 'chalk';

export const logE2ECreated = (
  count: number,
  {
    testPath,
    helperPath,
  }: {
    testPath: string;
    helperPath: string | undefined;
  },
  path: string
) => {
  console.log('');
  console.log('\t', chalk.yellow(`✨ create ${count} file(s):`), '\t', path);
  console.log('');
  console.log('\t', chalk.green(`🧩 component:`), '\t', '\t', testPath);
  if (helperPath)
    console.log('\t', chalk.green(`🎨 styles:`), '\t', '\t', helperPath);
  console.log('');
};
