// ==============================
// 🌱 Sélection des éléments
// ==============================

const wrapper = document.querySelector(".wrapper");
const button_month = document.querySelector(".button_month");
const exitDetails = document.querySelector(".exitDetails");
const dateInput = document.querySelector(`[type="month"]`);
const datebtn = document.querySelector(".send");

// ==============================
// 🌍 Variables globales
// ==============================

let calendar = [];
let date = new Date();
const today = new Date();


// ==============================
// 🎊 Fonctionnalités
// ==============================

async function getpicture(start_date, end_date) {
	try {
		const response = await fetch(`https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=fkQZ88kw2aUH6J1bC6cQgXjvm9OPlAPMaTEdnwbs`);
	    const data = await response.json();
		console.log(data);
		return (data);
	}
	catch (error) {
        console.error('Erreur :', error);
    }
}

async function getEarth(year, month, day) {
	try {
		const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=fkQZ88kw2aUH6J1bC6cQgXjvm9OPlAPMaTEdnwbs`);
	    let data = await response.json();
		console.log(data);
		// const responseImg = await fetch(`https://api.nasa.gov/EPIC/archive/natural/2019-05-30/png/${data[0].image}.png?api_key=fkQZ88kw2aUH6J1bC6cQgXjvm9OPlAPMaTEdnwbs`);
	    // data = await responseImg.json();
		// console.log(data);
		return (data);
	}
	catch (error) {
        console.error('Erreur :', error);
    }
}

function getNbDay(year, month) {
    const dayInMonth = new Date(year, month, 0).getDate();
    return (dayInMonth);
}

function printDailyPic(data) {
    wrapper.innerHTML = '';
    data.forEach((element, index) => {
        const div = document.createElement("div");
        div.classList.add("picture");
        div.classList.add(element.date); // surement useless
        div.dataset.id = index;
        if (element.media_type === "image"){
            div.innerHTML = `
            <img src=${element.url} alt="">
            `
        }
        else {
            div.classList.add("empty");
        }
        div.innerHTML += `<div class="date">${element.date}</div>`
        wrapper.append(div);
    });
}

function checkDate() {
    if (today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth()) {
        return (today.getDay() +1);
    }
    return (getNbDay(date.getFullYear(), (date.getMonth() + 1)));
}

function createdate(start){
    let tmpDate = [];
    tmpDate.push(date.getFullYear());
    tmpDate.push((date.getMonth() + 1));
    if (start) {
        tmpDate.push(1);
    }
    else {

        tmpDate.push(checkDate());
    }
    return (tmpDate.join("-"));
}

async function init() {
    const data = await getpicture(createdate(1), createdate(0));
    calendar = data;
    exitDetails.disabled = true;
    printDailyPic(data);
}

function createDetails(id) {
    const pic = calendar[id];
    const div = document.createElement("div");
    div.classList.add("details");
    let orientation;
    const img = new Image();
    img.src = pic.hdurl;
    img.onload = () => {
        orientation = (img.width > img.height) ? "horizontal" : "vertical";
        div.classList.add(orientation);
        const divImg = document.createElement("div");
        divImg.classList.add("img");
        divImg.append(img);
        div.append(divImg);
        div.innerHTML += `
        <div class="txt">
        <div class="details__header">
        <div class="title">${pic.title}</div>
        <div class="details__date">${pic.date}</div>
        </div>
        <div class="explanation">${pic.explanation}</div>
        </div>
        `
        wrapper.append(div);
    };
    exitDetails.disabled = false;
}

function checkMaxDate(year, month) {
    if (year > today.getFullYear() || year < 1996) {
        return (0);
    }
    else if (year == today.getFullYear() && Number(month) > (today.getMonth() + 1)) {
        return (0);
    }
    else {
        return (1);
    }
}

function formatMonthInput(month) {
    return (month < 10) ? ("0" + month) : month;
}

// ==============================
// 🧲 Événements
// ==============================

init()

datebtn.addEventListener("click", (e) => {
    e.preventDefault();
    const dateUser = dateInput.value.split("-")
    if (checkMaxDate(dateUser[0], dateUser[1])) {
        date.setMonth((Number(dateUser[1]) - 1))
        date.setFullYear(dateUser[0])
        init();
    }
})

wrapper.addEventListener("click", (e) => {
    const target = e.target.closest(".picture");
    if (target) {
        createDetails(target.dataset.id);
    }
})

button_month.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.matches("button")) {
        const tmpDate = new Date(date.valueOf());
        switch (e.target.className) {
            case("previous") : {
                tmpDate.setMonth(tmpDate.getMonth() - 1);
                if (checkMaxDate(tmpDate.getFullYear(), tmpDate.getMonth() - 1)) {
                    date = tmpDate;
                    dateInput.value = `${tmpDate.getFullYear()}-${formatMonthInput(tmpDate.getMonth() + 1)}`
                    init();
                }
                break;
            }
            case("next") : {
                tmpDate.setMonth(tmpDate.getMonth() + 1);
                if (checkMaxDate(tmpDate.getFullYear(), tmpDate.getMonth() + 1)) {
                    date = tmpDate;
                    dateInput.value = `${tmpDate.getFullYear()}-${formatMonthInput(tmpDate.getMonth() + 1)}`
                    init();
                }
                break;
            }
        }
    }
})

exitDetails.addEventListener("click", () => {
    const targetdetails = document.querySelector(".details");
    if (targetdetails) {
        targetdetails.outerHTML = "";
        exitDetails.disabled = true;
    }
})

getEarth()
