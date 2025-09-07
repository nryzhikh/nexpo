import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['src/lib/tokens.json'],
  platforms: {
    web: {
      transformGroup: 'css',
      buildPath: 'dist/web/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.ts', format: 'javascript/es6' }],
    },
  },
});

await sd.hasInitialized;
await sd.buildAllPlatforms();