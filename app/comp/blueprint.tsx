'use client'

import { ArrowDown, Clock, Code, Dot, File, Pencil, Star, Type } from 'lucide-react';
import React, { useState, useEffect } from 'react';
// import DeFiComponent from '../borrowing/DeFiComponent';

// Strategy data
const strategies = [
    {
        id: "maximize-yield",
        title: "Maximize Yield",
        label: "Yield Blueprint",
        steps: [
            {
                title: "Connect to Init Capital",
                emoji: "🔗",
                description: "Connect your wallet to Init Capital protocol on Mantle network."
            },
            {
                title: "Select USDT Asset",
                emoji: "💎",
                description: "Choose USDT as the asset you want to supply to the lending pool."
            },
            {
                title: "Check Current APY",
                emoji: "📊",
                description: "Review the current lending rate for USDT on Init Capital."
            },
            {
                title: "Enter Supply Amount",
                emoji: "💰",
                description: "Specify how much USDT you want to supply to start earning interest."
            },
            {
                title: "Approve & Supply",
                emoji: "✅",
                description: "Approve the transaction and supply your USDT to start earning yield."
            }
        ],
        details: {
            protocols: "Protocols",
            yield: { label: "Yield", value: "~3-8% APY from USDT lending on Init Capital." },
            risk: { label: "Risk", value: "Low - Smart contract risk only, no liquidation risk." },
            iterations: { label: "Duration", value: "Flexible - withdraw anytime with no lock period" }
        },
        protocolIcons: [
            // <KaminoIcon key="kamino" />, 
            // <USDCIcon key="usdc" />, 
            // <JupiterIcon key="jupiter" />
        ],
        protocolNames: "Init Capital",
        buttonText: "Supply USDT"
    },

];

function generateStrategyPrompt(strategy) {
    // Utility: Map step titles to tool calls based on common keywords
    function inferToolCall(stepTitle) {
        const lower = stepTitle.toLowerCase();
        if (lower.includes("stake")) return "stake()";
        if (lower.includes("collateral") || lower.includes("lend")) return "lend()";
        if (lower.includes("borrow")) return "borrow()";
        if (lower.includes("loop") || lower.includes("restake") || lower.includes("repeat")) return "loop()";
        if (lower.includes("limit") || lower.includes("risk")) return "showRisk()";
        return "customAction()";
    }

    // Prepare each step with tool call info
    const stepsWithTools = strategy.steps.map((step, i) => {
        const toolCall = inferToolCall(step.title);
        return `Step ${i + 1}: "${step.title}" → use ${toolCall}`;
    }).join("\n    ");

    // Extract protocol, yield, risk, etc.
    const { title } = strategy;
    const protocols = strategy.protocolNames || "various protocols";
    const yieldVal = strategy.details?.yield?.value || "unknown yield";
    const riskVal = strategy.details?.risk?.value || "unknown risk";
    const iterations = strategy.details?.iterations?.value || "unspecified";

    return `\n
  - you help users execute DeFi strategies one step at a time.
  - the strategy is: "${title}" involving ${protocols}.
  - expected yield: ${yieldVal}. Risk level: ${riskVal}. Recommended iterations: ${iterations}.
  - DO NOT output lists.
  - keep responses short (1 sentence max).
  - after calling each tool (like stake(), lend(), borrow()), respond like you're showing the result.
  - ask clarifying questions when details are missing, like amount.
  - here is the sequence of actions:
    ${stepsWithTools}
  - always guide the user to the next step until deployment is confirmed.
`
}

const STAKING_PROMPT = `\n
- you help users lend their cryptocurrency!
- keep your responses limited to a sentence.
- DO NOT START BY ASKING THE ASSET!
- DO NOT output lists.
- after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
- ask follow up questions to nudge user into the optimal flow
- here's the optimal flow
  - step 1: Find lending providers (call listStakingProviders) DO NOT ASK FOR ASSETS YET
'
`

