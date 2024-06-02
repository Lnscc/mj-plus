/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.discordapp.net',
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.midjourney.com',
        },
        {
          protocol: 'https',
          hostname: 'mj-plus-bucket.s3.eu-north-1.amazonaws.com',
        },
      ],
    },
};

export default nextConfig;
