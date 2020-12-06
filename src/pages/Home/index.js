import * as React from "react";
import { SideNav, LayoutSidebar } from "upkit";
import menus from "./menus";

const Home = () => {
  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={
          <div className="w-full h-full mr-5 md:flex md:flex-row-reverse min-h- screen">
            <div className="w-full pb-10 pl-5 md:w-3/4">
              Konten utama di sini
            </div>
            <div className="w-full h-full bg-gray-100 border-r border-white shadow-lg md:w-1/4">
              Keranjang belanja di sini
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
};

export default Home;
