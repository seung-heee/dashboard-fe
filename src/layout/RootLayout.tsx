import {Outlet} from "react-router";

const RootLayout = () => {
  return (
    <div className="app-wrapper bg-slate-50/50">
      <Outlet />
    </div>
  );
};

export default RootLayout;