const closing_Btn = document.querySelector(".closing-side i");
const aside = document.querySelector("aside");
const open_Btn = document.querySelector(".right-column .top .bars ");
const theme_toggler = document.querySelector(".toggle-theme #darkmode");

open_Btn.addEventListener("click", () => {
  aside.style.display = "block";
});
closing_Btn.addEventListener("click", () => {
  aside.style.display = "none";
});

theme_toggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variable");
});

async function jsonData() {
  let respne = await fetch("data/dashboard.json");
  let json = await respne.json();
  return json;
}