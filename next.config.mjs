/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          pathname: "/images/rlur3igs/production/**", 
        },
      ],
    },
  };
  
  export default nextConfig;
  