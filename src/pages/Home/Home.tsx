import Header from "src/components/Header/Header";
import OurCategories from "src/components/OurCategories/OurCategories";
import OurProducts from "src/components/OurProducts/OurProducts";
import TopCheapProducts from "src/components/TopCheapProducts/TopCheapProducts";

const HomePage = () => {
  return (
    <>
      <Header />
      <TopCheapProducts />
      <OurCategories />
      <OurProducts />
    </>
  );
};

export default HomePage;
