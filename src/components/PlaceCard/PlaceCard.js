/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handlePlaces } from '../../services/api';

function PlaceCard({ place, onViewDetail }) {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  const handleClick = (place) => {
    onViewDetail(place.id);
  };

  const findVisited = (id) => {
    const item = JSON.parse(localStorage.getItem('visited_place')) || [];
    const visitedPlace = item.find((i) => i.id == id);
    return visitedPlace ? true : false;
  };

  const markVisited = (place) => {
    const existing_visited =
      JSON.parse(localStorage.getItem('visited_place')) || [];
    const updatedPlaces =
      places &&
      places.length > 0 &&
      places.map((item) => {
        if (item.id === place.id) {
          localStorage.setItem(
            'visited_place',
            JSON.stringify([...existing_visited, { ...item, isVisited: true }])
          );
          return { ...item, isVisited: true };
        }
        return item;
      });
    dispatch(handlePlaces(updatedPlaces));
  };

  const unMarkVisited = (place) => {
    const existing_visited =
      JSON.parse(localStorage.getItem('visited_place')) || [];
    const updatedPlaces =
      places &&
      places.length > 0 &&
      places.map((item) => {
        if (item.id === place.id) {
          const filteredVisited = existing_visited?.filter(
            (item) => item.id !== place.id
          );
          // @Todo - this is temporary, because redux is not persistent 
          localStorage.setItem(
            'visited_place',
            JSON.stringify([...filteredVisited])
          );
          return { ...item, isVisited: false };
        }
        return item;
      });
    dispatch(handlePlaces(updatedPlaces));
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleClick(place);
        }}
      >
        <img
          className="rounded-t-lg object-cover w-full h-48"
          src={place.image_url || '/assets/images/placeholder.jpg'}
          alt={place.name}
        />
      </a>
      <div className="p-5">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick(place);
          }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {place.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {place.description}
        </p>
        <div class="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
          {findVisited(place.id) ? 'VISITED' : 'POPULAR'}
        </div>
        <div class="flex justify-start space-x-4">
          <button
            onClick={() => handleClick(place)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          {!findVisited(place.id) && (
            <button
              onClick={() => markVisited(place)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Mark as Visited
            </button>
          )}
          {findVisited(place.id) && (
            <button
              onClick={() => unMarkVisited(place)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {'Unmark as Visited'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

PlaceCard.defaultProps = {
  place: {
    id: 1,
    name: 'Unknown Place',
    description: 'No description available for this place.',
    image: '/assets/images/placeholder.jpg',
  },
  onViewDetail: (id) => {
    console.log(`Viewing details for place with id: ${id}`);
  },
};

export default PlaceCard;
