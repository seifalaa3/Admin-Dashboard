const dateTime = document.querySelector("main input[type='date']");
const statistics = document.querySelector(".statistics");
const sales_card = document.querySelector(".statistics #sales-no");
const expensess_card = document.querySelector(".statistics  #expensess-no");
const income_card = document.querySelector(".statistics #income-no");
const sales_percentage = document.querySelector(".statistics #sale-percentage");
const exp_percentage = document.querySelector(".statistics #exp-percentage");
const income_percentage = document.querySelector(
  ".statistics #income-percentage",
);
const sale_chart = document.querySelector(".statistics .chart svg .sales");
const exp_chart = document.querySelector(".statistics .chart svg .expensess ");
const income_chart = document.querySelector(".statistics .chart svg .income");
const table = document.querySelector("table tbody");
const Recent_updates = document.querySelector(".recent-updates .updates");
const online_analytics = document.querySelector(".sales .online .sale-info ");
const offline_analytics = document.querySelector(".sales .offline .sale-info ");
const customer_analytics = document.querySelector(
  ".sales .customer .sale-info ",
);

async function statisticsData(date) {
  let data = await jsonData();

  const sales = data.statistics.sales;
  const expenses = data.statistics.expenses;
  const income = data.statistics.income;

  const selectedsales = sales.find((e) => {
    return e.date === date;
  });
  const selectedexp = expenses.find((e) => {
    return e.date === date;
  });
  const selectedincome = income.find((e) => {
    return e.date === date;
  });
  const sale_r = +sale_chart.getAttribute("r");
  const exp_r = +exp_chart.getAttribute("r");
  const income_r = +income_chart.getAttribute("r");

  const sale_circule = 2 * Math.PI * sale_r;
  const exp_circule = 2 * Math.PI * exp_r;
  const income_circule = 2 * Math.PI * income_r;

  if (!selectedsales || !selectedexp || !selectedincome) {
    sales_card.textContent = `$ 0`;
    expensess_card.textContent = `$ 0`;
    income_card.textContent = `$ 0`;
    sales_percentage.textContent = `0%`;
    exp_percentage.textContent = `0%`;
    income_percentage.textContent = `0%`;
    sale_chart.style.strokeDashoffset = sale_circule;
    exp_chart.style.strokeDashoffset = exp_circule;
    income_chart.style.strokeDashoffset = income_circule;
  } else {
    sales_card.textContent = `$${selectedsales.amount}`;
    expensess_card.textContent = `$${selectedexp.amount}`;
    income_card.textContent = `$${selectedincome.amount}`;
    sales_percentage.textContent = `${selectedsales.percentage}%`;
    exp_percentage.textContent = `${selectedexp.percentage}%`;
    income_percentage.textContent = `${selectedincome.percentage}%`;

    const sale_dashoffset =
      sale_circule - (selectedsales.percentage / 100) * sale_circule;
    const exp_dashoffset =
      exp_circule - (selectedexp.percentage / 100) * exp_circule;
    const income_dashoffset =
      income_circule - (selectedincome.percentage / 100) * income_circule;

    sale_chart.style.strokeDasharray = sale_circule;
    exp_chart.style.strokeDasharray = exp_circule;
    income_chart.style.strokeDasharray = income_circule;

    sale_chart.style.strokeDashoffset = sale_dashoffset;
    exp_chart.style.strokeDashoffset = exp_dashoffset;
    income_chart.style.strokeDashoffset = income_dashoffset;
  }
}

async function recentOrders(date) {
  let data = await jsonData();
  const orders = data.recentOrders;
  const selectedOrders = orders.filter((e) => {
    return e.date === date;
  });
  table.innerHTML = "";
  selectedOrders.forEach((e) => {
    table.innerHTML += `
            <tr>
                <td>${e.productName}</td>
                <td>${e.productNumber}</td>
                <td>${e.payment}</td>
                <td class="${e.status}">${e.status}</td>
                <td><a href="#">details</a></td>
                `;
  });
}

async function recentUpdates(date) {
  let data = await jsonData();

  const updates = data.recentUpdates;

  const seletedUpdate = updates.filter((e) => {
    return e.date === date;
  });

  Recent_updates.innerHTML = "";
  seletedUpdate.forEach((e) => {
    Recent_updates.innerHTML += `
            <div class="update">
                <div class="user-prof">
                        <img src="${e.image}">
                </div>
                <div class="user-update">
                    <p><b>${e.name}</b> ${e.message}</p>
                    <small>${e.time}</small>
                </div>
            </div>
        `;
  });
}

async function salesAnalytics(date) {
  let data = await jsonData();


  const online = data.salesAnalytics.onlineOrders;
  const offline = data.salesAnalytics.offlineOrders;
  const customers = data.salesAnalytics.newCustomers;

  const selected_online = online.filter((e) => {
    return e.date === date;
  });
  const selected_offline = offline.filter((e) => {
    return e.date === date;
  });
  const selected_customers = customers.filter((e) => {
    return e.date === date;
  });

  online_analytics.innerHTML = "";
  offline_analytics.innerHTML = "";
  customer_analytics.innerHTML = "";

  selected_online.forEach((e) => {
    online_analytics.innerHTML += `
            <div class="sale-type">
                <p>online order</p>
                <small>${e.period}</small>
            </div>
            <p class="percentage ${e.trend}">${e.percentage}%</p>
            <p class="orders-count">${e.orders}</p>
        `;
  });
  selected_offline.forEach((e) => {
    offline_analytics.innerHTML += `
            <div class="sale-type">
                <p>online order</p>
                <small>${e.period}</small>
            </div>
            <p class="percentage ${e.trend}">${e.percentage}%</p>
            <p class="orders-count">${e.orders}</p>
        `;
  });
  selected_customers.forEach((e) => {
    customer_analytics.innerHTML += `
            <div class="sale-type">
                <p>online order</p>
                <small>${e.period}</small>
            </div>
            <p class="percentage ${e.trend}">${e.percentage}%</p>
            <p class="orders-count">${e.orders}</p>
        `;
  });
}

dateTime.value = "2026-09-21";
statisticsData(dateTime.value);
recentOrders(dateTime.value);
recentUpdates(dateTime.value);
salesAnalytics(dateTime.value);

dateTime.addEventListener("change", () => {
  statisticsData(dateTime.value);
  recentOrders(dateTime.value);
  recentUpdates(dateTime.value);
  salesAnalytics(dateTime.value);
});
