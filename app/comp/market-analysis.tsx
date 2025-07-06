import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function MarketAnalysis(
    {
        chatId,
        result,
        setMarketAnalysis
    }: any
) {
    const [analysisState, setAnalysisState] = useState("thinking");
    const [content, setContent] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showThinking, setShowThinking] = useState(true);
    const contentEndRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);

    // Define the full analysis content with explicit reasoning steps
    const analysisData = [
        {
            "title": "Scanning all Protocols:",
            "thinking": "First, I need to identify all relevant DeFi protocols on Mantle to form a clear landscape of opportunities and risks...",
            "points": [
                { "text": "Lendle", "subpoints": [] },
                { "text": "Meth (Mantle's native LSD)", "subpoints": [] },
                { "text": "Init Capital", "subpoints": [] },
                { "text": "FusionX", "subpoints": [] },
                { "text": "Agni Finance", "subpoints": [] },
                { "text": "fBTC", "subpoints": [] }
            ]
        },
        {
            "title": "Cross-comparing Yields on Mantle",
            "thinking": "Now that the main protocols are mapped, I’ll break down their stable and LSD yield opportunities, including any point incentives or unique staking rewards.",
            "points": [
                {
                    "text": "Lendle Lending (USDT/USDC):",
                    "subpoints": [
                        "Base lending yield: ~5–7% APY depending on asset.",
                        "Extra rewards via Lendle Points — eligible for future airdrops.",
                        "High capital efficiency and relatively low volatility on stable pairs."
                    ]
                },
                {
                    "text": "Init Capital (Leverage Vaults):",
                    "subpoints": [
                        "Auto-looped leveraged yield strategies (e.g., USDT/METH vaults).",
                        "Yields between 10–20% APR depending on leverage settings.",
                        "Risk: liquidation in volatile markets or poor vault management."
                    ]
                },
                {
                    "text": "Meth Staking:",
                    "subpoints": [
                        "~5.5% native staking yield on METH (Mantle's LST).",
                        "Can be used as collateral across Lendle and Init.",
                        "Risk: METH depeg or low liquidity across platforms."
                    ]
                },
                {
                    "text": "Agni Stable Farms:",
                    "subpoints": [
                        "LP yield farms on stable pairs like USDT/USDC, often ~10%+ APR.",
                        "Auto-compounding via Agni Vaults.",
                        "Impermanent loss is negligible on stable pairs, but DEX risk exists."
                    ]
                }
            ]
        },
        {
            "title": "Borrowing Strategies & Leveraged Yields",
            "thinking": "With stable and LST assets earning yield, I’m now looking into safe borrow-and-loop strategies for additional alpha. Efficiency and liquidation risk must be balanced.",
            "points": [
                {
                    "text": "METH-backed Borrowing on Lendle:",
                    "subpoints": [
                        "Borrow USDC or USDT against METH at up to ~70% LTV.",
                        "Deploy borrowed funds into Init leverage vaults or Agni farms.",
                        "METH continues to earn native yield even while used as collateral."
                    ]
                },
                {
                    "text": "Looping with Init Capital:",
                    "subpoints": [
                        "Use Lendle to borrow stablecoins → deposit into Init’s auto-loop vaults.",
                        "Yields stack with vault leverage (~15–20% APR depending on risk).",
                        "Risk: volatile METH prices can trigger liquidation chains."
                    ]
                },
                {
                    "text": "Delta-neutral LPs using fBTC:",
                    "subpoints": [
                        "Deposit fBTC as collateral → borrow USDC → short BTC using perp DEX (like FusionX).",
                        "Earnings come from perp funding rates + stablecoin yield.",
                        "Requires active monitoring and rebalancing."
                    ]
                },
                {
                    "text": "Yield Maximization Stack:",
                    "subpoints": [
                        "Stake METH → use as collateral → borrow stables → farm Init vaults.",
                        "Stacking rewards: METH staking yield + Init farm APR + potential airdrops.",
                        "Best results when points programs or liquidity mining incentives are active."
                    ]
                }
            ]
        }
    ]



    // Scroll to bottom when content updates
    useEffect(() => {
        if (contentEndRef.current) {
            contentEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [content]);

    // Simulate typing effect with explicit thinking steps
    useEffect(() => {
        if (analysisState === "thinking") {
            // Simulate "thinking" for a shorter time
            const thinkingTimer = setTimeout(() => {
                setAnalysisState("analyzing");
            }, 800);

            return () => clearTimeout(thinkingTimer);
        }

        if (analysisState === "analyzing") {
            // Process one step at a time
            if (currentStep < analysisData.length) {
                // First show the thinking process
                if (showThinking) {
                    const step = analysisData[currentStep];
                    let index = 0;
                    const thinkingText = step.thinking;
                    let displayedText = "";

                    const typingInterval = setInterval(() => {
                        if (index < thinkingText.length) {
                            // Speed up by adding multiple characters at once
                            const charsToAdd = Math.min(5, thinkingText.length - index);
                            displayedText += thinkingText.substring(index, index + charsToAdd);
                            index += charsToAdd;

                            setContent(prev => {
                                // Find and update the thinking item if it exists
                                const thinkingItemIndex = prev.findIndex(item =>
                                    item.type === "thinking" && item.stepIndex === currentStep
                                );

                                if (thinkingItemIndex >= 0) {
                                    const newContent = [...prev];
                                    newContent[thinkingItemIndex] = {
                                        ...newContent[thinkingItemIndex],
                                        text: displayedText,
                                    };
                                    return newContent;
                                } else {
                                    // Add new thinking item
                                    return [...prev, {
                                        type: "thinking",
                                        text: displayedText,
                                        isActive: true,
                                        stepIndex: currentStep
                                    }];
                                }
                            });
                        } else {
                            clearInterval(typingInterval);

                            // Update the thinking item to stop pulsating
                            setTimeout(() => {
                                setContent(prev =>
                                    prev.map(item =>
                                        item.type === "thinking" && item.stepIndex === currentStep
                                            ? { ...item, isActive: false }
                                            : item
                                    )
                                );

                                setShowThinking(false);
                            }, 300);
                        }
                    }, 10); // Faster interval

                    return () => clearInterval(typingInterval);
                } else {
                    // Show section title with typing effect
                    const step = analysisData[currentStep];
                    const sectionTitle = `${currentStep + 1}. ${step.title}`;
                    let titleIndex = 0;
                    let displayedTitle = "";

                    const titleInterval = setInterval(() => {
                        if (titleIndex < sectionTitle.length) {
                            // Speed up by adding multiple characters at once
                            const charsToAdd = Math.min(5, sectionTitle.length - titleIndex);
                            displayedTitle += sectionTitle.substring(titleIndex, titleIndex + charsToAdd);
                            titleIndex += charsToAdd;

                            setContent(prev => {
                                // Find and update the section title if it exists
                                const sectionItemIndex = prev.findIndex(item =>
                                    item.type === "section" && item.stepIndex === currentStep
                                );

                                if (sectionItemIndex >= 0) {
                                    const newContent = [...prev];
                                    newContent[sectionItemIndex] = {
                                        ...newContent[sectionItemIndex],
                                        text: displayedTitle,
                                    };
                                    return newContent;
                                } else {
                                    // Add new section title
                                    return [...prev, {
                                        type: "section",
                                        text: displayedTitle,
                                        stepIndex: currentStep
                                    }];
                                }
                            });
                        } else {
                            clearInterval(titleInterval);

                            // Start showing points after a short delay
                            setTimeout(() => {
                                processPoints(currentStep);
                            }, 150); // Shorter delay
                        }
                    }, 10); // Faster interval

                    return () => clearInterval(titleInterval);
                }
            } else {
                // All steps completed
                if (!isComplete) {
                    const completionText = "";
                    let completionIndex = 0;
                    let displayedCompletion = "";

                    const completionInterval = setInterval(() => {
                        if (completionIndex < completionText.length) {
                            // Speed up by adding multiple characters at once
                            const charsToAdd = Math.min(5, completionText.length - completionIndex);
                            displayedCompletion += completionText.substring(completionIndex, completionIndex + charsToAdd);
                            completionIndex += charsToAdd;

                            setContent(prev => {
                                // Find and update the completion text if it exists
                                const completionItemIndex = prev.findIndex(item =>
                                    item.type === "completion"
                                );

                                if (completionItemIndex >= 0) {
                                    const newContent = [...prev];
                                    newContent[completionItemIndex] = {
                                        ...newContent[completionItemIndex],
                                        text: displayedCompletion,
                                    };
                                    return newContent;
                                } else {
                                    // Add new completion text
                                    return [...prev, {
                                        type: "completion",
                                        text: displayedCompletion
                                    }];
                                }
                            });
                        } else {
                            clearInterval(completionInterval);
                            setIsComplete(true);
                            setAnalysisState("finished");
                            setIsOpen(false)
                        }
                    }, 10); // Faster interval

                    return () => clearInterval(completionInterval);
                }
            }
        }
    }, [analysisState, currentStep, showThinking, isComplete]);

    // Process points for the current step
    const processPoints = (stepIndex) => {
        const step = analysisData[stepIndex];
        let pointIndex = 0;
        let subpointIndex = 0;

        const processNextItem = () => {
            // Check if we've processed all points
            if (pointIndex >= step.points.length) {
                // All points for this step are processed, move to next step
                setTimeout(() => {
                    setCurrentStep(prevStep => prevStep + 1);
                    setShowThinking(true);
                }, 300); // Shorter delay
                return;
            }

            const point = step.points[pointIndex];

            // Process main point if we haven't started subpoints yet
            if (subpointIndex === 0) {
                // Process the main point
                let index = 0;
                const pointText = point.text;
                let displayedPoint = "";

                const pointInterval = setInterval(() => {
                    if (index < pointText.length) {
                        // Speed up by adding multiple characters at once
                        const charsToAdd = Math.min(5, pointText.length - index);
                        displayedPoint += pointText.substring(index, index + charsToAdd);
                        index += charsToAdd;

                        setContent(prev => {
                            // Create a unique identifier for this point
                            const pointId = `point-${stepIndex}-${pointIndex}`;

                            // Find and update the point if it exists
                            const pointItemIndex = prev.findIndex(item =>
                                item.type === "point" && item.id === pointId
                            );

                            if (pointItemIndex >= 0) {
                                const newContent = [...prev];
                                newContent[pointItemIndex] = {
                                    ...newContent[pointItemIndex],
                                    text: displayedPoint,
                                };
                                return newContent;
                            } else {
                                // Add new point
                                return [...prev, {
                                    type: "point",
                                    text: displayedPoint,
                                    id: pointId,
                                    stepIndex,
                                    pointIndex
                                }];
                            }
                        });
                    } else {
                        clearInterval(pointInterval);

                        // If there are subpoints, start processing them
                        if (point.subpoints && point.subpoints.length > 0) {
                            subpointIndex = 0;
                            setTimeout(() => {
                                processSubpoint();
                            }, 100); // Shorter delay
                        } else {
                            // No subpoints, move to next point
                            pointIndex++;
                            subpointIndex = 0;
                            setTimeout(processNextItem, 100); // Shorter delay
                        }
                    }
                }, 10); // Faster interval
            } else {
                // We should never reach here directly - subpoints are handled by processSubpoint
                processSubpoint();
            }
        };

        // Separate function to process subpoints
        const processSubpoint = () => {
            const point = step.points[pointIndex];

            // Make sure we have subpoints to process
            if (!point.subpoints || subpointIndex >= point.subpoints.length) {
                // No more subpoints, move to next point
                pointIndex++;
                subpointIndex = 0;
                setTimeout(processNextItem, 100); // Shorter delay
                return;
            }

            // Process current subpoint
            const subpoint = point.subpoints[subpointIndex];
            let index = 0;
            let displayedSubpoint = "";

            const subpointInterval = setInterval(() => {
                if (index < subpoint.length) {
                    // Speed up by adding multiple characters at once
                    const charsToAdd = Math.min(5, subpoint.length - index);
                    displayedSubpoint += subpoint.substring(index, index + charsToAdd);
                    index += charsToAdd;

                    setContent(prev => {
                        // Create a unique identifier for this subpoint
                        const subpointId = `subpoint-${stepIndex}-${pointIndex}-${subpointIndex}`;

                        // Find and update the subpoint if it exists
                        const subpointItemIndex = prev.findIndex(item =>
                            item.type === "subpoint" && item.id === subpointId
                        );

                        if (subpointItemIndex >= 0) {
                            const newContent = [...prev];
                            newContent[subpointItemIndex] = {
                                ...newContent[subpointItemIndex],
                                text: displayedSubpoint,
                            };
                            return newContent;
                        } else {
                            // Add new subpoint
                            return [...prev, {
                                type: "subpoint",
                                text: displayedSubpoint,
                                id: subpointId,
                                stepIndex,
                                pointIndex,
                                subpointIndex
                            }];
                        }
                    });
                } else {
                    clearInterval(subpointInterval);

                    // Move to next subpoint
                    subpointIndex++;

                    // Check if we've processed all subpoints
                    if (subpointIndex >= point.subpoints.length) {
                        // Move to next point
                        pointIndex++;
                        subpointIndex = 0;
                        setTimeout(processNextItem, 100); // Shorter delay
                    } else {
                        // Process next subpoint
                        setTimeout(processSubpoint, 100); // Shorter delay
                    }
                }
            }, 10); // Faster interval
        };

        // Start processing points
        processNextItem();
    };

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (analysisState === "finished") {
            setMarketAnalysis(true);
        }
    }, [analysisState]);

    return (
        <div className="reasoning-container rounded-lg border border-neutral-200 text-black p-4">
            <div className="flex flex-row space-x-1 items-center cursor-pointer" onClick={toggleAccordion}>
                <h2 className="text-sm font-medium text-neutral-400">
                    {isOpen ?
                        <div className="flex flex-row space-x-1 items-center">
                            <ChevronDown className="w-4 h-4" />
                            <p>Analyzing market data</p>
                        </div>
                        :
                        <div className="flex flex-row space-x-1 items-center ">
                            <ChevronRight className="w-4 h-4" />
                            <p>Analyzed market data</p>
                        </div>
                    }
                </h2>
            </div>

            {isOpen && (
                <div className="flex flex-row space-x-2">
                    <div className="w-[1px] flex-grow bg-neutral-800" />
                    <div className="w-[99.4%] text-sm leading-relaxed text-black">
                        {analysisState === "thinking" && (
                            <div className="flex items-center text-terminal-muted text-black">
                                <div className={`animate-pulse ${analysisState === "thinking" ? "spin" : ""}`}>
                                    Analyzing market data...
                                </div>
                            </div>
                        )}

                        {content.map((item, index) => {
                            if (item.type === "thinking") {
                                return (
                                    <div key={`thinking-${item.stepIndex}-${index}`} className="my-2 text-terminal-muted italic">
                                        <span className={item.isActive ? "animate-pulse" : ""}>
                                            {item.text}
                                        </span>
                                    </div>
                                );
                            } else if (item.type === "section") {
                                return (
                                    <div key={`section-${item.stepIndex}-${index}`} className="mt-4 mb-2 font-medium text-black">
                                        {item.text}
                                    </div>
                                );
                            } else if (item.type === "point") {
                                return (
                                    <div key={item.id || `point-${index}`} className="bullet-point ml-4 my-1">
                                        <span className="mr-2">•</span>
                                        <span className="bullet-point-content">
                                            {item.text}
                                        </span>
                                    </div>
                                );
                            } else if (item.type === "subpoint") {
                                return (
                                    <div key={item.id || `subpoint-${index}`} className="bullet-point subpoint my-1">
                                        <span className="mr-2">-</span>
                                        <span className="bullet-point-content">
                                            {item.text}
                                        </span>
                                    </div>
                                );
                            } else if (item.type === "completion") {
                                return (
                                    <div key={`completion-${index}`} className="mt-4 text-terminal-muted border-t border-gray-700 pt-2">
                                        {item.text}
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {/* Invisible element to scroll to */}
                        <div ref={contentEndRef} />
                    </div>
                </div>
            )}

        </div>
    );
}

export default MarketAnalysis;
