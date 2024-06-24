import { useState } from "react";
import { SideBarLeft, SideBarRight } from "./components";
import { Middle } from "./pages";


function App() {
  return (
    <>
      <SideBarLeft />
      <Middle />
      <SideBarRight />
    </>
  );
}

export default App;
