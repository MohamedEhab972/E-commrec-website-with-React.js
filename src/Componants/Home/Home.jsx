import MainSlider from "./../MainSlider/MainSlider";
import CategorySlider from "./../CategorySlider/CategorySlider";
import RecentProduct from "../RecentProduct/RecentProduct";
export default function Home() {
  return (
    <>
      <div className="mt-36 md:mt-24">
        <MainSlider></MainSlider>
      </div>

      <div className="mt-36 md:mt-10">
        <CategorySlider></CategorySlider>
      </div>
      <div className="mt-36 md:mt-10">
        <RecentProduct></RecentProduct>
      </div>
    </>
  );
}
