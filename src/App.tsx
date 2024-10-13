import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Claim from "./pages/Claim";
import Verify from "./pages/Verify";

function App() {
  const currentAccount = useCurrentAccount();
  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/claim/:domain"
          element={<Claim domain="example.com" />}
        />{" "}
        {/* TODO: pass domain as prop */}
        <Route
          path="/verify/:address"
          element={<Verify address="0x38274038478908409" />}
        />{" "}
        {/* TODO: pass address as prop */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
