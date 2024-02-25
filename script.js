import { countryList } from "./codes.js";

let BaseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let drpDwnSlct = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let currfrom = document.querySelector(".from select");
let currTo = document.querySelector(".to select");
let msg=document.querySelector("#msg");
for (let select of drpDwnSlct) {
  for (let currcode in countryList) {
    let NewOption = document.createElement("option");
    NewOption.innerText = currcode;
    NewOption.value = currcode;
    if (currcode === "USD" && select.name === "from") {
      NewOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      NewOption.selected = "selected";
    }
    select.appendChild(NewOption);
  }
  // change the flag when the select changes
  select.addEventListener("change", (evt) => {
    let crrcode = evt.target.value;
    let countryCode = countryList[crrcode];
    console.log(crrcode);

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(newSrc);
    let img = select.parentElement.querySelector("img");
    img.src = newSrc;
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amtVal.value = "1";
  }

  const url = `${BaseURL}/${currfrom.value.toLowerCase()}/${currTo.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(response);
  console.log(data);
  let rate = data[currTo.value.toLowerCase()];
  console.log(rate);
  let totalAmount=(rate*amtVal).toFixed(2);
  msg.innerText=`${amtVal} ${currfrom.value}=${totalAmount} ${currTo.value}`;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
