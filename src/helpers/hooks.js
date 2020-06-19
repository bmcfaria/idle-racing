import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  experienceRaceSelector,
  experienceMechanicSelector,
  experienceBusinessSelector,
} from '../state/selectors';
import { buffValue, discountValue } from './utils';

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

  return (
    Math.floor((width - 2 * 24) / (cardWidth + cardMargin)) *
    (cardWidth + cardMargin)
  );
};

export const useCarPriceWithDiscount = price => {
  const experience = useSelector(experienceBusinessSelector);

  return discountValue(price, experience.newCars);
};

export const useCarPriceWithBuff = price => {
  const experience = useSelector(experienceBusinessSelector);

  return buffValue(price, experience.usedCars);
};

export const useRacePrizesWithBuff = prizes => {
  const experience = useSelector(experienceRaceSelector);

  return prizes.map(prize => buffValue(prize, experience.prizes));
};

export const useRacePriceWithDiscount = price => {
  const experience = useSelector(experienceRaceSelector);

  return discountValue(price, experience.price);
};

export const useUpgradePriceWithDiscount = (price, type) => {
  const experience = useSelector(experienceMechanicSelector);

  return discountValue(price, experience[type]);
};
