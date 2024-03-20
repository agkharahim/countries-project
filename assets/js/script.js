let main = document.querySelector('.main');
// url = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region" ;

function getCountries (url) {
    fetch(url).then( response => {
    // console.log(response);

    return response.json();
}).then(data => {
    // console.log(data);
    main.innerHTML = " "
    data.forEach(e => {
        // console.log(e);
        main.innerHTML += 
        `
        <div class="container">
        <a href="/detail.html?name=${e.name.common}"> 
            <div class="container_item">
                
                <div class="container_item_img">
                    <img src="${e.flags.png}" alt="${e.flags.alt}">
                </div>

                <div class="container_item_title">
                    ${e.name.common}
                </div>

                <div class="container_item_description">
                    <span>Population:</span> ${e.population}<br>
                    <span>Region:</span> ${e.region} <br>
                    <span>Capital:</span> ${e.capital[0]} <br>
                </div>
            </div>
            </a>
        </div>
        `
    }) 
})
};

getCountries("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region");

let search = document.querySelector('#search');

search.addEventListener("keyup", function() {
    console.log(search.value);
    if(search.value.length > 0){
        // url = `https://restcountries.com/v3.1/name/${search.value}`;
        getCountries(`https://restcountries.com/v3.1/name/${search.value}`);
    }
});

let filter = document.querySelector('#filter');

filter.addEventListener("change", function () {
    if (filter.value === "all") {
        getCountries("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region");
    }
    else {
        getCountries(`https://restcountries.com/v3.1/region/${filter.value}`);
    }
});

const dark = document.querySelector('#dark-mode');

dark.addEventListener("click", function (e) {
     let dark = localStorage.getItem("dark");
     if (dark === 'true' ) {
        localStorage.setItem('dark', false);
     }
     else {
        localStorage.setItem('dark',true);
     }
     document.body.classList.toggle('darkmode');
});

if (localStorage.getItem('dark') === true ) {
    document.body.classList.add('darkmode');
}
