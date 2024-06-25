import { Top } from "./Top";
import { Middle } from "./Middle";
import { Bottom } from "./Bottom";

export const SideBarRight = () => {
  return (
    <>
      <aside className="fixed right-0 top-0 w-96 h-screen p-4 bg-transparent">
        <Top />
        <main className="ml-[-40px]">
          <Middle />
          <Bottom />
        </main>
      </aside>
    </>
  );
};
