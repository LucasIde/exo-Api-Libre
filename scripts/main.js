// ==============================
// 🌱 Sélection des éléments
// ==============================

const wrapper = document.querySelector(".wrapper");

// ==============================
// 🌍 Variables globales
// ==============================

let calendar = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================

async function getpicture() {
	try {
		const response = await fetch(`https://api.nasa.gov/planetary/apod?start_date=2025-05-01&end_date=2025-05-31&api_key=fkQZ88kw2aUH6J1bC6cQgXjvm9OPlAPMaTEdnwbs`);
	    const data = await response.json();
		console.log(data);
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

async function init() {
    const data = await getpicture();
    calendar = data;
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
        div.innerHTML = `
        <div class="img"><img src="${pic.hdurl}" alt=""></div>
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
}

// ==============================
// 🧲 Événements
// ==============================
// init()
// getpicture()
// console.log(getNbDay(2025, 2));

wrapper.addEventListener("click", (e) => {
    const target = e.target.closest(".picture");
    if (target) {
        createDetails(target.dataset.id);
    }
})