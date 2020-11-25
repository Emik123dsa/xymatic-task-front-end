module.exports = {
  ident: 'postcss',
  syntax: 'postcss-scss',
  map: false,
  plugins: {
    'postcss-nested': {},

    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      //   browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009',
    },
  },
};
