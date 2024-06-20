module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    // 'node',
    '@typescript-eslint',
    'react',
  ],
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-var-requires': ['off', { 'allow': ['.'] }],
  }
};
