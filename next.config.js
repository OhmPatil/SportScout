/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'ap-south-1.graphassets.com'
            }
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
