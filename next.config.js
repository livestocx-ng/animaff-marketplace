/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // forceSwcTransforms: true,
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ["animaff-media.s3.amazonaws.com", "animaff-test-media.s3.amazonaws.com", "youtube.com"]
    },
}

module.exports = nextConfig
