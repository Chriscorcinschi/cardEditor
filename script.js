const defaults = {
   img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
   title: "Abstract Gradient",
   description:
      "Customize this card by changing the values in the sidebar. You can adjust the padding, colors, and even the border radius to perfectly match your style.",
   titleColor: "#111827",
   textColor: "#4b5563",
   px: 24,
   py: 24,
   radius: 12,
   borderWidth: 2,
   borderColor: "#8fb8ca",
   bgColor: " #ffffff",
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

window.html2canvas = window.html2canvas || null;

//modify DOM & CSS
function applyChange(prop, val) {
   // Text/Images Update
   if (prop === "img") card.img.src = val || defaults.img;
   if (prop === "title") card.title.textContent = val;
   if (prop === "description") card.desc.textContent = val;

   // CSS Variables Update (Design Tokens)
   const unit = ["px", "py", "radius", "borderWidth", ""].includes(prop)
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

//Reset Button state
document
   .getElementById("reset-btn")
   .addEventListener("click", () => updateUI(defaults));

// Export Button
document.getElementById("export-btn").addEventListener("click", async () => {
   const card = document.getElementById("card");

   const canvas = await html2canvas(card, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
   });

   const link = document.createElement("a");
   link.download = "card.png";
   link.href = canvas.toDataURL("image/png", 1.0);
   link.click();
});

document.addEventListener("DOMContentLoaded", function () {
   init();
});
