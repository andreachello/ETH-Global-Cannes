'use client'

import { useChat } from "ai/react";
import { Bot } from "lucide-react";
import { FC, useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/app/components/ui/select"

interface AssetSelectionProps {
  onSelectAsset?: (assetName: string) => void;
}

interface AssetSelectionType {
  name: string;
  logo: string;
  apy: string;
}

const ASSETS = [
  {
    name: "USDC",
    logo: "https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png",
    apy: "12%",
  },
];


const AssetSelection: FC<any> = ({
}: any) => {

  const [assetSelected, setAssetSelected] = useState("");

  return (
    <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-600 p-4 space-y-2 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Asset Selection</p>
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-400">
          Select a starting asset. This will be the starting asset used in the strategy.
        </p>
      </div>
      <div className="flex flex-row space-x-4">

        {ASSETS?.map((asset: AssetSelectionType) => (
          <SelectionCard
            assetSelected={assetSelected}
            key={asset.name}
            asset={asset}

          />
        ))}
      </div>
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
    className={`relative cursor-pointer mt-4 hover:bg-gray-50 dark:hover:bg-gray-700 w-40 h-32 p-4 space-y-2 rounded-lg border border-gray-200 dark:border-gray-600 flex flex-col
    bg-gray-50 dark:bg-gray-700`}
  >
    <div className="flex flex-row justify-between items-center">
      <div className="size-10 rounded shadow justify-center items-center inline-flex">
        <img width={28} height={28} className="size-7" src={asset.logo} alt={asset.name} />
      </div>
    </div>
    <div className="justify-start items-center inline-flex">
      <p className="text-zinc-950 dark:text-neutral-200 text-base font-medium">{asset.name}</p>
    </div>
    {/* <div className="flex flex-row items-center space-x-2">
      <p className="text-slate-500 text-xs">Best APY: {asset.apy}</p>
    </div> */}

  </div>
);
