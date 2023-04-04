let page = 1;
let phoneNum = false;
let validateName = false;
let validateEmail = false;
let storePlanLevel = "Arcade";
let storePrice = "$9/mo";
let planDurationDisplay = "Monthly";
let pickedAddOns = [];
let totalAddOn = 0;
let allSteps = document.querySelectorAll(".formPart");
let backButton = document.querySelectorAll(".backButton");
let nextButton = document.querySelectorAll(".nextButton");
let confirmBtn = document.querySelectorAll(".confirmBtn");
let stepNav = document.querySelectorAll(".sidebar .navigator p");
let nameInput = document.querySelector("#name");
let mailInput = document.querySelector("#mail");
let phoneInput = document.querySelector("#phone");
let plansList = document.querySelectorAll(".step2 ul li");
let checkBoxPlanDuration = document.querySelector("#checkbox");
let addon1CheckBox = document.querySelector(".step3 ul .tickBox1 ");
let addon2CheckBox = document.querySelector(".step3 ul .tickBox2 ");
let addon3CheckBox = document.querySelector(".step3 ul .tickBox3 ");
let plans = document.querySelector(".step2 ul li:first-child");
let addonsDisplay = document.querySelector(".step4 .cart .addOnSelected ");
let totalCost = document.querySelector(".step4  .totalCost p:last-child ");
let ServiceNameDisplay = document.querySelector(
  ".step4 .cart .serviceSelected .title"
);
let ServicePriceDisplay = document.querySelector(
  ".step4 .cart .serviceSelected .price"
);
let totalCostHeading = document.querySelector(
  ".step4  .totalCost p:first-child "
);

//
//
//
//
function page2HyperLink() {
  page = 2;
  pageSelector();
  stepMap();
}
function selectedAddons() {
  addonsDisplay.innerHTML = "";
  document.querySelectorAll(".step3 label").forEach((label) => {
    if (label.classList.contains("selectedPlan")) {
      if (planDurationDisplay == "Monthly") {
        addonsDisplay.insertAdjacentHTML(
          "beforeend",
          `<li>
                      <p class="title">${label.getAttribute("data-addon")}</p>
                      <p class="price">+$${label.getAttribute(
                        `data-${planDurationDisplay}`
                      )}/mo</p>
                 </li>`
        );
      } else {
        addonsDisplay.insertAdjacentHTML(
          "beforeend",
          `<li>
                        <p class="title">${label.getAttribute("data-addon")}</p>
                        <p class="price">+$${label.getAttribute(
                          `data-${planDurationDisplay}`
                        )}/yr</p>
                   </li>`
        );
      }
      totalAddOn += +label.getAttribute(`data-${planDurationDisplay}`);
    }
  });
  if (addonsDisplay.innerHTML == "") {
    addonsDisplay.innerHTML = "<li>NO ADDONS SELECTED</li>";
    document.querySelector(".step4 .cart .addOnSelected li").style.display =
      "block";
    addonsDisplay.style.textAlign = "center";
  }
}

//
//
// PAGE NAVGATION
//
function pageSelector() {
  allSteps.forEach((step) => {
    let pageSelected = step.getAttribute("data-page");

    if (+pageSelected === page) {
      step.style.display = "grid";
    } else {
      step.style.display = "none";
    }
  });
}
function stepMap() {
  stepNav.forEach((elem) => {
    elem.classList.contains("stepSelected")
      ? elem.classList.remove("stepSelected")
      : null;

    if (+elem.innerText == page) {
      elem.classList.add("stepSelected");
    }
    if (page == 5) {
      elem.classList.add("stepSelected");
      elem.style.color = "rgb(1000,1000,1000)";
    }
  });
}
function nextFunc() {
  switch (page) {
    case 1:
      if (
        phoneNum === false ||
        validateName === false ||
        validateEmail === false
      ) {
        validateInput(validateName, nameInput);
        validateInput(validateEmail, mailInput);
        validateInput(phoneNum, phoneInput);
        return;
      }
      break;

    case 2:
      break;

    case 3:
      getPlanInfo(plans);
      totalAddOn = 0;
      selectedAddons();
      totalCost.innerText =
        planDurationDisplay == "Monthly"
          ? "$" + eval(Number(totalAddOn) + Number(storePrice)) + "/mo"
          : "$" + eval(Number(totalAddOn) + Number(storePrice)) + "/Yr";
      break;

    case 4:
      break;

    default:
      break;
  }
  page += 1;
  pageSelector();
  stepMap();
}
function backFunc() {
  page -= 1;
  pageSelector();
  stepMap();
}
function confirmFunc() {
  page = 5;
  pageSelector();
  stepMap();
}

