import { usePrivy, useSendTransaction } from "@privy-io/react-auth";
import { Button } from "./button";
import { useState } from "react";

export const TransferButton = () => {
  const { user } = usePrivy();
  const { sendTransaction } = useSendTransaction();
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await sendTransaction({
        to: "0xA324D80CB1645989b7c1355E17d456754e8fd05B",
        value: 1000000000000000, // 0.001 ETH in wei
        chainId: 11155111, // Sepolia chain ID
      });
      console.log("Transaction sent successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {user && (
        <Button onClick={handleTransfer} disabled={isLoading}>
          {isLoading ? "Sending..." : "Transfer"}
        </Button>
      )}
    </div>
  );
};
