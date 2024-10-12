// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// import {
//   createNetworkConfig,
//   SuiClientProvider,
//   WalletProvider,
// } from "@mysten/dapp-kit";
// import { getFullnodeUrl } from "@mysten/sui/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // Config options for the networks you want to connect to
// const { networkConfig } = createNetworkConfig({
//   localnet: { url: getFullnodeUrl("localnet") },
//   mainnet: { url: getFullnodeUrl("mainnet") },
// });
// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
//         <WalletProvider>
//           <App />
//         </WalletProvider>
//       </SuiClientProvider>
//     </QueryClientProvider>
//   </StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
// import { defineConfig, loadEnv } from 'vite'

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import "./index.css"; // Import the styles.css file

export const network = import.meta.env.VITE_NETWORK || "testnet";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
        <WalletProvider
          stashedWallet={{
            name: "DNS Proof",
            network: network,
          }}
          autoConnect
        >
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
