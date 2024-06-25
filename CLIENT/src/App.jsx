import { useState } from "react";
import { SideBarLeft, SideBarRight } from "./components";
import { Middle } from "./pages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SideBarLeft />
      <Middle />
      <SideBarRight />
    </AuthProvider>
  );
}

export default App;
