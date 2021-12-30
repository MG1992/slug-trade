module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-cssnext": {
      autoprefixer: true,
      warnForDuplicates: false,
    },
    "postcss-px2rem-dpr": {
      baseDpr: 2, // base device pixel ratio (default: 2)
      remUnit: 37.5, // rem unit value (default: 75)
      remPrecision: 6, // rem value precision (default: 6)
      forcePxComment: "px", // force px comment (default: `px`)
      keepComment: "yes", // no transform value comment (default: `no`)
      shouldUseDprRule(declaration, rule) {
        //  const list = [/font/];
        //  return list.some(item => item.test(declaration.property));
      },
      shouldIgnoreRule(rule) {},
    },
    cssnano: {
      preset: "advanced",
      "postcss-zindex": false,
    }
  }
};
