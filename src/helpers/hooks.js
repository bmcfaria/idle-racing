import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import {
  experienceRaceSelector,
  experienceMechanicSelector,
  experienceBusinessSelector,
} from '../state/selectors';
import { buffValue, discountValue, capitalize } from './utils';

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

export const useCurrentPage = () => {
  const matchGarage = useRouteMatch('/garage');
  const matchDealerBrand = useRouteMatch('/dealer/:brand');
  const matchDealer = useRouteMatch('/dealer');
  const matchRaceEvent = useRouteMatch('/race/:event');
  const matchRace = useRouteMatch('/race');
  const matchSettings = useRouteMatch('/settings');

  let selectedPage;
  selectedPage = matchGarage ? 'Garage' : selectedPage;
  selectedPage = matchDealer ? 'Dealer' : selectedPage;
  selectedPage = matchDealerBrand
    ? '/' + capitalize(matchDealerBrand?.params?.brand)
    : selectedPage;
  selectedPage = matchRace ? 'Race' : selectedPage;
  selectedPage = matchRaceEvent
    ? '/' + capitalize(matchRaceEvent?.params?.event)
    : selectedPage;
  selectedPage = matchSettings ? 'Settings' : selectedPage;

  const backPage =
    (matchDealerBrand && '/dealer') || (matchRaceEvent && '/race') || '/';

  return { name: selectedPage, back: backPage };
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
  const experience = useSelector(experienceBusinessSelector, shallowEqual);

  return discountValue(price, experience.newCars);
};

export const useCarPriceWithBuff = price => {
  const experience = useSelector(experienceBusinessSelector, shallowEqual);

  return buffValue(price, experience.usedCars);
};

export const useRacePrizesWithBuff = prizes => {
  const experience = useSelector(experienceRaceSelector, shallowEqual);

  return prizes.map(prize => buffValue(prize, experience.prizes));
};

export const useRacePriceWithDiscount = price => {
  const experience = useSelector(experienceRaceSelector, shallowEqual);

  return discountValue(price, experience.price);
};

export const useUpgradePriceWithDiscount = (price, type) => {
  const experience = useSelector(experienceMechanicSelector, shallowEqual);

  return discountValue(price, experience[type]);
};
