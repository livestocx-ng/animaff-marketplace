/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir: 'dist',
    transpilePackages: ['lucide-react'],
    webpack: (config) => {
        config.optimization.minimize = true;
        config.optimization.minimizer.push(
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            })
        );
        return config;
    },
    experimental: {
        forceSwcTransforms: true,
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ["animaff-media.s3.amazonaws.com", "animaff-test-media.s3.amazonaws.com", "youtube.com"]
    },
    // Ensure we're not accidentally enabling Next.js 14+ features
    // typescript: {
    //     ignoreBuildErrors: false
    // },
}

module.exports = nextConfig
