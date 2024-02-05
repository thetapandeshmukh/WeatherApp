const timeCalc=(dt)=>{
    const dateTime=new Date(dt*1000);
    const hour =dateTime.getHours();
    return hour
}


export function Hourly({hourlyData}){
    return <div class="flex justify-around w-max mx-2">
        {hourlyData.map((hour)=>{
            return<div class="mx-3">
                <div class="text-center text-white">{timeCalc(hour.dt)}:00</div>
                <img class="w-11/12"src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}></img>
                <div class="text-center text-white">{Math.round(hour.main.temp - 273.15)}°C</div>
            </div>
        })}
    </div>
}
