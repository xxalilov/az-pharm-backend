import sliderSettings from "./_slider-settings";
import maskPhone from "./_mask-phone";
import navAction from "./_nav-action";
import index from "./index";

document.addEventListener("DOMContentLoaded", () => {
  sliderSettings();
  maskPhone();
  navAction();
  index(), AOS.init();
});
