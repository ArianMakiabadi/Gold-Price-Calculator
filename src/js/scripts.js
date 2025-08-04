const API_KEY = "goldapi-193rkxr5smdskt5ty-io"; //availble for free on goldapi.io
const API = "https://www.goldapi.io/api/XAU/USD";

let currGoldPrice; // 1 gram of 18k gold (USD)

// DOM Elements
const currPrice = document.getElementById("currPrice");
const formData = document.getElementById("form");
const finalPrice = document.getElementById("finalPrice");
const goldValue = document.getElementById("goldValue");
const laborCost = document.getElementById("laborCost");
const sellersProfit = document.getElementById("sellersProfit");
const vat = document.getElementById("vat");

// API
const myHeaders = {
  "x-access-token": API_KEY,
  "Content-Type": "application/json",
};

function fetchGoldPrice() {
  axios
    .get(API, { headers: myHeaders })
    .then(({ data: { price_gram_18k } }) => {
      currGoldPrice = price_gram_18k;
      currPrice.innerText = `Today's 18k Gold price per Gram: $${currGoldPrice}`;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Event Listeners
window.addEventListener("DOMContentLoaded", fetchGoldPrice);

formData.addEventListener("submit", (e) => {
  e.preventDefault(); //stop reload

  // Getting forms inputs
  const data = Object.fromEntries(new FormData(form).entries());

  // rendering the DOM
  finalPrice.innerText = `$${calcFinalPrice(data).toFixed(2)}`;
  goldValue.innerText = `$${calcNetValue(data).toFixed(2)}`;
  laborCost.innerText = `$${calcLaborCost(data).toFixed(2)}`;
  sellersProfit.innerText = `$${calcProfit(data).toFixed(2)}`;
  vat.innerText = `$${calcVat(data).toFixed(2)}`;
});

// Functions
function calcFinalPrice(data) {
  return (
    calcNetValue(data) + calcLaborCost(data) + calcProfit(data) + calcVat(data)
  );
}

function calcNetValue({ weight }) {
  return currGoldPrice * weight;
}

function calcLaborCost(data) {
  return (calcNetValue(data) * data.labor) / 100;
}

function calcProfit(data) {
  return ((calcNetValue(data) + calcLaborCost(data)) * data.profit) / 100;
}

function calcVat(data) {
  return ((calcProfit(data) + calcLaborCost(data)) * 18) / 100;
}
