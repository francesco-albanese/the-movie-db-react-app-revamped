/**
 * Enforce BEM pattern.
 */
const kebabCaseMatcher = '([a-z][a-z0-9]*)(-[a-z0-9]+)*'
const bemSelector = `^(${kebabCaseMatcher})(__${kebabCaseMatcher}){0,1}(--${kebabCaseMatcher}){0,2}$`
const pseudoClassSelector = '^&:[\w-]+$'
const pseudoElementSelector = '^&::[\w-]+$'

/**
 * Custom error messages.
 */
const messages = {
  selector: 'Selector must follow the \'block__element--modifier--value\' pattern',
  autoprefix: 'Vendor prefixes are forbidden. Use Autoprefix instead',
  nesting: 'Too much nesting. Use @extend or @import instead',
  quotes: 'Missing or wrong quotes, use "'
}

module.exports = {
  'extends': [ 'stylelint-config-standard', 'stylelint-config-recommended-scss' ],
  'plugins': [
    'stylelint-order'
  ],
  'rules': {
    'selector-class-pattern': [
      bemSelector,
      {
        resolveNestedSelectors: true,
        message: messages.selector
      }
    ],
    'at-rule-no-vendor-prefix': [ true, { message: messages.autoprefix }],
    'media-feature-name-no-vendor-prefix': [ true, { message: messages.autoprefix }],
    'property-no-vendor-prefix': [ true, { message: messages.autoprefix }],
    'selector-no-vendor-prefix': [ true, { message: messages.autoprefix }],
    'value-no-vendor-prefix': [ true, { message: messages.autoprefix }],
    'max-nesting-depth': [ 4, { message: messages.nesting }],
    'selector-max-compound-selectors': [ 4, { message: messages.nesting }],
    'font-family-no-missing-generic-family-keyword': null,
    'function-url-quotes': [ 'always', { message: messages.quotes }],
    'string-quotes': [ 'double', { message: messages.quotes }],
    'order/order': [
      [
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend'
        },
        {
          type: 'at-rule',
          name: 'include'
        },
        'declarations',
        {
          type: 'rule',
          selector: new RegExp(pseudoClassSelector)
        },
        {
          type: 'rule',
          selector: new RegExp(pseudoElementSelector)
        },
        {
          type: 'at-rule',
          name: 'media'
        },
        'rules'
      ],
      {
        unspecified: 'bottom'
      }
    ]
  }
}
