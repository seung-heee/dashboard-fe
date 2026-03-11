import {Outlet} from "react-router";

const RootLayout = () => {
  return (
      <div className='app-wrapper'>
        <Outlet />
      </div>
  );
};

export default RootLayout;