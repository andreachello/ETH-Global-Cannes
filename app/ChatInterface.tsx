import React, { useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";
import { TransferButton } from "@/components/ui/transferButton";

function ChatInterface({ setStart }: any) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<any>([
    {
      type: "assistant",
      content:
        "Hello! I can help you optimize your yield farming strategy. What would you like to know?",
    },
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setStart(true);
    }
  };

  const suggestions = [
    "Show me the best staking opportunities",
    "Compare APY rates across protocols",
    "Find highest yield farms",
    "Calculate potential earnings",
    "Explain impermanent loss risks",
    "List top lending protocols",
    "Show liquidation risks",
    "Find low-risk strategies",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setInputValue("");
  };

  return (
    <div className=" bg-gray-50 flex flex-col mx-[22rem] z-50">
      <div>
        <TransferButton />
      </div>

      {/* Input and suggestions area */}
      <div className="mx-[22rem] fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-10">
        <div className="max-w-3xl  pb-6">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm text-left group"
                >
                  <Sparkles
                    size={16}
                    className="text-purple-500 group-hover:text-purple-600"
                  />
                  <span className="text-gray-700 text-sm group-hover:text-gray-900">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-xl shadow-sm"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Yield Optimizoor..."
              className="z-50 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 focus:ring-opacity-50 pr-12"
            />
            <button
              onClick={() => {
                setStart(true);
                setMessages([1, 2]);
              }}
              //   type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600 p-2 disabled:opacity-50"
              disabled={!inputValue.trim()}
            >
              <SendHorizontal size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
