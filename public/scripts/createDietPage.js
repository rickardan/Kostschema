"use strict"

let data = {
    dietpageName: "",
    nrOfMeals: 0,

    mealtest: { mealNumber: "abc", name: "def", amount: 21 },
    mealsArr: [],
    printMealArray: function () {
        console.log("Planname: " + this.dietpageName);
        for (const meal of this.mealsArr) {
            console.log(meal);
        }
    },
}

let pageRefs = {
    nav: document.querySelector(".nav"),
    card: document.querySelector(".card"),
    container: document.querySelector(".container"),
    form: document.querySelector("form"),
}


window.addEventListener("load", () => {

    // Add Meal button
    document.getElementById("addMealToPlan").addEventListener("click", createMealTable);

    pageRefs.form.addEventListener("submit", function () {
        //event.preventDefault();

    })
})



function createMealTable() {

    data.nrOfMeals++;

    // Create Table
    const fullTable = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    fullTable.classList = "table";
    fullTable.setAttribute("id", data.nrOfMeals);

    // Table Header
    const mealNameSpan = document.createElement("span");
    mealNameSpan.innerHTML = "Mål " + data.nrOfMeals;

    // Addfood Row/col
    const foodButtonRow = document.createElement("div");
    foodButtonRow.classList = "row";
    const foodButtonCol = document.createElement("div");
    foodButtonCol.classList = "col d-flex justify-content-center";
    // Addfood button
    const addFoodToMealBtn = document.createElement("button");
    addFoodToMealBtn.setAttribute("type", "button");
    addFoodToMealBtn.setAttribute("id", "addFoodToMeal");
    addFoodToMealBtn.innerHTML = "+++++";
    addFoodToMealBtn.classList = "btn btn-success btn-sm m-0 p-0";
    // Append Foodbutton
    foodButtonCol.appendChild(addFoodToMealBtn);
    foodButtonRow.appendChild(foodButtonCol);

    // Append Table
    fullTable.appendChild(tableHead);
    fullTable.appendChild(tableBody);
    fullTable.appendChild(foodButtonRow);
    tableHead.appendChild(mealNameSpan);
    pageRefs.form.insertBefore(fullTable, document.querySelector(".addMealRow"));

    // EventListeners
    addFoodToMealBtn.addEventListener("click", () => {

        let aTable = createSearchMealRow();
        let finishedTable;
        const searchInput = aTable.querySelector('input');
        const deleteButton = aTable.querySelector('#removefoodgroup');

        tableBody.appendChild(aTable);

        //  SearchBar
        searchInput.addEventListener("change", () => {

            finishedTable = createFinishedMealRow(searchInput.value);
            const deleteButtonFinish = finishedTable.querySelector("#removefoodgroup");

            tableBody.removeChild(aTable);
            tableBody.appendChild(finishedTable);

            // Deletebutton Row
            deleteButtonFinish.addEventListener("click", () => {
                tableBody.removeChild(deleteButtonFinish.closest("tr"));
            })
        })
        // Deletebutton Row
        deleteButton.addEventListener("click", () => {
            tableBody.removeChild(deleteButton.closest("tr"));
        })
    })
}

function createSearchMealRow() {

    // Row / Divs
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    const mainDiv = document.createElement("div");
    mainDiv.classList = "input-group input-group-sm";
    const nameDiv = document.createElement("div");
    nameDiv.classList = "input-group-prepend";

    // Name Span
    const nameSpan = document.createElement("span");
    nameSpan.classList = "input-group-text";
    nameSpan.setAttribute("id", "inputGroup-sizing-sm"); // ID For label

    // Search img
    const searchImg = document.createElement("img");
    searchImg.setAttribute("src", "/public/images/search.svg");
    nameSpan.appendChild(searchImg);

    // SearchBar
    const searchInput = document.createElement("input");
    searchInput.classList = "form-control";
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("aria-label", "foodSearch");
    searchInput.setAttribute("aria-describedby", "inputGroup-sizing-sm");

    // Remove button
    const btnRemove = document.createElement("button");
    btnRemove.classList = "btn btn-danger btn-sm";
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("id", "removefoodgroup");
    btnRemove.innerHTML = "-";

    // Append tableBody -> tableRow -> mainDiv -> searchInput / nameDiv / btnRemove -> nameSpan
    tableRow.appendChild(mainDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(searchInput);
    mainDiv.appendChild(btnRemove);
    nameDiv.appendChild(nameSpan);

    return tableRow;
}

function createFinishedMealRow(foodName) {

    // Row / Divs
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    const mainDiv = document.createElement("div");
    mainDiv.classList = "input-group input-group-sm";
    const nameDiv = document.createElement("div");
    nameDiv.classList = "input-group-prepend";

    // Name Span
    const nameSpan = document.createElement("span");
    nameSpan.classList = "input-group-text foodNameNode";
    nameSpan.setAttribute("id", "inputGroup-sizing-sm"); // ID For label
    const nameText = document.createTextNode(foodName);
    nameSpan.appendChild(nameText);
    // Name Input Hidden
    const nameInput = document.createElement("input");
    nameInput.setAttribute("name", "foodname");
    nameInput.setAttribute("value", foodName);
    nameInput.hidden = true;

    // Amount input
    const amountInput = document.createElement("input");
    amountInput.classList = "form-control amountNode";
    amountInput.setAttribute("type", "text");
    amountInput.setAttribute("aria-label", "foodAmount");
    amountInput.setAttribute("aria-describedby", "inputGroup-sizing-sm");
    amountInput.setAttribute("placeholder", "gram");
    amountInput.setAttribute("name", "amount");
    amountInput.setAttribute("value", "");

    // Remove button
    const btnRemove = document.createElement("button");
    btnRemove.classList = "btn btn-danger btn-sm";
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("id", "removefoodgroup");
    btnRemove.innerHTML = "-";

    // Append tableBody -> tableRow -> mainDiv -> searchInput / nameDiv / btnRemove -> nameSpan
    tableRow.appendChild(mainDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(amountInput);
    mainDiv.appendChild(btnRemove);
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(nameInput);

    return tableRow;
}

function saveDataFromPlan() {

    // Title
    data.dietpageName = document.getElementById("mealplanTitle").value;

    // Get/Send table
    const meals = document.querySelectorAll(".table");

    for (let i = 0; i < data.nrOfMeals; i++) {

        data.mealsArr[i] = getDataFromTableArr(meals[i]);
    }

    // Print console
    //data.printMealArray();
}

// pre: table element
// post: return array with name/amount as objects
function getDataFromTableArr(table) {

    // Row data
    const nameEle = table.querySelectorAll(".foodNameNode");
    const amountEle = table.querySelectorAll(".amountNode");
    // Full meal data
    let rowDataArr = [];

    for (let i = 0; i < nameEle.length; i++) {

        rowDataArr[i] = { mealNumber: table.id, name: nameEle[i].firstChild.data, amount: amountEle[i].value }
    }

    return rowDataArr;
}