'use strick'

let cities = [
    {
        selectName:"KHOURIBGA",
        name:"Khouribga",
    },
    {
        selectName:"CASABLANCA",
        name:"Casablanca",
    },
    {
        selectName:"RABAT",
        name:"Rabat",
    },
    {
        selectName:"MEKNES",
        name:"Meknès",
    },
    {
        selectName:"El Jadida",
        name:"El Jadida",
    },
];

for (city of cities) {
    const content = `
        <option values="" id= "">${city.selectName}</option>
    `
    document.getElementById("cities-select").innerHTML += content;
}

document.getElementById("cities-select").addEventListener("change", function(){ 
    document.getElementById("city-name").innerHTML = this.value;
    let cityName = "";
    // let values = document.getElementById("cities-select").value;
    for(let citySa of cities){
        if(citySa.selectName == this.value){
            cityName = citySa.name
        }
    }
    getPrayerTiming(cityName)
    console.log(this.value);
})

document.getElementById("city-name")

function fillTimerForPrayer(id, time){
    document.getElementById(id).innerHTML = time;
}

function getPrayerTiming(cityName){
    let params = {
        country: "MA",
        city: cityName
    }
axios.get("http://api.aladhan.com/v1/timingsByCity", {
    params: params
    })
    .then(function (response) {
    const timings = response.data.data.timings;
    const readableDay = response.data.data.date.readable;
    const week = response.data.data.date.hijri.weekday.en;
    const date = week + " " + readableDay
    fillTimerForPrayer("fajr-time", timings.Fajr)
    fillTimerForPrayer("imsak-time", timings.Imsak)
    fillTimerForPrayer("duhr-time", timings.Dhuhr)
    fillTimerForPrayer("assr-time", timings.Asr)
    fillTimerForPrayer("magereb-time", timings.Maghrib)
    fillTimerForPrayer("aichaa-time", timings.Isha)

    document.getElementById("date").innerHTML = date
    // console.log(response.data.data.date.readable);
    // console.log(response.data.data.date.hijri.weekday.en);
})
.catch(function (error) {
    console.log(error);
})
}

getPrayerTiming("Khouribga")
