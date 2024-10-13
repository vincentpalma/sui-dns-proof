// import { DropdownMenu } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

// function AccountDr() {

//     return {
//         <DropdownMenu>
//         <Drop
//         </DropdownMenu>
//     }
// }

// export default AccountDr;

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[150px]" variant="outline">
          {currentAccount?.address.slice(0, 5)}...
          {currentAccount?.address.slice(-4)}
          <Avatar className="ml-2 mr-1 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/cat.png`}
              // alt={selectedTeam.label}
              className="grayscale"
            />
            <AvatarFallback>SUI</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => disconnectWallet()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
