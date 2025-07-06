'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AssetSelection from "./selection-ui/AssetSelection";
import AmountSelection from "./selection-ui/AmountSelection";
import StakingProvider from "./selection-ui/StakingProvider";
import StakingTable from './selection-ui/StakingTable';
import dynamic from 'next/dynamic';
import WalletConnection from './WalletConnection';
import ChatInterface from './ChatInterface.tsx';
// import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'; // Add this import

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);


export default function Home() {
  const [start, setStart] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  // const { publicKey: account, sendTransaction } = useWallet();

  // Create a ref to hold the last rendered component
  const lastComponentRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the last rendered component when it changes
  useEffect(() => {
    if (lastComponentRef.current) {
      lastComponentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedAsset, selectedAmount, selectedProvider]);

  return (
    <div className='bg-gray-50 w-full h-screen overflow-x-hidden'>
      <div className='absolute right-4 top-4'>
        <WalletConnection />
      </div>

      <div className='flex flex-col w-full pt-12 mx-[23rem]'>
        <h1 className="text-2xl md:text-[40px] font-semibold leading-normal text-gray-500 md:text-gray-400" color="grey">
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Yield GPT</span>
        </h1>
        <p className='leading-normal text-gray-500 md:text-gray-400 mb-5'>The best way to stake in the entire Solanaverse</p>
      </div>

      <ChatInterface setStart={setStart} />

      {start && (
        <div className="p-4 pb-[200px] pt-2 mx-[22rem] flex flex-col space-y-4 ">
          <AnimatePresence>
            <motion.div
              key="asset-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AssetSelection onSelectAsset={setSelectedAsset} />
            </motion.div>

            {selectedAsset && (
              <motion.div
                key="amount-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={lastComponentRef}
              >
                <AmountSelection onSelectAmount={setSelectedAmount} />
              </motion.div>
            )}

            {selectedAmount && (
              <motion.div
                key="staking-provider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={lastComponentRef}
              >
                <StakingProvider onSelectProvider={setSelectedProvider} />
              </motion.div>
            )}

            {selectedProvider && (
              <motion.div
                key="staking-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={lastComponentRef}
              >
                <StakingTable />
              </motion.div>
            )}
          </AnimatePresence>

          {/* <div>
       <p>Selected Asset: {selectedAsset}</p>
       <p>Selected Amount: {selectedAmount}</p>
       <p>Selected Provider: {selectedProvider}</p>
     </div> */}
        </div>
      )}
    </div>
  );
}
