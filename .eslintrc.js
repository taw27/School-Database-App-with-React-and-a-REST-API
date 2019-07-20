module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
