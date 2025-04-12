/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',           // The protocol of the image URL
            hostname: 'exam.elevateegy.com',  // The domain of the image
            pathname: '/uploads/categories/**',  // The specific folder pattern
          },
        ],
      },
  };
  
  export default nextConfig;
  