import { useAddress, useSDK } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

export type Balance = {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
}

export default function useWalletBalance() {
  const [balance, setBalance] = useState<Balance>();
  const sdk = useSDK();
  const address = useAddress();

  useEffect(() => {
    if(address) {
      (async () => {
        const balance = await sdk?.wallet.balance();
        if (balance) setBalance(balance);
      })();
    }
  }, [address]);

  return balance;
}
