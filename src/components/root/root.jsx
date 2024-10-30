import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/authContext';
import Home from '../home/home';
import './root.css';

const Root = () => {
  const [authError, setAuthError] = useState(null);
  const { currentUser, setAuthError: contextSetAuthError } = useAuth();

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        if (!currentUser) {
          console.log("Unable to fetch user information. Please try reloading the page.");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthError("An unexpected error occurred. Please try again later.");
        contextSetAuthError?.(error.message);
      }
    };

    checkAuthentication();
  }, [currentUser, contextSetAuthError]);

  if (currentUser) {
    return <Home />;
  }

  return (
    <main>
      <section className="hero-container bg-green-gr">
        <div className="left-hero text-dropshadow center-text">
          <h1 className="title">Bloom</h1>
          <p className="caption">
            Build a culture where people <em>grow</em>
          </p>
        </div>
      
        <div className="right-hero">
          <img 
            className="plant-img" 
            src="main_plant.png"
            alt="Decorative plant illustration representing growth"
          />
        </div>
      </section>

      <section className="hero-container bg-green-2">
        <div className="left-hero">
          <img 
            className="plant-img" 
            src="people_working.png"
            alt="Illustration of people collaborating and working together"
          />
        </div>
      
        <div className="padding-text right-hero center-text text-dropshadow">
          <h1 className="title">Enhance</h1>
          <p className="caption">
            Receive valuable feedback to address hidden areas for improvement
          </p>
        </div>
      </section>

      {authError && (
        <div className="error-message" role="alert">
          {authError}
        </div>
      )}
    </main>
  );
};

export default Root;