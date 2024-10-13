import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ConnectButton } from "@/components/ConnectButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Dashboard() {
  const account = useCurrentAccount();

  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");

  return (
    <>
      <div className="border-b">
        <div className="fond-bold flex h-16 items-center px-4">
          {/* TODO: make it link to "/" */}
          DNS Verifier
          <div className="ml-auto flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>

        {account && (
          <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
              <Input
                type="search"
                placeholder="https://example.com"
                className="text-l h-[40px] w-[400px] px-8 py-4 tracking-tight"
                onChange={(e) => setDomain(e.target.value)}
              />

              <Button
                className="h-[60px] w-[400px] text-2xl font-bold tracking-tight"
                variant="outline"
                onClick={() => {
                  window.location.href = `/claim/${domain}`;
                }}
              >
                Claim domain ownership
              </Button>

              <div className="h-[8px]"></div>
              <Separator className="w-full max-w-[400px]" />
              <div className="h-[8px]"></div>

              <Input
                type="search"
                placeholder="0x38274038478908409"
                className="text-l h-[40px] w-[400px] px-8 py-4 tracking-tight"
                onChange={(e) => setAddress(e.target.value)}
              />

              <Button
                className="h-[60px] w-[400px] text-2xl font-bold tracking-tight"
                variant="outline"
                onClick={() => {
                  window.location.href = `/verify/${address}`;
                }}
              >
                Verify domain ownership
              </Button>
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

export default Dashboard;
