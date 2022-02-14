const key ='A2oOuxXutyeHySIr7YCmWIPmvFSprbSD';

const getWeather = async (id) =>{
   const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
   const qeury = `${id}?apikey=${key}`;

   const response =  await fetch(base + qeury);
   const data = await response.json();
   return data[0];
};

// city information 
 const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
 };

 
