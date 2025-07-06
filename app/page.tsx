'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AmountSelection from "./selection-ui/AmountSelection";
import StakingProvider from "./selection-ui/StakingProvider";
import StakingTable from './selection-ui/StakingTable';
import WalletConnection from './WalletConnection';
import ChatInterface from './ChatInterface.tsx';
import StrategyBlueprint from './comp/blueprint';
import MarketAnalysis from './comp/market-analysis';
import LendingComponent from './comp/lending';


export default function Home() {
  const [start, setStart] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const [blueprint, setBlueprint] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState(false);

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
        <motion.h1
          className="text-2xl md:text-[40px] font-semibold leading-normal text-gray-500 md:text-gray-400"
          color="grey"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Yield GPT
          </motion.span>
          {!start && (
            <motion.span
              className="ml-2 text-xs md:text-lg font-mono font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                transition: { duration: 0.2 }
              }}
              style={{
                textShadow: '0 0 8px rgba(34, 197, 94, 0.4)',
                filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.3))',
                letterSpacing: '0.1em'
              }}
            >
              &lt;MANTLE_EDITION/&gt;
              <motion.div
                className="absolute rounded-full top-[15rem] right-[0rem] w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTyFdgUgvLFmPtw55cNSdOzpMPlIyRNu-8xg&s" alt="Mantle" />
              </motion.div>
              <motion.div
                className="absolute top-[12rem] right-[6rem] bg-white rounded-lg shadow-lg p-3 max-w-xs"
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 85%, 85% 100%, 70% 85%, 0% 85%)'
                }}
              >
                <p className="text-sm text-gray-700 font-mono">
                  Ready to yield? 🚀
                </p>
              </motion.div>
            </motion.span>
          )}
        </motion.h1>
        <p className='leading-normal text-gray-500 md:text-gray-400 mb-5'>The best way to degen your assets in the entire Mantleverse</p>
      </div>

      <ChatInterface setStart={setStart} />
      {start && (
        <div className="p-4 pb-[200px] pt-2 mx-[22rem] flex flex-col space-y-4 ">
          <MarketAnalysis setMarketAnalysis={setMarketAnalysis} />
          {marketAnalysis && (
            <StrategyBlueprint setBlueprint={setBlueprint} />
          )}

          {blueprint &&
            <AnimatePresence>
              <motion.div
                key="asset-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LendingComponent />
              </motion.div>
            </AnimatePresence>
          }

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
        </div>
      )}
    </div>
  )
}
