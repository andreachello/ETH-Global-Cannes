"use client";
import React, { useEffect, useState } from "react";
import { useLogin, useLoginWithEmail, useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { Mail, User, Settings, LogOut } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

const WalletConnection = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  // for privy login
  const { ready, authenticated, user, logout, connectOrCreateWallet } =
    usePrivy();
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { wallets } = useWallets();

  wallets[0].loginOrLink();

  const disableLogout = !ready || (ready && !authenticated);

  // useEffect(() => {
  //   setUserWalletAddress(publicKey?.toBase58()!);
  // }, [publicKey]);

  // const handleWalletSelect = async (walletName: any) => {
  //   if (walletName) {
  //     try {
  //       select(walletName);
  //       setOpen(false);
  //     } catch (error) {
  //       console.log("wallet connection err : ", error);
  //     }
  //   }
  // };

  useEffect(() => {
    if (authenticated) {
      setOpen(false);
      setEmail("");
      setCode("");
    }
  }, [authenticated]);

  return (
    <div className="">
      {/* <Dialog open={open} onOpenChange={setOpen}> */}
      <div className="flex gap-2 items-center">
        {ready && !authenticated ? (
          <>
            {/* <DialogTrigger asChild> */}
            <Button
              className=" text-[16px] text-white  h-[30px] md:h-[40px] border-2 border-white font-slackey z-50"
              onClick={connectOrCreateWallet}
            >
              Login
            </Button>
            {/* </DialogTrigger> */}
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-2 w-[40px] h-[40px] rounded-full border-2 border-white font-slackey z-50">
                  <User />

                  {/* {balance ? (
                    <div>{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div>0 SOL</div>
                  )} */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem className="flex justify-center">
                  <Button
                    className=" z-50  text-white  border-2 border-white font-slackey"
                    onClick={logout}
                    disabled={disableLogout}
                  >
                    <LogOut color="white" />
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* <DialogContent
            className="max-w-[450px] "
            style={{
              borderRadius: "30px",
            }}
          >
            <div className="flex w-full justify-center items-center ">
              <div className="flex flex-col justify-start items-center space-y-5  w-[300px] md:w-[400px] overflow-y-auto ">
                {ready && !authenticated && (
                  <div className="flex flex-col ">
                    <input
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      value={email}
                    />
                    <Button onClick={() => sendCode({ email })}>
                      Send Code
                    </Button>
                    <input
                      onChange={(e) => setCode(e.currentTarget.value)}
                      value={code}
                    />
                    <button onClick={() => loginWithCode({ code })}>
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent> */}
      </div>
      {/* </Dialog> */}
    </div>
  );
};

export default WalletConnection;
