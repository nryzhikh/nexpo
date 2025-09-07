//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  typescript: { ignoreBuildErrors: true }, // move type checking out of Next and into Nx/tsc
  nx: {
    svgr: false // turn off Nx’s deprecated SVGR hook
  },
  transpilePackages: ['nativewind', 'react-native-css-interop'],
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
