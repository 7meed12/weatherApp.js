const sub = document.querySelector('.location');
const card = document.querySelector('.card');
const dets = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateCity = async (city) => {
    const locate = await getCity(city);
    const details = await getWeather(locate.Key);
    return {
        locate: locate,
        details: details
    };
};



const updateUI = (data) => {
    const locate = data.locate;
    const details = data.details;

    dets.innerHTML = `
        <h5 class="my-3">${locate.EnglishName}</h5>
        <div class="my-3 bg-muted">${details.WeatherText}</div>
        <div class="display-4 my-3">
            <span>${details.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        
    `;
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    // day/night img update 
    let imgSrc = details.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', imgSrc);

    //icon img update 
    let iconSrc = `img/icons/${details.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);



};



sub.addEventListener('submit', e => {
    e.preventDefault();
    const city = sub.city.value.trim();
    sub.reset();



    updateCity(city)
        .then(data => {
            updateUI(data)
        })
        .catch(err => console.log(err));
        sub.city.value=city;


    localStorage.setItem('city', city);


});

//checking the locale storage for old searches 

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data));
    sub.city.value=localStorage.getItem('city');
};