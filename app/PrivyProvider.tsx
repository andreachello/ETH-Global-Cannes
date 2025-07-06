"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.PRIVY_APP_ID || ""}
      clientId={process.env.PRIVY_CLIENT_ID || ""}
      config={{
        // Use injected providers instead of embedded wallets
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets", // Only create for users without wallets
          },
        },
        // Configure supported networks
        supportedChains: [
          {
            id: 11155111, // Sepolia chain ID
            name: "Sepolia",
            rpcUrls: {
              default: {
                http: ["https://sepolia.infura.io/v3/your-infura-project-id"], // Replace with your RPC URL
              },
            },
            blockExplorers: {
              default: {
                name: "Sepolia Etherscan",
                url: "https://sepolia.etherscan.io",
              },
            },
            nativeCurrency: {
              name: "Sepolia Ether",
              symbol: "SEP",
              decimals: 18,
            },
          },
          {
            id: 1, // Ethereum mainnet
            name: "Ethereum",
            rpcUrls: {
              default: {
                http: ["https://mainnet.infura.io/v3/your-infura-project-id"], // Replace with your RPC URL
              },
            },
            blockExplorers: {
              default: {
                name: "Etherscan",
                url: "https://etherscan.io",
              },
            },
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
        // Set default chain to Sepolia
        defaultChain: {
          id: 11155111,
          name: "Sepolia",
          rpcUrls: {
            default: {
              http: ["https://sepolia.infura.io/v3/your-infura-project-id"],
            },
          },
          blockExplorers: {
            default: {
              name: "Sepolia Etherscan",
              url: "https://sepolia.etherscan.io",
            },
          },
          nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "SEP",
            decimals: 18,
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
