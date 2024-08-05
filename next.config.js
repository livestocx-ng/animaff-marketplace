/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir: 'dist',
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ["animaff-media.s3.amazonaws.com", "animaff-test-media.s3.amazonaws.com", "youtube.com"]
    }
}

module.exports = nextConfig
