const sliders = document.querySelectorAll(".slider");

sliders.forEach((target, i) => {
  let slide = target.querySelector(".slider_slide");
  let slideButtons = target.querySelector(".slider_buttons");
  let slideDots = target.querySelector(".slider_dots");
  let sliderItems = target.querySelectorAll(".slider_item");
  let slideWidth = slide.offsetWidth / sliderItems.length;

  let slideDotsEvent = target.className.includes("slider--dots");

  const translatePercentage = [];
  let current = 0;

  sliderItems.forEach((item, i) => {
    translatePercentage.push(slideWidth * i);

    if (slideDotsEvent) {
      let slideDot = document.createElement("div");
      slideDot.classList.add("slide_dot");
      slideDots.append(slideDot);
    }
  });

  if (slideDotsEvent) {
    let slideDotButton = target.querySelectorAll(".slide_dot");
    slideDotButton.forEach((btn, i) => {
      if (i !== current) {
        btn.innerHTML = '<i class="far fa-circle"></i>';
      } else {
        btn.innerHTML = '<i class="fas fa-circle"></i>';
      }

      btn.addEventListener("click", () => {
        slideDotButton.forEach((target) => {
          target.innerHTML = "";
          if (target !== btn) {
            target.innerHTML = '<i class="far fa-circle"></i>';
          }
        });
        btn.innerHTML = '<i class="fas fa-circle"></i>';
        current = i;
        slide.style.transform = `translate3d(-${translatePercentage[current]}px,0,0)`;
      });
    });
  } else if (!slideDotsEvent) {
    slideButtons.children[1].addEventListener("click", () => {
      current =
        current !== sliderItems.length - 1
          ? current + 1
          : sliderItems.length - 1;
      slide.style.transform = `translate3d(-${translatePercentage[current]}px,0,0)`;
    });
    slideButtons.children[0].addEventListener("click", () => {
      current = current !== 0 ? current - 1 : 0;
      slide.style.transform = `translate3d(-${translatePercentage[current]}px,0,0)`;
    });
  }
});
