import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { Navigation, RotateCcw } from "lucide-react";

const Directions = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const position = { lat: 51.1913, lng: 6.7941 };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const handleResetClick = () => {
    setButtonClicked(false);
    setOrigin("");
    setDestination("");
  };

  return (
    <div className="flex flex-col mx-auto items-center justify-center w-full h-full">
      <div>
        <h1 className="heroHeadText">Directions</h1>
      </div>
      {!buttonClicked && (
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Start"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-1/2 bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent mx-1 my-2"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-1/2 bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent mx-1 my-2"
          />
          <button
            onClick={handleButtonClick}
            className="flex text-text transition-transform justify-center items-center p-2 bg-transparent"
          >
            <Navigation className="border rounded-full p-1 hover:scale-150" />
          </button>
        </div>
      )}
      <div className="flex w-full h-2/3">
        {buttonClicked && (
          <div className="flex flex-col w-full h-full">
            <APIProvider apiKey={!API_KEY ? "" : API_KEY}>
              <Map center={position} zoom={15} fullscreenControl={false}>
                <RouteDirection origin={origin} destination={destination} />
              </Map>
            </APIProvider>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                className="flex text-text disabled:cursor-not-allowed hover:scale-105 transition-transform p-4 border justify-center items-center rounded-md w-1/2 bg-primary"
                onClick={handleResetClick}
              >
                <RotateCcw className="text-text mr-2" /> Reset Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function RouteDirection({ origin, destination }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="right-2 top-2 absolute text-text backdrop-blur-3xl p-2 border rounded-lg">
      <h2 className="text-2xl font-bold">
        {"Route " + routeIndex + ": " + selected.summary}
      </h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Duration: {leg.duration?.text}</p>
      <br />
      <h2>Other Routes available: </h2>
      <ul>
        {routes.map((route, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-primary"
            onClick={() => setRouteIndex(index)}
          >
            {"Route " +
              index +
              ": " +
              route.summary +
              " " +
              route.legs[0].duration?.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Directions;
