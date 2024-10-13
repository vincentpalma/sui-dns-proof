// import { DropdownMenu } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentAccount } from "@mysten/dapp-kit";

// function AccountDr() {

//     return {
//         <DropdownMenu>
//         <Drop
//         </DropdownMenu>
//     }
// }

// export default AccountDr;

import {
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
  const currentAccount = useCurrentAccount();

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
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
