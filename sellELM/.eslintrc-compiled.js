// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // standard 表示继承标准的规则，上面的地址表示定义的具体标准规则
    extends: 'standard',
    // required to lint *.vue files
    plugins: ['html'],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions，为0表示忽略规则检查
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': 0,
        'comma-spacing': 0,
        'space-infix-ops': 0,
        'space-in-parens': 0,
        'space-before-function-paren': 0
    }
};

//# sourceMappingURL=.eslintrc-compiled.js.map