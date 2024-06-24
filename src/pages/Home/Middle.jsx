import { Header } from "./Header";
import { Slideshow } from "./SlideShow";
import { Movies } from "./Movies";
import { fetchHomepage } from "../../hooks/fetchHomepage";

export const Middle = () => {
  return (
    <div className="md:ml-52 h-screen md:w-[65%] px-20">
      <Header />
      <Slideshow />
      <Movies />
    </div>
  );
};
