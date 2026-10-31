import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface-main">
      <Header />
      <main className="px-4 py-6 md:px-[70px] md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
