import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Check, InfoIcon, Moon, Sun } from 'lucide-react';
import { Spinner } from '../spinner';
import { toast } from 'sonner';
import { ConfettiDemo } from './confetti';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const LendingComponent = () => {
    const [amount, setAmount] = useState(2000.09);
    const [selectedYield, setSelectedYield] = useState('current'); // 'min', 'current', 'max'
    const [darkMode, setDarkMode] = useState(false);

    // Define yield rates based on historical 90-day data
    const yieldRates = {
        min: 4,     // Historical 90-day minimum
        current: 5.04,   // Current yield
        max: 7      // Historical 90-day maximum
    };

    // Calculate earnings based on different APY scenarios
    const calculateEarnings = (principal, apy, months) => {
        // Monthly interest rate
        const monthlyRate = apy / 100 / 12;
        // Calculate compound interest: P(1 + r)^t
        return principal * Math.pow(1 + monthlyRate, months);
    };

    // Generate data points for each scenario
    const generateDataPoints = (principal) => {
        const months = [1, 3, 5, 7, 9, 12];

        return {
            min: months.map(month => calculateEarnings(principal, yieldRates.min, month)),
            current: months.map(month => calculateEarnings(principal, yieldRates.current, month)),
            max: months.map(month => calculateEarnings(principal, yieldRates.max, month))
        };
    };

    const dataPoints = generateDataPoints(amount);

    // Calculate the minimum value for y-axis
    // This helps to zoom in on the differences by starting the axis at a higher value
    const calculateYAxisMin = () => {
        // Find the minimum value across all datasets
        const allValues = [...dataPoints.min, ...dataPoints.current, ...dataPoints.max];
        const minValue = Math.min(...allValues);
        // Start y-axis at 95% of the minimum value to create a zoomed-in effect
        return minValue * 0.95;
    };

    // Chart data
    const chartData = {
        labels: ['Month 1', 'Month 3', 'Month 5', 'Month 7', 'Month 9', 'Month 12'],
        datasets: [
            {
                fill: true,
                label: `90-Day Min (${yieldRates.min}% APY)`,
                data: dataPoints.min,
                borderColor: darkMode ? '#737373' : '#94a3b8', // neutral-500 : slate-400
                backgroundColor: darkMode ? 'rgba(115, 115, 115, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: darkMode ? '#737373' : '#94a3b8',
                pointBorderColor: darkMode ? '#262626' : '#fff',
                pointRadius: 4,
                tension: 0.4,
                borderDash: [5, 5],
            },
            {
                fill: true,
                label: `Current (${yieldRates.current}% APY)`,
                data: dataPoints.current,
                borderColor: '#2dd4bf', // teal-400 (works in both modes)
                backgroundColor: darkMode ? 'rgba(45, 212, 191, 0.1)' : 'rgba(45, 212, 191, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#2dd4bf',
                pointBorderColor: darkMode ? '#262626' : '#fff',
                pointRadius: 4,
                tension: 0.4,
            },
            {
                fill: true,
                label: `90-Day Max (${yieldRates.max}% APY)`,
                data: dataPoints.max,
                borderColor: '#5eead4', // teal-300 (works in both modes)
                backgroundColor: darkMode ? 'rgba(94, 234, 212, 0.1)' : 'rgba(94, 234, 212, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#5eead4',
                pointBorderColor: darkMode ? '#262626' : '#fff',
                pointRadius: 4,
                tension: 0.4,
            }
        ],
    };

    // Chart options
    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false, // Changed to false to allow custom min value
                min: calculateYAxisMin(), // Set minimum value to zoom in on differences
                border: {
                    display: false,
                },
                ticks: {
                    display: true, // Show y-axis ticks for better context
                    font: {
                        size: 8, // Smaller font size
                    },
                    color: darkMode ? '#a3a3a3' : '#94a3b8', // neutral-400 : slate-400
                    callback: function (value) {
                        return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(value);
                    }
                },
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
            },
            x: {
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    color: darkMode ? '#a3a3a3' : '#94a3b8', // neutral-400 : slate-400
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                    boxHeight: 6,
                    padding: 20,
                    font: {
                        size: 10,
                        family: 'Manrope',
                    },
                    color: darkMode ? '#d4d4d4' : '#64748b', // neutral-300 : slate-500
                }
            },
            tooltip: {
                backgroundColor: darkMode ? 'rgba(38, 38, 38, 0.9)' : 'rgba(24, 24, 27, 0.9)', // neutral-800 : zinc-900
                padding: 10,
                cornerRadius: 4,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
        },
        responsive: true,
    };

    // Handle slider change
    const handleSliderChange = (e) => {
        setAmount(parseFloat(e.target.value));
    };

    // Calculate monthly interest based on selected yield
    const getMonthlyInterest = () => {
        const apy = yieldRates[selectedYield];
        const monthlyRate = apy / 100 / 12;
        return amount * monthlyRate;
    };

    // Calculate annual earnings
    const getAnnualEarnings = () => {
        const apy = yieldRates[selectedYield];
        return amount * (apy / 100);
    };

    // Calculate difference from base rate
    const getDifferenceFromBase = () => {
        const selectedMonthlyInterest = getMonthlyInterest();
        const baseMonthlyInterest = amount * (yieldRates.min / 100 / 12);
        return selectedMonthlyInterest - baseMonthlyInterest;
    };

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // Handle yield selection
    const handleYieldSelection = (yield_type) => {
        setSelectedYield(yield_type);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const [finished, setFinished] = useState(false);

    const handleConfirmClick = async () => {
        // await handleSendSol()
        toasts()

    }

    const toasts = () => {
        toast("Swapping ETH for USDT...")

        setTimeout(() => {
            toast("Successfully swapped ETH for USDT ", {
                description: "tx: 0xae0fea3a2a1748ee581fb3...",
            })

        }, 6000);

        setTimeout(() => {
            toast("Lending USDT on Init Capital...")
        }, 7000);

        setTimeout(() => {
            toast("Successfully lent USDT on Init Capital!", {
                description: "tx: 0x07be99eb6297277337eeae4251...",
            })
            setFinished(true)

        }, 12000);


    }


    return (
        <>
            <div className={`flex flex-col w-full border border-neutral-200 rounded-lg p-1 ${darkMode ? 'dark' : ''}`}>

                {/* Right Side - Lending Details */}
                <div className="w-full p-6 bg-gray-50 dark:bg-neutral-950">
                    <h2 className="text-lg font-semibold text-slate-750 dark:text-neutral-200 mb-4">Lending Details</h2>

                    <div className="rounded-lg border border-gray-200 dark:border-neutral-750 p-6 mb-6 bg-white dark:bg-neutral-850">
                        <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1">Estimated monthly Interest Earned</p>
                        <p className="text-3xl font-bold mb-4 text-slate-750 dark:text-neutral-200">{formatCurrency(getMonthlyInterest())}</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 leading-snug">
                            Selecting this option would make your {formatCurrency(getDifferenceFromBase())} per month more compared to the 90-day minimum yield
                        </p>

                        {/* Yield selection tabs */}
                        <div className="flex mt-4 border border-gray-200 dark:border-neutral-750 rounded-lg overflow-hidden">
                            <button
                                onClick={() => handleYieldSelection('min')}
                                className={`flex-1 py-2 text-xs font-medium 
                ${selectedYield === 'min'
                                        ? 'bg-gray-100 dark:bg-neutral-750 text-slate-750 dark:text-neutral-200'
                                        : 'bg-white dark:bg-neutral-850 text-gray-500 dark:text-neutral-400'}`}
                            >
                                90-Day Min ({yieldRates.min}%)
                            </button>
                            <button
                                onClick={() => handleYieldSelection('current')}
                                className={`flex-1 py-2 text-xs font-medium 
                ${selectedYield === 'current'
                                        ? 'bg-gray-100 dark:bg-neutral-750 text-slate-750 dark:text-neutral-200'
                                        : 'bg-white dark:bg-neutral-850 text-gray-500 dark:text-neutral-400'}`}
                            >
                                Current ({yieldRates.current}%)
                            </button>
                            <button
                                onClick={() => handleYieldSelection('max')}
                                className={`flex-1 py-2 text-xs font-medium 
                ${selectedYield === 'max'
                                        ? 'bg-gray-100 dark:bg-neutral-750 text-slate-750 dark:text-neutral-200'
                                        : 'bg-white dark:bg-neutral-850 text-gray-500 dark:text-neutral-400'}`}
                            >
                                90-Day Max ({yieldRates.max}%)
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-850 rounded-lg p-6 shadow-card dark:shadow-card-dark">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600 dark:text-neutral-400">Annual Percentage Yield (APY)</p>
                            <p className="font-semibold text-slate-750 dark:text-neutral-200">
                                {yieldRates[selectedYield]}%
                            </p>
                        </div>

                        {/* Chart */}
                        <div className="h-56 mb-6 bg-white dark:bg-neutral-850 rounded-lg">
                            <Line data={chartData} options={chartOptions} />
                        </div>

                        {/* Slider and Amount */}
                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-500 dark:text-neutral-400">Amount</p>
                                <div className='flex flex-col'>
                                    <p className="font-semibold text-slate-750 dark:text-neutral-200">{amount} usdt</p>
                                    <p className="text-slate-750 dark:text-neutral-400 text-xs">Wallet: 5000 usdt</p>
                                </div>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="10"
                                value={amount}
                                onChange={handleSliderChange}
                                className="w-full h-1 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer range-slider"
                            />

                            <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-500 mt-1">
                                <span>0 usdt</span>
                                <span>MAX</span>
                            </div>
                        </div>

                        {/* Lend Button and Additional Info */}
                        <div className="mt-6 flex flex-row justify-between">
                            <div />
                            <button className="px-5 py-2.5 rounded-lg bg-purple text-white font-medium hover:bg-purple-dark transition-colors">
                                Start strategy
                            </button>

                        </div>
                    </div>
                </div>
                <button
                    onClick={handleConfirmClick}
                    className="cursor-pointer px-4 py-2 bg-neutral-800 text-white rounded text-sm font-medium">
                    Execute strategy
                </button>
            </div>
            {finished && (
                <div className='z-50'>
                    <div>
                        <div className="flex flex-col space-y-12 mt-12">
                            <div className="flex flex-row space-x-2 justify-between w-full items-center p-6 bg-neutral-800 rounded-2xl text-white">
                                <div className="flex flex-row space-x-2 items-center">
                                    <p>🎉🎉</p>
                                    <p>LFG! Strategy Successfully Executed!</p>
                                </div>

                            </div>
                        </div>
                        <ConfettiDemo />
                    </div>
                </div>
            )}
        </>
    );
};

export default LendingComponent;
