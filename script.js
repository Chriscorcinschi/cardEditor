const defaults = {
   img: "https://images.pexels.com/photos/22644127/pexels-photo-22644127.jpeg",
   title: "Abstract Gradient",
   description: "Personalize this card by changing the values in the sidebar.",
   titleColor: "#e0b06c",
   textColor: "#242424",
   px: 20,
   py: 20,
   radius: 12,
   borderWidth: 3,
   borderColor: "#497385",
};

// DOM References
const card = {
   element: document.getElementById("card"),
   img: document.getElementById("card-img"),
   title: document.querySelector("#card h2"),
   desc: document.querySelector("#card p"),
};

// Global Input Selector
const inputs = document.querySelectorAll("[data-prop]");

//modify DOM & CSS
function applyChange(prop, val) {
   // Text/Images Update
   if (prop === "img") card.img.src = val || defaults.img;
   if (prop === "title") card.title.textContent = val;
   if (prop === "description") card.desc.textContent = val;

   // CSS Variables Update (Design Tokens)
   const unit = ["px", "py", "radius", "borderWidth"].includes(prop)
      ? "px"
      : "";
   document.documentElement.style.setProperty(`--${prop}`, val + unit);

   //  Updating Numeric Labels
   const label = document.getElementById(`${prop}-val`);
   if (label) label.textContent = val + (unit || "");
}

//State-UI sync
function updateUI(state) {
   inputs.forEach((input) => {
      const prop = input.dataset.prop;
      input.value = state[prop];
      applyChange(prop, state[prop]);
   });
}

// Initialization
function init() {
   updateUI(defaults); //Set initial state

   //Template: Event Delegation or Unique Cleanup Listener
   inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
         applyChange(e.target.dataset.prop, e.target.value);
      });
   });
}
init();
