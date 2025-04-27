import Header from "src/components/Header/Header";
import OurProducts from "src/components/OurProducts/OurProducts";
import TopCheapProducts from "src/components/TopCheapProducts/TopCheapProducts";

const HomePage = () => {
  return (
    <>
      <Header />
      <TopCheapProducts />
      <OurProducts />
    </>
  );
};

export default HomePage;
