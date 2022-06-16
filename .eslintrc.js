module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base'
  ],
  rules: {
    'no-console': 0, // 禁用打印
    'comma-dangle': [ 2, 'never' ], // 禁止使用拖尾逗号
    'no-extra-semi': 2, // 禁止不必要的分号
    'array-bracket-spacing': [ 2, 'always' ], // 指定数组的元素之间要以空格隔开
    'jsx-quotes': 0, // 强制使用单引号
    'max-len': 0, // 强制一行的最大长度
    semi: [ 2, 'never' ], // 禁止使用分号
    'linebreak-style': [ 0, 'error', 'windows' ],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-absolute-path': 0,
    'import/no-extraneous-dependencies': 0,
    'class-methods-use-this': 0,
    'no-mixed-operators': 0,
    'eol-last': 0,
    'import/newline-after-import': 0,
    'vue/multi-word-component-names': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
    'guard-for-in': 0,
    'func-names': 0,
    'import/order': 0,
    'vue/no-deprecated-slot-attribute': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/no-deprecated-filter': 0,
    'vue/require-explicit-emits': 0,
    'vue/no-v-html': 0,
    'vue/order-in-components': 0,
    'no-unused-vars': 1,
    'vue/no-reserved-component-names': 0
  }
}