const StrategyBlueprint = ({
    chatId,
    result,
    setBlueprint
}: any) => {
    const [currentStrategy, setCurrentStrategy] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [showStrategy, setShowStrategy] = useState(false)

    // const strategy = result?.tradingStrategy;
    // const strategy = result ? strategies[currentStrategy] : null

    const strategy = strategies[0]
    // const strategy = result ?
    //   result.tradingStrategy.risk === "low" ? strategies[1] : strategies[0]
    //   : null

    // Simulate loading for 1 second on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 second

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const handleNextStrategy = () => {
        setCurrentStrategy((prev) => (prev + 1) % strategies.length);
    };


    const handleGenerateStrategy = () => {

        // const strategyPrompt = generateStrategyPrompt(strategies[0])
        const strategyPrompt =
            result?.tradingStrategy?.risk === "low" ?
                STAKING_PROMPT : ""

        setShowStrategy(true)
        setBlueprint(true)
        // append({
        //   role: "system",
        //   content: "Call the showComponent tool and ignore anything else",
        //   // content: STAKING_PROMPT,
        // });

        // append({
        //   role: "user",
        //   content: "showComponent",
        // });
    }

    // Skeleton loading UI
    const renderSkeleton = () => (
        <div className="flex items-center justify-center mt-6">
            <div className="w-full bg-card-bg rounded-lg overflow-hidden shadow-lg bg-neutral-800 animate-pulse">
                <div className="p-4">
                    <div className="h-4 bg-neutral-600 rounded mb-2"></div>
                    <div className="h-6 bg-neutral-600 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-600 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-600 rounded mb-2"></div>
                </div>
            </div>
        </div>
    );

    // Render skeleton or actual content based on loading state
    return isLoading ? (
        renderSkeleton()
    ) : (
        <>
            <div className="flex mt-2 mb-6 w-full">
                <div className="bg-card-bg rounded-lg overflow-hidden border border-neutral-200 w-full">
                    {/* Header section */}
                    <div className="p-4 relative">
                        <div className="text-neutral-500 text-xs mb-1 flex justify-between items-center">
                            <span>Strategy Blueprint</span>
                        </div>
                        <h1 className="text-lg font-bold text-gray-900">{strategy?.title}</h1>
                    </div>

                    <div className="h-px bg-neutral-300"></div>

                    {/* Features section */}
                    <div className="p-4">
                        <h2 className="text-sm font-medium tracking-wider uppercase mb-3 text-gray-900">STEPS</h2>

                        <div className="space-y-2.5">
                            {strategy?.steps.map((step, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Dot className="text-gray-600" />
                                        <span className="font-medium text-sm text-gray-900">{step.title}: </span>
                                    </div>

                                    <span className="ml-1 text-gray-600 text-sm">{step.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-neutral-300"></div>

                    {/* Strategy Details section */}
                    {strategy &&
                        <div className="p-4">
                            <h2 className="text-sm font-medium tracking-wider text-gray-900 uppercase mb-3">STRATEGY DETAILS</h2>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className='flex flex-row items-center'>
                                        <Code className='w-3 h-3 text-gray-600' />
                                        <span className="w-16 ml-2 text-sm text-gray-900">Protocols</span>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {strategy?.protocolNames}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className='flex flex-row items-center'>
                                        <File className='w-3 h-3 text-gray-600' />
                                        <span className="w-16 ml-2 text-gray-900 text-sm">{strategy?.details.yield.label}</span>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {strategy?.details.yield.value}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className='flex flex-row items-center'>
                                        <Type className='w-3 h-3 text-gray-600' />
                                        <span className="w-16 ml-2 text-gray-900 text-sm">Risk</span>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {strategy?.details.risk.value}
                                    </div>
                                </div>

                                {strategy &&
                                    <div className="flex items-center justify-between">
                                        <div className='flex flex-row items-center'>
                                            <Clock className='w-3 h-3 text-gray-600' />
                                            <span className="w-16 ml-2 text-gray-900 text-sm">{strategy?.details.iterations.label}</span>
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {strategy?.details.iterations.value}
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>}

                    <div className="h-px bg-neutral-300"></div>

                    <div className="p-4">

                        <div className="flex justify-between">
                            <button
                                onClick={handleNextStrategy}
                                className="px-2 py-1 text-gray-700 rounded-lg text-sm font-medium hover:text-gray-900"
                            >
                                Next Strategy
                            </button>
                            <button onClick={handleGenerateStrategy} className="cursor-pointer px-4 py-2 bg-neutral-800 text-white rounded text-sm font-medium">
                                Generate strategy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
      {showStrategy && (
       <div className='mt-12 w-full'>
         <DeFiComponent />
       </div>
      )} */}
        </>
    );
};

export default StrategyBlueprint;