//
//
// DISPLAY INFO
//

function getPlanInfo(plan) {
  storePlanLevel = plan.getAttribute("data-plan");
  if (checkBoxPlanDuration.checked == true) {
    storePrice = plan.getAttribute("data-yearPrice");
    planDurationDisplay = "Yearly";

    ServicePriceDisplay.innerText = `$${storePrice}/yr`;
    totalCostHeading.innerText = "Total (per Year)";
  } else {
    storePrice = plan.getAttribute("data-monthPrice");
    planDurationDisplay = "Monthly";
    ServicePriceDisplay.innerText = `$${storePrice}/mo`;
    totalCostHeading.innerText = "Total (per Month)";
  }
  ServiceNameDisplay.innerText = `${storePlanLevel}(${planDurationDisplay})`;
}

//
// VALIDATIONS
//
//

function validateInput(value, inputType) {
  if (value) {
    inputType.style.border = "1px solid hsl(130deg 99% 30%)";
  } else {
    inputType.style.border = "1px solid hsl(354, 84%, 57%)";
    return false;
  }
}
nameInput.addEventListener("input", () => {
  validateName = nameInput.value.length === 0 ? false : true;
  validateInput(validateName, nameInput);
});
mailInput.addEventListener("input", () => {
  validateEmail = mailInput.value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  validateInput(validateEmail, mailInput);
});
phoneInput.addEventListener("input", () => {
  if (phoneInput.value.match(/[0-9]{10}/) && phoneInput.value.length <= 10) {
    phoneNum = true;
  } else {
    phoneNum = false;
  }
  validateInput(phoneNum, phoneInput);
});

//
//
//
//
nextButton.forEach((btn) => {
  btn.addEventListener("click", nextFunc);
});
backButton.forEach((btn) => {
  btn.addEventListener("click", backFunc);
});
confirmBtn.forEach((btn) => {
  btn.addEventListener("click", confirmFunc);
});
plansList.forEach((elem) => {
  elem.addEventListener("click", () => {
    plansList.forEach((e) => {
      e.classList.remove("selectedPlan");
    });
    elem.classList.add("selectedPlan");
    plans = elem;
  });
});
addon1CheckBox.addEventListener("click", () => {
  if (addon1CheckBox.checked == true) {
    document
      .querySelector(".step3 ul li:nth-child(1) label")
      .classList.add("selectedPlan");
  } else {
    document
      .querySelector(".step3 ul li:nth-child(1) label")
      .classList.remove("selectedPlan");
  }
});
addon2CheckBox.addEventListener("click", () => {
  if (addon2CheckBox.checked == true) {
    document
      .querySelector(".step3 ul li:nth-child(2) label")
      .classList.add("selectedPlan");
  } else {
    document
      .querySelector(".step3 ul li:nth-child(2) label")
      .classList.remove("selectedPlan");
  }
});
addon3CheckBox.addEventListener("click", () => {
  if (addon3CheckBox.checked == true) {
    document
      .querySelector(".step3 ul li:nth-child(3) label")
      .classList.add("selectedPlan");
  } else {
    document
      .querySelector(".step3 ul li:nth-child(3) label")
      .classList.remove("selectedPlan");
  }
});
