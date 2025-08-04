const API_KEY = "goldapi-193rkxr5smdskt5ty-io";
const API = "https://www.goldapi.io/api/XAU/USD";
const currGoldPrice = 0; // current price of 1 gram of 24k gold

const formData = document.getElementById("form");
const finalPrice = document.getElementById("finalPrice");
const goldValue = document.getElementById("goldValue");
const laborCost = document.getElementById("laborCost");
const profit = document.getElementById("profit");
const vat = document.getElementById("vat");

// API
const myHeaders = {
  "x-access-token": API_KEY,
  "Content-Type": "application/json",
};

async function fetchGoldPrice() {
  const {
    data: { price_gram_24k },
  } = await axios.get(API, { headers: myHeaders });
  return price_gram_24k;
}

// fetchGoldPrice();

// Getting forms inputs
formData.addEventListener("submit", (e) => {
  e.preventDefault(); //stop reload

  const data = Object.fromEntries(new FormData(form).entries());

  console.log(data);

  finalPrice.innerText = `$${calcFinalPrice(data)}`;
  goldValue.innerText = `$${calcNetValue(data)}`;
  laborCost.innerText = `$${calcLaborCost(data)}`;
  profit.innerText = `$${calcProfit(data)}`;
  vat.innerText = `$${calcVat(data)}`;
});

function calcFinalPrice(data) {
  return (
    calcNetValue(data) + calcLaborCost(data) + calcProfit(data) + calcVat(data)
  );
}

function calcNetValue(data) {
  return currGoldPrice * data.weight;
}

function calcLaborCost(data) {
  return calcNetValue(data) * data.labor;
}

function calcProfit(data) {
  return (calcNetValue(data) + calcLaborCost(data)) * data.profit;
}

function calcVat(data) {
  return ((calcProfit(data) + calcLaborCost(data)) * 18) / 100;
}
