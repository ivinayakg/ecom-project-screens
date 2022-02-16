export const header = () => {
  const headers = document.querySelectorAll(".header");

  headers.forEach((target, i) => {
    let content = target.querySelector(".header_content");
    let toggle = target.querySelector(".header_toggle");

    toggle.addEventListener("click", () => {
      if (toggle.className.includes("header_toggle--active")) {
        toggle.classList.remove("header_toggle--active");
        content.classList.remove("header_content--active");
      } else {
        toggle.classList.add("header_toggle--active");
        content.classList.add("header_content--active");
      }
    });
  });
};

export const badgeHandler = () => {
  const badge = document.querySelectorAll(".badge");

  badge.forEach((target, i) => {
    target.style.position = "relative";
    let badge = document.createElement("span");
    badge.innerText = target.attributes.content.nodeValue;
    if (target.attributes.icon.nodeValue === "true") {
      badge = document.createElement("i");
      badge.classList.add("far");
      badge.classList.add(target.attributes.iconValue.nodeValue);
    }
    badge.classList.add("badge_icon");
    badge.classList.add(target.attributes.position.nodeValue);
    badge.classList.add(target.attributes.color.nodeValue);

    target.append(badge);
  });
};

export const sliderHandler = () => {
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
          current !== sliderItems.length - 1 ? current + 1 : sliderItems.length;
        if (current === sliderItems.length) {
          current = 0;
        }
        slide.style.transform = `translate3d(-${translatePercentage[current]}px,0,0)`;
      });
      slideButtons.children[0].addEventListener("click", () => {
        current = current !== 0 ? current - 1 : 0;
        slide.style.transform = `translate3d(-${translatePercentage[current]}px,0,0)`;
      });
    }

    if (
      target.attributes["autoSlide"] &&
      target.attributes["autoSlide"].nodeValue !== ""
    ) {
      setInterval(() => {
        slideButtons.children[1].click();
      }, parseInt(target.attributes["autoSlide"].nodeValue));
    }
  });
};

export const radioInputHandler = () => {
  const radioInputs = document.querySelectorAll(".productListing_radio");

  radioInputs.forEach((target, i) => {
    let options = target.attributes["content"].nodeValue.split("/");

    options.forEach((radio, h) => {
      let input = document.createElement("button");
      input.classList.add("productListing_radioButton");
      input.setAttribute("value", "off");
      let icon = document.createElement("i");
      icon.classList.add("productListing_radioIcon");
      icon.classList.add("fas");
      input.innerText = radio;
      input.append(icon);

      input.addEventListener("click", (e) => {
        if (e.target.attributes["value"].nodeValue === "on") {
          e.target.attributes["value"].nodeValue = "off";
          icon.classList.remove("fa-check");
        } else if (e.target.attributes["value"].nodeValue === "off") {
          e.target.attributes["value"].nodeValue = "on";
          icon.classList.add("fa-check");
        }
      });

      icon.addEventListener("click", () => input.click());

      target.append(input);
    });
  });
};

export const productCardHadnler = () => {
  const productListings = document.querySelectorAll(".productListing");

  productListings.forEach((target, i) => {
    let type = target.attributes["type"]
      ? target.attributes["type"].nodeValue
      : "default";
    let status = target.attributes["status"]
      ? target.attributes["status"].nodeValue
      : "default";
    let price = target.attributes["price"]
      ? target.attributes["price"].nodeValue
      : "0";
    let discount = target.attributes["discount"]
      ? target.attributes["discount"].nodeValue
      : "0";

    price = parseInt(price);
    let salePrice = price - parseInt(discount);

    let actionButton = target.querySelector(".productListing_action");
    let priceContainer = target.querySelector(".productListing_price");
    let iconContainer = target.querySelector(".productListing_wishlistIcon");
    let contentContainer = target.querySelector(".productListing_content");

    switch (status) {
      case "favourite":
        actionButton.innerText = "Move To Cart";
        iconContainer.innerHTML = '<i class="fas fa-heart"></i>';
        break;
      case "added":
        actionButton.innerText = "Go To Cart";
        actionButton.classList.add("productListing_action--active");
        iconContainer.innerHTML = '<i class="far fa-heart"></i>';
        break;
      case "both":
        actionButton.innerText = "Go To Cart";
        actionButton.classList.add("productListing_action--active");
        iconContainer.innerHTML = '<i class="fas fa-heart"></i>';
        break;
      default:
        actionButton.innerText = "Add To Cart";
        iconContainer.innerHTML = '<i class="far fa-heart"></i>';
        break;
    }

    if (type === "portrait") {
      target.classList.add("productListing--portrait");
      // removed the previous one button only
      actionButton.remove();
      let discountPercentage = Math.ceil(
        ((price - parseInt(salePrice)) / price) * 100
      );

      // dynamically creating buttons for the card
      let btn1 = document.createElement("button");
      btn1.classList.add("productListing_action");
      btn1.innerText = "Add To Cart";
      let btn2 = document.createElement("button");
      btn2.classList.add("productListing_action--active");
      btn2.innerText = "Add To Wishlist";

      // creeating the discount percent component for the card
      let discountPara = document.createElement("p");
      discountPara.innerText = `%${discountPercentage} Off`;

      // adding all the nodes to the document
      contentContainer.append(discountPara);
      let btnContainer = document.createElement("div");
      btnContainer.classList.add("productListing_btnContainer");
      btnContainer.append(btn1);
      btnContainer.append(btn2);
      contentContainer.append(btnContainer);

      priceContainer.innerHTML = `<p>&#8377 ${salePrice}</p><p class='productListing_discount'>&#8377 ${price}</p>`;
    } else {
      priceContainer.innerHTML = `<p>&#8377 ${salePrice}</p>`;
    }
  });
};

export const productQuantity = () => {
  const productQuantitiesComp = document.querySelectorAll(".product_Qauntity");

  productQuantitiesComp.forEach((target, i) => {
    let btns = target.querySelectorAll("i");
    let quanityContainer = target.querySelector(".product_qauntityValue");
    let currentQuantity =
      parseInt(target.attributes["quantity"]?.nodeValue) || 0;
    quanityContainer.innerText = currentQuantity;

    btns[0].addEventListener("click", () => {
      ++currentQuantity;
      quanityContainer.innerText = currentQuantity;
    });
    btns[1].addEventListener("click", () => {
      --currentQuantity;
      if (currentQuantity < 0) currentQuantity = 0;
      quanityContainer.innerText = currentQuantity;
    });
  });
};

export const inputHandler = () => {
  const inputsContainer = document.querySelectorAll(".input");

  inputsContainer.forEach((target, i) => {
    let input = target.querySelector("input");
    input.addEventListener("change", () => {
      input.className = "";
      if (!input.validity.typeMismatch) {
        input.classList.add("input--valid");
      } else {
        input.classList.add("input--invalid");
      }

      if (input.value === "") {
        input.classList.remove("input--valid");
        input.classList.remove("input--invalid");
      }
    });
  });
};
