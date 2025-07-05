import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "",
      "images.unsplash.com",
      "localhost",
      "via.placeholder.com",
      "res.cloudinary.com",
      "assets.pokemon.com",
      "upload.wikimedia.org",
      "www.protocol.com",
      "media.licdn.com",
      "developers.elementor.com",
      "community.softr.io",
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY,
    NEXT_PUBLIC_SOLANA_RPC: process.env.NEXT_PUBLIC_SOLANA_RPC,
    BIRDEYE_API: process.env.BIRDEYE_API,
    SHYFT_API: process.env.SHYFT_API,
    HELIUS_API: process.env.HELIUS_API,
  },
};

export default nextConfig;
