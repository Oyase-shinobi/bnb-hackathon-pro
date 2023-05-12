import React, { useEffect, useMemo } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {
  LandingPage,
  AppHomePage,
  AppSignInPage,
  AppSignUpPage,
  AppSubScriptionPage,
  AppWalletConnectPage,
  DashboardHomePage,
  DashboardGamePage,
} from "./pages";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./assets/css/custom-swiper.css";

import { ConnectButton, useAccount } from "@particle-network/connect-react-ui";
import { usePrevious } from "./hooks";
import { getUser, login } from "./scripts";
import { setGlobalState, useGlobalState } from "./store";

const App: React.FC = () => {
  const address = useAccount();
  const [currentUser] = useGlobalState("currentUser");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setGlobalState("isAuthenticated", true);
      //set user object
      const user = {
        //@ts-expect-error
        id: JSON.parse(window.localStorage.getItem("user")).id,
        //@ts-expect-error
        email: JSON.parse(window.localStorage.getItem("user")).email,
        //@ts-expect-error
        username: JSON.parse(window.localStorage.getItem("user")).username,
      };
      setGlobalState("currentUser", user);
    }

    console.log(currentUser);
  }, []);
  // //set custom hook
  // const prevAddress = usePrevious(address);
  // useMemo(() => {
  //   if (address !== prevAddress && address) {
  //     login(address)
  //       .then((data) => {
  //         console.log(data);
  //         //@ts-ignore
  //         if (data.error) {
  //           //@ts-ignore
  //           console.log(data.error);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [address]);

  return (
    <>
      <div style={{ display: "none" }}>
        <ConnectButton />
      </div>
      <Router>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />
          {/* App */}
          <Route path="/app/home" element={<AppHomePage />} />
          <Route path="/app/signin" element={<AppSignInPage />} />
          <Route path="/app/signup" element={<AppSignUpPage />} />
          <Route path="/app/subscription" element={<AppSubScriptionPage />} />
          <Route
            path="/app/wallet-connect"
            element={<AppWalletConnectPage />}
          />
          {/* Dashboard */}
          <Route path="/dashboard/home" element={<DashboardHomePage />} />
          <Route path="/dashboard/game" element={<DashboardGamePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
