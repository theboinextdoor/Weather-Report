const tempfield = document.querySelector(".weather1")
const cityfiled = document.querySelector(".weather2 p")
const datefield  = document.querySelector(".weather2 span")
const emojifield  = document.querySelector(".weather3 p img")
const weatherfield = document.querySelector(".weather3 span")
const searchfield = document.querySelector("#searchField")
const formfield = document.querySelector("#submit")


let target= "London";
const fetchData = async (target) =>{
    try{
        const url = `https://api.weatherapi.com/v1/current.json?key=6b1fb970cd804294a51102733231010&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();

        // console.log(data)

        // de-structuring the data form the json file which is basically on console
        const {
            current: { temp_c , condition: {text, icon} },
            location : {name, localtime},

        } = data
        updateDOM(temp_c, name,icon ,text, localtime)

    }catch (e) {
        alert("Location not found")
    }
}

function updateDOM(temp, city, icon, text , time){
    tempfield.innerText = temp+"°";
    cityfiled.innerText = city;
    emojifield.src = icon;
    weatherfield.innerText = text ;

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
    const day= getDayFullName(exactDay);
    datefield.innerText = `${exactTime}-${day} ${exactDate}`

};

fetchData(target);

function getDayFullName(num){
    switch(num){
        case 0:
            return "Monday";
        case 1:
            return "Tuesday";
        case 2:
            return "Wednesday";
        case 3:
            return "Thursday";
        case 4:
            return "Friday";
        case 5:
            return "Saturday";
        case 6:
            return "Sunday";
        default :
            return "Invalid Day";
    }
}

formfield.addEventListener("click", (e)=>{
    e.preventDefault();

    target = searchfield.value;
    // console.log(target);
    fetchData(target);
})

