import { useEffect, useState } from "react";

// import './App.css'

function App() {
  const [loading, setLoading] = useState(false);
	const [weather,setWeather]=useState(null);
	const [location, setLocation] = useState("Bangalore");
  const [input,setInput]=useState("");
	// const [e,setE]=useState("");
	

	async function fetchWeather(){
		try {
			setLoading(true);
			 const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e8a7dab269d814bc70b503b0f731a10f`
       );
			 const data=await response.json();

			 if(data){
				console.log(data)
				setWeather(data);
				setLoading(false);
			 }
			
		} catch (error) {
			console.log(error);
			// setE(e.message)
			setLoading(false);
		}
	}

  // console.log(location)

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  

	useEffect(() => {    
    fetchWeather();
  }, [location]);
	
// if (weather === null) {
//   return (
//     <div>
//       <h1 className="font-bold">error</h1>
//     </div>
//   );
// }
 
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center  bg-lime-950">
        <div className="flex flex-col bg-white rounded p-4 w-full max-w-md  ">
          <div className="flex rounded-md overflow-hidden w-full mb-2  border border-slate-800">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              
              placeholder="Search Location..."
              className="w-full rounded-md rounded-r-none p-2 "
            />
            <button
              onClick={() => setLocation(input)}
              className="bg-indigo-600 text-white px-6 text-lg font-semibold py-3 rounded-r-md"
            >
              Go
            </button>
          </div>

          {loading ? (
            <div>
              <h1 className="font-bold">Loading...</h1>
            </div>
          ) : (
            <>
              <div className="font-bold text-xl">{weather?.name}, {weather?.sys?.country}</div>
              <div className="text-sm text-gray-500">{getCurrentDate()}</div>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <svg
                  className="w-32 h-32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">
                  {(weather?.main?.temp -273.15).toFixed(1)}c
                </div>
                <div className="flex flex-col items-center ml-6">
                  <div>{weather?.weather[0]?.description}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up"></i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {(weather?.main?.temp_max -273.15).toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down"></i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {(weather?.main?.temp_min -273.15).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">
                    {weather?.wind?.speed}k/h
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">
                    {weather?.main?.humidity}%
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Visibility</div>
                  <div className="text-sm text-gray-500">
                    {weather?.visibility / 1000}km
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
