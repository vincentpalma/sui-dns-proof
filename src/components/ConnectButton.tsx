import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentAccount, ConnectModal } from "@mysten/dapp-kit";
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
    <DropdownMenuDemo></DropdownMenuDemo>
  ) : (
    <ConnectModal
      trigger={
        <Button {...buttonProps} variant={"outline"}>
          {connectText}
        </Button>
      }
    />
  );
}
