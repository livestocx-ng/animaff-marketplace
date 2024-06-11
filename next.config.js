/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir: 'dist',
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },
    images: {
        domains: ["livestocx-media.s3.amazonaws.com", "livestocx-test-media.s3.amazonaws.com", "youtube.com"]
    }
}

module.exports = nextConfig
