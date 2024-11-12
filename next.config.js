/** @type {import('next').NextConfig} */

// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');

const nextConfig = {
    // distDir: 'dist',
    // swcMinify: true,
    transpilePackages: ['lucide-react'],
    webpack: (config) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                process: 'process/browser',
            })
        );
        return config;
    },
    experimental: {
        // forceSwcTransforms: true,
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
