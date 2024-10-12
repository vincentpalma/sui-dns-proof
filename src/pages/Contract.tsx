import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Counter } from "../components/CounterComponents/Counter";
import { CreateCounter } from "../components/CounterComponents/CreateCounter";
import Navbar from "../components/Navbar";

const Contract = () => {
  const currentAccount = useCurrentAccount();
  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-20 max-w-7xl p-4">
        <div className="flex justify-center">
          {currentAccount ? (
            counterId ? (
              <Counter id={counterId} />
            ) : (
              <CreateCounter
                onCreated={(id) => {
                  window.location.hash = id;
                  setCounter(id);
                }}
              />
            )
          ) : (
            <h1 className="mb-4 text-3xl font-bold">
              Please connect your wallet
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Contract;
