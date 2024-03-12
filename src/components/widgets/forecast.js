

function ForecastWidget({ data }) {
    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (

        <div className="container">
            <div className="row">
                {data.list.splice(0, 7).map((item, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 d-flex justify-content-center align-items-center">
                        <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" style={{ width: "50px" }}/>
                            <div className="card-body">
                                
                                    
                            <h5 className="card-title">{forecastDays[idx]}</h5>
                            <p className="card-text">{item.weather[0].description}</p>
                            <p className="card-text">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</p>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default ForecastWidget;