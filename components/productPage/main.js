const productQuantitiesComp = document.querySelectorAll(".product_Qauntity");

productQuantitiesComp.forEach((target, i) => {
  let btns = target.querySelectorAll("i");
  let quanityContainer = target.querySelector(".product_qauntityValue");
  let currentQuantity = parseInt(target.attributes["quantity"]?.nodeValue) || 0;
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
