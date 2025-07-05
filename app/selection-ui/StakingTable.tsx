import React from 'react';
import { Coins, TrendingUp, ArrowRight, Bot } from 'lucide-react';
import { agent } from '@/lib/agent';

interface StakingOption {
    name: string;
    apy: number;
    minStake: string;
    tvl: string;
    logo?: string;
    isComingSoon?: boolean;
}



const stakingOptions: StakingOption[] = [
    {
        name: 'mSoLz',
        apy: 8.04,
        minStake: '0.1 mSOL',
        tvl: '$100M',
    },
    {
        name: 'bSo13',
        apy: 7.83,
        minStake: '0.1 bSOL',
        tvl: '$100M',
    },
    {
        name: 'LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X',
        apy: -0.02,
        minStake: '0.1 LAI',
        tvl: '$100M',
    },
    {
        name: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
        apy: 7.86,
        minStake: '0.1 J1to',
        tvl: '$100M',
    },
    {
        name: '5oVN',
        apy: 10.04,
        minStake: '0.1 5oVN',
        tvl: '$100M',
    },
    {
        name: 'LST',
        apy: 7.32,
        minStake: '0.1 LST',
        tvl: '$100M',
    },
    {
        name: 'jup',
        apy: 8.18,
        minStake: '0.1 jup',
        tvl: '$100M',
    },
    {
        name: 'he1',
        apy: 8.87,
        minStake: '0.1 he1',
        tvl: '$100M',
    },
    {
        name: 'vSOL',
        apy: 7.34,
        minStake: '0.1 vSOL',
        tvl: '$100M',
    },
    {
        name: 'BonK',
        apy: 7.83,
        minStake: '0.1 BonK',
        tvl: '$100M',
    },
    {
        name: 'Comp',
        apy: 7.86,
        minStake: '0.1 Comp',
        tvl: '$100M',
    },
    {
        name: 'Fi5',
        apy: 0.00,
        minStake: '0.1 Fi5',
        tvl: '$100M',
    },
    {
        name: 'pico',
        apy: 9.33,
        minStake: '0.1 pico',
        tvl: '$100M',
    },
    {
        name: 'HUB',
        apy: 7.40,
        minStake: '0.1 HUB',
        tvl: '$100M',
    },
    {
        name: 'BNS',
        apy: 6.24,
        minStake: '0.1 BNS',
        tvl: '$100M',
    },
    {
        name: 'Bybit',
        apy: 6.04,
        minStake: '0.1 Bybit',
        tvl: '$100M',
    },
    {
        name: 'Dso',
        apy: 9.20,
        minStake: '0.1 Dso',
        tvl: '$100M',
    },
    {
        name: 'ezSOL',
        apy: 0.30,
        minStake: '0.1 ezSOL',
        tvl: '$100M',
    },
    {
        name: 'ky',
        apy: 0.22,
        minStake: '0.1 ky',
        tvl: '$100M',
    }
];

function StakingTable() {
    const [stakingMessage, setStakingMessage] = React.useState<string | null>(null);

    const handleStake = (option: StakingOption) => {
        // Simulate staking process
        setStakingMessage(`Staking ${option.name}...`);
        setTimeout(() => {
            setStakingMessage(`Successfully staked ${option.name}!`);
        }, 2000); // Simulate a delay for the staking process
    };

    return (
        <>
            {stakingMessage && (
                <div className="bg-green-100 text-green-800 p-2 rounded mb-2">
                    {stakingMessage}
                </div>
            )}
            <div className='flex flex-row space-x-2 items-center bg-neutral-100 p-2 w-full rounded-xl border border-neutral-200 shadow-sm mb-2'>
                <Bot />
                <p>Here is a table of best APYs:</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
                <div className="flex flex-col p-3">
                    <p className="text-sm font-medium text-neutral-800">Best Staking APY</p>
                    <p className="text-xs font-medium text-neutral-400">
                        Select an asset to stake your SOL for and stake it
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Asset</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">APY</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">TVL</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Min. Stake</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stakingOptions.map((option) => (
                                <tr
                                    key={option.name}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                           
                                            <span className="font-medium text-gray-900 text-sm">{option.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span className="font-medium text-green-600 text-sm">{option.apy}%</span>
                                    </td>
                                    {/* <td className="px-4 py-2 text-right whitespace-nowrap text-gray-600 text-sm">
                                        {option.tvl}
                                    </td> */}
                                    {/* <td className="px-4 py-2 text-right whitespace-nowrap text-gray-600 text-sm">
                                        {option.minStake}
                                    </td> */}
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <button 
                                            className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                                            onClick={() => handleStake(option)}
                                        >
                                            Stake
                                            <ArrowRight className="ml-1 w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StakingTable;