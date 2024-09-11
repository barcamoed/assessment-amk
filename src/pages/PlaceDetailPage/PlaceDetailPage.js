/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlaceById } from '../../services/api';

function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlace = async () => {
      const data = await fetchPlaceById(id);
      setPlace(data);
    };
    getPlace();
  }, [id]);

  if (!place) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 mt-10 ml-16 mr-16">
      <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="align-center">
          <button
            style={{ background: 'black' }}
            class="text-white mb-8 bg-black-500 border-0 py-2 px-6 focus:outline-none hover:bg-black-600 rounded"
            onClick={() => navigate('/')}
          >
            Back
          </button>
          <h1 className="text-center mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {place.name} Details
          </h1>
        </div>
        <p className="text-left mb-3 text-gray-500 dark:text-gray-400">
          {place.description} - `Historical places serve as remarkable landmarks
          that connect us to the past, offering a glimpse into the rich
          cultural, architectural, and societal heritage of a region. These
          sites often stand as witnesses to significant events, showcasing the
          evolution of human civilization through various eras. Visitors can
          explore ancient ruins, majestic palaces, centuries-old temples, and
          monuments that symbolize the achievements, struggles, and stories of
          those who came before us. Each historical site tells a unique story,
          reflecting the artistic, political, and technological advancements of
          its time. The architectural marvels, intricate carvings, and detailed
          inscriptions found at these locations provide invaluable insight into
          the traditions and lifestyles of earlier civilizations. Whether it’s a
          medieval fortress or an ancient city, these places inspire awe and
          reverence for the craftsmanship and vision that shaped our world.
          Beyond their educational value.`
        </p>
        <div class="container px-5 py-16 mx-auto">
          <div class="lg:w-full mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={
                place.image_url ||
                'https://www.whitmorerarebooks.com/pictures/medium/2465.jpg'
              }
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                Specific Details
              </h2>

              <p class="leading-relaxed">
                {place.description} - `Historical places serve as remarkable
                landmarks that connect us to the past, offering a glimpse into
                the rich cultural, architectural, and societal heritage of a
                region. These sites often stand as witnesses to significant
                events, showcasing the evolution of human civilization through
                various eras. Visitors can explore ancient ruins, majestic
                palaces, centuries-old temples, and monuments that symbolize the
                achievements, struggles, and stories of those who came before
                us. Each historical site tells a unique story, reflecting the
                artistic, political, and technological advancements of its
                time.`
              </p>
              <div class="flex"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlaceDetailPage;
