'use client'

import { Bot } from "lucide-react";
import React, { FC } from "react";

interface StakingProviderProps {
    onSelectProvider: (provider: string) => void;
}

const providers = [
    {
        name: "Kamino",
        apy: "0.20%",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEUhISHExr/HycIKCQyipJ8AAADMzscXFhccHBy8vrdtb2tISEYfHyAODhAaGhoYGBleX1yRk46ZmpV8fXktLS2wsqy2uLGoqqRmZ2Q/Pz1SUlA3ODZ/gHzR1Mx3eHS/wbqIioUmJiZNTkxGRkRpmvlNAAADXElEQVR4nO3caXOqMBiGYQhkURNZBBe00tr//x9rt1NQJOFMz3Ded57rOzO5y2KA0CgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhljVlncw/i3zCZdonMqkOTL+cey++z2pljfirSRdvGSj1Fdu4R/SqrZXVOt0oJIeIPynIqtC5a1uq7jWGhjk6t6uXxKrRy36r4Dp/CdZQO9DEq1MfF7fHJq9Ct4uFALoUuf9DHpVA3g6cgn8Js9bCPR6GpHp2DXApdPRLIoTApHp+ELAp1PhpIv9DaxWgg/UL3PHYSMii01fgxSr/QlZ5dSL3QHn2B1AuTgnmhfWl9gcQLs73vOkO9MNl5D1Lihdq/C2kXZp4JG/1C57+S0i60kWdKSr5wPfLsgkdh4p2xES+0LwF9pAv1MmQXUi6UW+aFYdcZyoVJGrQLY0X1HbC5hO3CWLm5h/qXQnch2UKzCgwkWyhHn3MzKNQBt76kC72PgckXypDbJsqFbh8eSLLQXSYEUixMHr+zZ1G49r6KIV1oM9nUwb8TtApNprWT1fu6vEl9QjxJPdF6lsBmv9wUdTy5b1uW++VE+RyJye59wei0vGvf80E62X5sGk7tkjkKQ+8kOlSqnbnODsKnP19/mJRIoTq5j1tftoVq8zVOroVqIyPWhaL4DmRaKOqfn3mmhZXhXajOnZkax0JRd4fIsrDpfs3FsPBmhAwL1avpbsqvUNSytym/QpX3v6nkV9jq/qbsCsXzzVMLfoUH09+UW2F3Rsq08HxzGrIrVNXtO21mhbc/hgwL7w5SdoW3V1Juhf37JpaFm7uDlFvh8X51EKtCUQ68Z2JVqC531xlehWJ392MY8SpUzdBrMUaFohwcGaPC+DhwFnIq7D0G7mBTOHyZifgUirYaPEYZFTb387VPTArV8uGqGR6Ff15pD2BR+PNKewCHQnUeGxL9QiH2oyMiXygWr+NL84gXClU4zyo00oVCpCvv2kqyhUIoUVzkg4lMB8XC9/WDalvunfP30Sn8XH15LYvbti5P+TFzgf9clkihPpVlWWyWeXOonHQuC9l7n2SsJpplfWmk3ZXWa2Omfk1oXlcTHah9sGimohYIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7U3N8Y9g8rUYJAAAAAASUVORK5CYII=",
    },
    {
        name: "MarginFi",
        apy: "1.56%",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Solend",
        apy: "0.33%",
        icon: "data:image/png;base64,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",
    },
];

const StakingProvider: FC<StakingProviderProps> = ({ onSelectProvider }) => {
    const [selectedProvider, setSelectedProvider] = React.useState<string | null>(null); // Track selected provider

    const handleProviderSelect = (providerName: string) => {
        if (providerName === "Kamino") {
            setSelectedProvider(providerName);
            onSelectProvider(providerName);
        }
    };

    return (
        <>
            <div className='flex flex-row space-x-2 items-center bg-neutral-100 p-2 w-full rounded-xl border border-neutral-200 shadow-sm mb-2'>
                <Bot />
                <p>What data provider do you want to use?</p>
            </div>
            <div className="flex flex-col w-full border border-neutral-200 p-4 space-y-4 bg-white rounded-xl shadow-sm ">
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-neutral-800">Staking Data Provider Selection</p>
                    <p className="text-xs font-medium text-neutral-400">
                        Select a staking provider for your assets.
                    </p>
                </div>
                <div className="flex flex-row space-x-4">
                    {providers.map((provider) => (
                        <button
                            key={provider.name}
                            onClick={() => handleProviderSelect(provider.name)}
                            className={`relative w-40 h-32 p-4 space-y-2 rounded-lg border border-gray-200 flex flex-col ${selectedProvider === provider.name ? 'bg-neutral-50' : 'hover:bg-neutral-50'}`}
                        >
                            <div className="flex flex-row justify-between items-center">
                                <div className="z-0 w-10 h-10 bg-white rounded shadow justify-center items-center inline-flex">
                                    <img
                                        width={28}
                                        height={28}
                                        className="w-7 h-7"
                                        src={provider.icon}
                                        alt={provider.name}
                                    />
                                </div>
                            </div>

                            <div className="justify-start items-center inline-flex">
                                <p className="text-zinc-950 text-base font-medium">{provider.name}</p>
                            </div>
                            {/* <div className="flex flex-row items-center space-x-2">
                            <p className="text-slate-500 text-xs">APY: {provider.apy}</p>
                        </div> */}
                            {provider.name !== "Kamino" && (
                                <div className="absolute inset-0 bg-white opacity-95 rounded-lg flex items-center justify-center">
                                    <p className="text-neutral-500 font-semibold">Coming Soon</p>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>

    );
};

export default StakingProvider;
