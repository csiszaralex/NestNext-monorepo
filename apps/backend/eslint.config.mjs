import nestConfig from '@repo/eslint-config/nest.js';

export default [
  ...nestConfig(import.meta.dirname),
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['*.ts', '**/*.ts'],
      },
    },
  },
];
