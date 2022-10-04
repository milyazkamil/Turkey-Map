const tooltip = document.querySelector(".tooltip");
const cities = document.querySelectorAll(".city");

const cityPopup = document.querySelector(".cityPopup");
const cityPopupBackground = document.querySelector(".cityPopupBackground");

const cityPhoto = document.querySelector(".cityPhoto");
const cityName = document.querySelector(".cityName");
const cityInformation = document.querySelector(".cityInformation");
const cityArea = document.querySelector(".cityArea");
const cityPopulation = document.querySelector(".cityPopulation");
const cityCarPlate = document.querySelector(".cityCarPlate");
const townList = document.querySelector(".townList");

const townPopup = document.querySelector(".townPopup");
const townPopupBackground = document.querySelector(".townPopupBackground");

const townName = document.querySelector(".townName");
const townInformation = document.querySelector(".townInformation");
const townPopulation = document.querySelector(".townPopulation");

//The information in the city-town.json file has been retrieved and made available.
async function getInformation() {
    const response = await fetch("city-town.json");
    const responseJson = await response.json();
    const citiesInJson = responseJson.city; 

//When any of the 81 cities on the site is clicked, the following structure will work.
    cities.forEach((city) => {
        city.addEventListener("click", function() {

            cityPhoto.setAttribute("src", this.dataset.photo);
            cityName.innerText = this.dataset.title;

            for(let x = 0; x < 81; x++){
                if(cityName.innerText === citiesInJson[x].cityName){
                    cityInformation.innerText = citiesInJson[x].information;
                
                    cityArea.innerText = `Bölge: ${citiesInJson[x].region}`;
                    cityPopulation.innerText = `Güncel Nüfus: ${citiesInJson[x].population}`;
                    cityCarPlate.innerText = `Plaka: ${citiesInJson[x].carPlate}`;

                    //Thanks to the code below, when the cities are clicked, the towns within the cities become a button.
                    citiesInJson[x].town.forEach((element) => {
                        const button = document.createElement("button");
                        button.innerHTML = element.townName;
                        button.className= "button";
                        townList.append(button);


                        button.addEventListener("click", function() {

                            citiesInJson[x].town.forEach((element) => {

                                if(button.innerHTML === element.townName){
                                    townName.innerHTML = element.townName;
                                    townInformation.innerHTML = element.information;
                                    townPopulation.innerHTML = `Güncel Nüfus: ${element.population}`;
                                };

                            });
                            townPopupBackground.classList.add("active");
                        });

                    });
                    break;
                }
            };
            cityPopupBackground.classList.add("active");
        });

        //While navigating on the map, the name of each city appears.
        city.addEventListener("mousemove", function(event) {
            tooltip.innerText = this.dataset.title;
            tooltip.style.top = (event.y + 20) + "px";
            tooltip.style.left = (event.x + 20) + "px";
        });

        city.addEventListener("mouseenter", function() {
            tooltip.style.display = "block";
        });

        city.addEventListener("mouseleave", function() {
            tooltip.style.display = "none";
        });
    });
};

getInformation();

//It allows the popup to close when clicked on a place other than the popup.
document.addEventListener("click", (event) => {
    if(event.target === cityPopupBackground){
        cityPopupBackground.classList.remove("active");
        townList.innerHTML = "";
        cityPhoto.innerHTML = "";
    }
});

document.addEventListener("click", (event) => {
    if(event.target === townPopupBackground){
        townPopupBackground.classList.remove("active");
    }
});
