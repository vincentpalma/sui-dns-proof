// import { Metadata } from "next"
// import Image from "next/image"
import { Separator } from "@/components/ui/separator";
import { StyleMarker } from "../../node_modules/@mysten/dapp-kit/src/components/styling/StyleMarker";
// import { Button } from '../../node_modules/@mysten/dapp-kit/src/components/ui/Button';
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Button } from "@/components/ui/button";
// import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ConnectButton } from "@/components/ConnectButton";

import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
// import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";

function Dashboard() {
  const account = useCurrentAccount();
  return (
    <>
      <div>
        <div className="border-b">
          <div className="fond-bold flex h-16 items-center px-4">
            DNS Verifier
            <div className="ml-auto flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
        </div>

        {account && (
          <div className="-mt-12 flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
              <Input
                type="search"
                placeholder="https://example.com"
                className="text-l h-[40px] w-[400px] px-8 py-4 tracking-tight"
              />

              <Button
                className="h-[60px] w-[400px] text-3xl font-bold tracking-tight"
                variant="outline"
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
              />

              <Button
                className="h-[60px] w-[400px] text-3xl font-bold tracking-tight"
                variant="outline"
              >
                Verify domain ownership
              </Button>
            </div>
          </div>
        )}

        {!account && (
          <div className="w-full flex-1 space-y-4 p-8 pt-6">
            <div className="mt-12 flex min-h-screen items-center justify-center">
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
{
  /* <Tabs defaultValue="overview" className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="mt-12 flex items-center justify-center">
                  <div>
                    <Input
                      type="search"
                      placeholder="0x3827403908409"
                      className="md:w-[400px] lg:w-[600px]"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
              </TabsContent>
            </Tabs> */
}
