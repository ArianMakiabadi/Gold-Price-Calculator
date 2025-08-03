const API_KEY = "goldapi-193rkxr5smdskt5ty-io";
const API = "https://www.goldapi.io/api/XAU/USD";

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
