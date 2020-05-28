import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const useOpenClose = defaultValue => {
  const [open, setOpen] = useState(!!defaultValue);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return [open, onOpen, onClose];
};

export const useCurrentPageName = () => {
  const matchGarage = useRouteMatch('/garage');
  const matchDealer = useRouteMatch('/dealer');
  const matchRace = useRouteMatch('/race');
  const matchSettings = useRouteMatch('/settings');

  let selectedPage;
  selectedPage = matchGarage ? 'Garage' : selectedPage;
  selectedPage = matchDealer ? 'Dealer' : selectedPage;
  selectedPage = matchRace ? 'Race' : selectedPage;
  selectedPage = matchSettings ? 'Settings' : selectedPage;

  return selectedPage;
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const useDynamicCardContainerWidth = (
  cardWidth = 160,
  cardMargin = 16
) => {
  const { width } = useWindowDimensions();

  return Math.floor((width - 2 * 24) / (160 + 16)) * (160 + 16);
};
