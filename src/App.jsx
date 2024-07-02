import { useState } from "react";
import { SideBarLeft, SideBarRight } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SideBarLeft />
      <AllRoutes />
      <SideBarRight />
    </AuthProvider>
  );
}

export default App;
