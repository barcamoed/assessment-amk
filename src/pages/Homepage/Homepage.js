/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { fetchPlaces } from '../../services/api';
import { handlePlaces } from '../../services/api';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    const fetchAndSetPlaces = async () => {
      try {
        const data = fetchPlaces();
        dispatch(handlePlaces(data));
      } catch (error) {
        console.error('Failed to fetch places', error);
      }
    };

    fetchAndSetPlaces();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/place/${id}`);
  };

  return (
    <div className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
      <h1 className="mt-10 text-center mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Historical Places Assessment
      </h1>

      <div className="grid grid-cols-1 gap-4 ml-16 mr-16">
        <p className="lg:ml-24 lg:mr-16 text-left mb-3 text-gray-500 dark:text-gray-400">
          Track work across the enterprise through an open, collaborative
          platform. Link issues across Jira and ingest data from other software
          development tools, so your IT support and operations teams have richer
          contextual information to rapidly respond to requests, incidents, and
          changes.
        </p>
      </div>

      <div className="flex flex-row gap-6 flex-wrap items-stretch place-content-center">
        {places && places.length > 0 ? (
          places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onViewDetail={handleViewDetail}
            />
          ))
        ) : (
          <p className="ml-16 mr-16 text-left mb-3 text-gray-500 dark:text-gray-400">
            No Places found
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
