import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Delay para permitir fade out suave
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
    setIsVisible(true);
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${isLoading ? 'active' : 'fade-out'}`}>
      <div className="loading-container">
        <div className="loading-logo">
          <span>RM</span>
        </div>
        <div className="loading-text">
          <p>Carregando seu portfólio</p>
        </div>
        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
