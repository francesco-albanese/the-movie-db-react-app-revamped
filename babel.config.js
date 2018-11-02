module.exports = {
  'presets': [[ '@babel/preset-env', { 'modules': false }], 'react-app' ],
  'env': {
    'production': {
      'plugins': [
        [ 'transform-react-remove-prop-types' ]
      ]
    },
    'test': {
      'presets': [[ '@babel/preset-env', { 'modules': 'commonjs' }], 'react-app' ],
      'plugins': [ 'transform-es2015-modules-commonjs' ]
    }
  }
}
