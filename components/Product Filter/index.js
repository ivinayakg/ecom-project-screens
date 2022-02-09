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
        console.log(e, icon);
      }
    });
    target.append(input);
  });
});
