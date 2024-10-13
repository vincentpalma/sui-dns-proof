import type { ButtonHTMLAttributes, ReactNode } from "react";
// import { useCurrentAccount } from '../hooks/wallet/useCurrentAccount.js';
// import { AccountDropdownMenu } from './AccountDropdownMenu.js';
// import { ConnectModal } from './connect-modal/ConnectModal.js';
// import { StyleMarker } from './styling/StyleMarker.js';
// import { Button } from './ui/Button.js';

import { Button } from "@/components/ui/button";
import { useCurrentAccount, ConnectModal } from "@mysten/dapp-kit";
import TeamSwitcher from "./team-switcher";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuDemo } from "./AccountDr";

type ConnectButtonProps = {
  connectText?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConnectButton({
  connectText = "Connect Wallet",
  ...buttonProps
}: ConnectButtonProps) {
  const currentAccount = useCurrentAccount();
  return currentAccount ? (
    // <AccountDr currentAccount={currentAccount} />
    // <>Connected</>
    <DropdownMenuDemo></DropdownMenuDemo>
  ) : (
    // <TeamSwitcher></TeamSwitcher>
    <ConnectModal
      trigger={
        <Button {...buttonProps} variant={"outline"}>
          {connectText}
        </Button>
      }
    />
    // <Button {...buttonProps} variant={"outline"}>{connectText}</Button>
  );
}
