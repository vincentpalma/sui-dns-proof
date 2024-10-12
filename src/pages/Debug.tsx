import { useResolveSuiNSName } from "@mysten/dapp-kit";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import Navbar from "../components/Navbar"; // Import your Navbar component
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import DebugComponent from "../components/DebugComponent";

const Debug = () => {
  const currentAccount = useCurrentAccount();

  const { SuiNSData, isSuiNSPending } = useResolveSuiNSName(
    currentAccount?.address,
  );

  return (
    <div className="bg-base-200 flex items-center justify-center">
      <Navbar />

      <main className="container mx-auto mt-16 px-4 py-8">
        <section className="hero bg-base-100 mb-8 rounded-lg shadow-md">
          <h1 className="font-bold">Debug</h1>
          <DebugComponent />
        </section>
      </main>
    </div>
  );
};

export default Debug;
