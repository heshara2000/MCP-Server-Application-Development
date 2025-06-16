// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the webpack configuration for Next.js.
  // We are telling Next.js's server-side bundle to treat 'pdf-parse' as an external module.
  // This prevents Webpack from trying to bundle its internal test files, which causes the ENOENT error.
  webpack: (config, { isServer }) => {
    // This configuration only applies to the server-side bundle.
    if (isServer) {
      // Ensure config.externals is an array (it often is in Next.js's internal config).
      // We use the spread operator to include any existing externals that Next.js might have.
      // Then, we add our specific external for 'pdf-parse'.
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []), // Include existing externals
        {
          'pdf-parse': 'commonjs pdf-parse', // Explicitly declare pdf-parse as a commonjs external
        },
      ].filter(Boolean); // Filter out any falsey values if externals was initially null/undefined
    }
    // Always return the modified config.
    return config;
  },
};

// This is the standard way to export the Next.js configuration.
export default nextConfig;