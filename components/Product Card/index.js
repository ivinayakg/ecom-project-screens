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
    actionButton.remove();
    let discountPercentage = Math.ceil(
      ((price - parseInt(salePrice)) / price) * 100
    );
    let btn1 = document.createElement("button");
    btn1.classList.add("productListing_action");
    btn1.innerText = "Add To Cart";
    let btn2 = document.createElement("button");
    btn2.classList.add("productListing_action--active");
    btn2.innerText = "Add To Wishlist";
    let discountPara = document.createElement("p");
    discountPara.innerText = `%${discountPercentage} Off`;
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
