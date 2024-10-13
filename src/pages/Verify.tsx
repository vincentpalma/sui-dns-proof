import { useCurrentAccount } from "@mysten/dapp-kit";
import { ConnectButton } from "@/components/ConnectButton";
import { useParams } from "react-router-dom";

function Verify() {
  const account = useCurrentAccount();
  const { address } = useParams();
  return (
    <>
      <div className="border-b">
        <div className="fond-bold flex h-16 items-center px-4">
          DNS Verifier
          <div className="ml-auto flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>

        {account && (
          <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
              <b>{address}</b> owns:
              {
                // TODO: get data from contract
              }
            </div>
          </div>
        )}

        {!account && (
          <div className="w-full flex-1 space-y-4 p-8 pt-6">
            <div className="-mt-36 flex min-h-screen items-center justify-center">
              <h1 className="h-[500px] text-center text-5xl font-bold tracking-tight">
                Connect your Sui wallet <br /> to access our services!
              </h1>
              <div className="flex items-center space-x-2"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Verify;
