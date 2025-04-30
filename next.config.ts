import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "iamge.mux.com",
      }
    ]
  }  
};

export default nextConfig;
