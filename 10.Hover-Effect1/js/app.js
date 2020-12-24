const parentBgEl = document.querySelector(".bg");
const childEls = document.querySelectorAll(".container .text span");
const text = document.querySelector(".text");
const line = document.getElementById("line");

childEls.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    const id = el.getAttribute("data-id");
    const bgEl = parentBgEl.querySelector(`.id-${id}`);

    parentBgEl.querySelectorAll("img").forEach((img) => {
      img.style.display = "none";
      img.style.animation = "";
    });
    bgEl.style.display = "block";
    bgEl.style.animation = "animate 1s ease forwards";

    // line animation
    const cords = el.getBoundingClientRect();
    const textCords = text.getBoundingClientRect();

    line.style.width = cords.width + "px";
    line.style.left = cords.left - textCords.left + "px";
  });
});
