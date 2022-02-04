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
