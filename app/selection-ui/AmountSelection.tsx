'use client'

import React, { FC } from 'react';
import { Input } from "@/app/components/ui/input";
import { Bot } from 'lucide-react';

interface AmountSelectionProps {
    onSelectAmount: (amount: string) => void;
}

export const AmountSelection: FC<AmountSelectionProps> = ({ onSelectAmount }) => {
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelectAmount(event.target.value);
    };

    return (
        <>
            <div className='flex flex-row space-x-2 items-center bg-neutral-100 p-2 w-full rounded-xl border border-neutral-200 shadow-sm mb-2'>
                <Bot />
                <p>What is the amount you want to stake?</p>
            </div>
            <div className="flex flex-col w-full border border-neutral-200 p-4 space-y-4 bg-white rounded-xl shadow-sm ">
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-neutral-800">Amount Selection</p>
                    <p className="text-xs font-medium text-neutral-400">
                        Select a starting amount. This will be the starting amount used in the strategy.
                    </p>
                </div>
                <Input variant="function-input" placeholder="Select Amount" onChange={handleAmountChange} />
            </div>
        </>
    );
};

export default AmountSelection;
