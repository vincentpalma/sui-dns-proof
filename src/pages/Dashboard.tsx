// import { Metadata } from "next"
// import Image from "next/image"

import { Button } from "@/components/ui/button";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
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
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ConnectButton />
              {/* {!account && <div>No account connected</div>}
			{account && (
				<div>
					<h2>Current account:</h2>
					<div>Address: {account.address}</div>
				</div>
			)} */}
            </div>
          </div>
        </div>
        {account && (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="mt-12 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Claim domain ownership
              </h2>
              <div className="flex items-center space-x-2"></div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="mt-12 flex items-center justify-center">
                  <div>
                    <Input
                      type="search"
                      placeholder="https://example.com"
                      className="md:w-[400px] lg:w-[600px]"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        {account && (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="mt-12 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Verify the domain
              </h2>
              <div className="flex items-center space-x-2"></div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
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
            </Tabs>
          </div>
        )}

        {!account && (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="mt-12 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Connect wallet
              </h2>
              <div className="flex items-center space-x-2"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
