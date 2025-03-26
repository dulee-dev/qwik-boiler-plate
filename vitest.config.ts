import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        include: ['{src,__tests__}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        exclude: ['__tests__/**/*\\.e2e-spec\\.ts'],
        coverage: {
          provider: 'v8',
          exclude: ['__tests__/**/*\\.e2e-spec\\.ts'],
        },
      },
    })
  )
);
