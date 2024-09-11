import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';

function App() {
  const [places, setPlaces] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch('https://api.example.com/historical-places');
      const data = await response.json();
      setPlaces([data]);
    };

    fetchPlaces();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/place/${id}`);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Historical Places</h1>

      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Choose a place:
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {places.map((place) => (
          <li key={place.id}>
            <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={place.image}
                  alt={place.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {place.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {place.description}
                </p>
                <button
                  onClick={() => handleViewDetail(place.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Detail
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlaceDetail({ id }) {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      const response = await fetch(
        `https://api.example.com/historical-places/${id}`
      );
      const data = await response.json();
      setPlace(data);
    };

    fetchPlaceDetail();
  }, [id]);

  if (!place) return <div>Loading...</div>;

  return (
    <div>
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} />
      <p>{place.description}</p>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
