import { Outlet } from "react-router";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
