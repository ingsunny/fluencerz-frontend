/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['api.fluencerz.com'],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'api.fluencerz.com',
          port: '',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  