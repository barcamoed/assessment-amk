import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Homepage/Homepage';
import PlaceDetailPage from '../pages/PlaceDetailPage/PlaceDetailPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/place/:id" element={<PlaceDetailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
