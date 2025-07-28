/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (isServer) {
            config.externals.push({
                canvas: 'commonjs canvas',
            });
        }
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "spicedirectwholesale.s3.eu-west-2.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
