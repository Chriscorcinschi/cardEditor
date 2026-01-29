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
