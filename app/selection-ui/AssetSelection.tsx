'use client'

import { FC, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Bot } from "lucide-react";

interface AssetSelectionProps {
  onSelectAsset: (assetName: string) => void;
}

interface AssetSelectionType {
  name: string;
  logo: string;
  apy: string;
}

const ASSETS = [
  {
    name: "Solana (SOL)",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
    apy: "3%",
  },
  {
    name: "USDC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s",
    apy: "12%",
  },
  {
    name: "USDT",
    logo: "https://static-00.iconduck.com/assets.00/tether-cryptocurrency-icon-2048x2048-dp13oydi.png",
    apy: "14%",
  },
];

const AssetSelection: FC<AssetSelectionProps> = ({ onSelectAsset }) => {

  const [assetSelected, setAssetSelected] = useState("");

  const handleAssetSelect = (assetName: string) => {
    setAssetSelected(assetName);
    onSelectAsset(assetName);
  };

  return (
    <>
      <div className='flex flex-row space-x-2 items-center bg-neutral-100 p-2 w-full rounded-xl border border-neutral-200 shadow-sm mb-2'>
        <Bot />
        <p>What asset do you want to stake?</p>
      </div>
      <div className="flex flex-col w-full border border-neutral-200 p-4 space-y-2 bg-white rounded-xl shadow-sm rounded-xl shadow-sm ">

        <div className="flex flex-col">
          <p className="text-sm font-medium text-neutral-800">Asset Selection</p>
          <p className="text-xs font-medium text-neutral-400">
            Select a starting asset. This will be the starting asset used in the strategy.
          </p>
        </div>
        <div className="flex flex-row space-x-4">
          {ASSETS.map((asset: AssetSelectionType) => (
            <SelectionCard
              assetSelected={assetSelected}
              key={asset.name}
              asset={asset}
              onClick={() => { if (asset.name === "Solana (SOL)") handleAssetSelect(asset.name) }}
            />
          ))}
        </div>
      </div>
    </>

  );
};

export const AssetSelectionDrop: FC<AssetSelectionProps> = ({ }) => {
  return (
    <div className="flex flex-col w-full border border-neutral-200 p-4 space-y-2">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-neutral-800">Asset Selection</p>
        <p className="text-xs font-medium text-neutral-400">
          Select a starting asset. This will be the starting asset used in the strategy.
        </p>
      </div>
      <Select>
        <SelectTrigger className="h-fit">
          <SelectValue placeholder="Select asset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SOL">
            <div className="flex flex-row space-x-2 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                className="w-6 h-6"
                width={24}
                height={24}
                alt=""
              />
              <p className="text-sm font-semibold">SOL</p>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssetSelection;

const SelectionCard = ({
  asset,
  assetSelected,
  onClick,
}: {
  asset: AssetSelectionType;
  assetSelected: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`relative cursor-pointer hover:bg-gray-50 w-40 h-32 p-4 space-y-2 rounded-lg border border-gray-200 flex flex-col
    ${assetSelected === asset.name ? "bg-gray-50" : "bg-white"}`}
  >
    <div className="flex flex-row justify-between items-center">
      <div className="w-10 h-10 bg-white rounded shadow justify-center items-center inline-flex">
        <img width={28} height={28} className="w-7 h-7" src={asset.logo} alt={asset.name} />
      </div>
    </div>
    <div className="justify-start items-center inline-flex">
      <p className="text-zinc-950 text-base font-medium">{asset.name}</p>
    </div>
    {/* <div className="flex flex-row items-center space-x-2">
      <p className="text-slate-500 text-xs">Best APY: {asset.apy}</p>
    </div> */}
    {asset.name !== "Solana (SOL)" && (
      <div className="absolute inset-0 bg-white opacity-95 rounded-lg flex items-center justify-center">
        <p className="text-neutral-500 font-semibold">Coming Soon</p>
      </div>
    )}
  </div>
);
