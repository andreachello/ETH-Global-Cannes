"use client";

import { Confetti, ConfettiRef } from "./conf";
import { useRef } from "react";



export function ConfettiDemo() {
  const confettiRef = useRef<ConfettiRef>(null);
  {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Confetti
      </span> */}
  return (

    <>
      <div className="w-full">
        <Confetti
          ref={confettiRef}
          className="absolute -left-[40rem] top-[10rem] z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute -left-[20rem] top-[30rem]  z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute left-[20rem] top-[20rem]  z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute left-[40rem] top-[20rem]  z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </div>
      <div className="w-full">
        <Confetti
          ref={confettiRef}
          className="absolute -left-[40rem] -bottom-[60rem] z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute -left-[20rem] -bottom-[60rem] z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute left-[20rem] -bottom-[60rem] z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <Confetti
          ref={confettiRef}
          className="absolute left-[40rem] -bottom-[60rem] z-50 size-full w-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </div>
    </>
  );
}
