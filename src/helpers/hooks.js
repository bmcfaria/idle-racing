import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { experienceSelector } from '../state/selectors';
import {
  buffValue,
  discountValue,
  capitalize,
  expLevel,
  expNextLevel,
} from './utils';

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

export const useExperienceBusiness = () => {
  const experience = useSelector(experienceSelector);
  const { exp, max, newCars, usedCars } = experience.business;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - newCars - usedCars;

  return {
    ...experience.business,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};
export const useExperienceRace = () => {
  const experience = useSelector(experienceSelector);
  const { exp, max, price, prizes } = experience.race;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - price - prizes;

  return {
    ...experience.race,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};
export const useExperienceMechanic = () => {
  const experience = useSelector(experienceSelector);
  const { exp, max, acc, spd, hnd } = experience.mechanic;
  const level = expLevel(exp, max);
  const availablePoints = level - 1 - acc - spd - hnd;

  return {
    ...experience.mechanic,
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};

export const useCarPriceWithDiscount = price => {
  const experience = useExperienceBusiness();

  return discountValue(price, experience.newCars);
};

export const useCarPriceWithBuff = price => {
  const experience = useExperienceBusiness();

  return buffValue(price, experience.usedCars);
};

export const useRacePrizesWithBuff = prizes => {
  const experience = useExperienceRace();

  return prizes.map(prize => buffValue(prize, experience.prizes));
};

export const useRacePriceWithDiscount = price => {
  const experience = useExperienceRace();

  return discountValue(price, experience.price);
};

export const useUpgradePriceWithDiscount = (price, type) => {
  const experience = useExperienceMechanic();

  return discountValue(price, experience[type]);
};
