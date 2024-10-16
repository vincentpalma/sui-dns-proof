import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ConnectButton } from "@/components/ConnectButton";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Claim() {
  const account = useCurrentAccount();
  const { domain } = useParams();

  const [cert, setCert] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  function signUsingPrivateKey(privateKey: string, message: string) {
    // TODO: sign using private key
    return "";
  }

  const handleSubmit = () => {
    const signedMessage = signUsingPrivateKey(privateKey, account!.address);
    // TODO: call contract function claim_domain(cert, signedMessage)
  };

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
              Claim ownership of <b>{domain}</b>
              <Input
                type="search"
                placeholder="fullchain.pem"
                className="text-l h-[40px] w-[400px] px-8 py-4 tracking-tight"
                onChange={(e) => setCert(e.target.value)}
              ></Input>
              <Input
                type="search"
                placeholder="private.pem"
                className="text-l h-[40px] w-[400px] px-8 py-4 tracking-tight"
                onChange={(e) => setPrivateKey(e.target.value)}
              ></Input>
              <Button onClick={handleSubmit}>Submit</Button>
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

export default Claim;
