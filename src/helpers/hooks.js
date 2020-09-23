import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  experienceSelector,
  tracksStatsSelector,
  raceSponsorsActiveSelector,
  tracksSelector,
  trackStatsSelector,
  eventMultipliersSelector,
  garageSlotsSelector,
  garageCarsSelector,
  dealerCarsSelector,
  boughtCarsSelector,
  rewardCarsSelector,
  brandCompleteSelector,
} from '../state/selectors';
import {
  buffValue,
  discountValue,
  capitalize,
  expLevel,
  expNextLevel,
  moneySponsorsCount,
  eventSponsorsStats,
  passiveMoneySponsors,
  passiveMoneyBrands,
  carTypeText,
} from './utils';
import { raceEvents } from './data';
import { MAX_WIDTH_VALUE } from './theme';

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
  const normalizedWidth = width > MAX_WIDTH_VALUE ? MAX_WIDTH_VALUE : width;

  return (
    Math.floor((normalizedWidth - 2 * 24) / (cardWidth + cardMargin)) *
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

  return prizes.map(prize =>
    isNaN(prize) ? prize : buffValue(prize, experience.prizes)
  );
};

export const useRacePriceWithDiscount = price => {
  const experience = useExperienceRace();

  return discountValue(price, experience.price);
};

export const useUpgradePriceWithDiscount = (price, type) => {
  const experience = useExperienceMechanic();

  return discountValue(price, experience[type]);
};

export const usePreviousUnlockedTrackChecker = tracks => {
  const tracksStats = useSelector(tracksStatsSelector);

  const isPreviousUnlocked = index => {
    return (
      raceEvents.find(({ type }) => type === tracks[index]?.category)
        ?.unlocked ||
      index === 0 ||
      tracksStats[tracks[index - 1]?.id]?.won > 0
    );
  };

  return isPreviousUnlocked;
};

export const usePassiveIncomeEventSponsors = event => {
  const sponsors = useSelector(raceSponsorsActiveSelector);
  const eventMultipliers = useSelector(eventMultipliersSelector);

  const multiplier = ~~eventMultipliers?.[event] || 1;

  return multiplier * moneySponsorsCount(sponsors, event);
};

export const usePassiveIncomeSponsors = () => {
  const sponsors = useSelector(raceSponsorsActiveSelector);
  const eventMultipliers = useSelector(eventMultipliersSelector);

  return passiveMoneySponsors(sponsors, eventMultipliers);
};

export const usePassiveIncomeBrands = () => {
  const brandComplete = useSelector(brandCompleteSelector);

  return passiveMoneyBrands(brandComplete);
};

export const usePassiveIncome = () => {
  const passiveIncomeSponsors = usePassiveIncomeSponsors();
  const passiveIncomeBrands = usePassiveIncomeBrands();

  return passiveIncomeSponsors + passiveIncomeBrands;
};

export const useMechanicsCount = () => {
  const sponsors = useSelector(raceSponsorsActiveSelector);

  return Object.values(sponsors).filter(
    sponsor => sponsor.reward === 'mechanic'
  ).length;
};

export const useEventTracksStatsState = eventType => {
  const tracks = useSelector(tracksSelector);
  const tracksStats = useSelector(tracksStatsSelector);
  const eventRacesAll = tracks.filter(item => item.category === eventType);

  return eventSponsorsStats(eventRacesAll, tracksStats);
};

export const useTrackStatsState = trackId => {
  const trackStats = useSelector(trackStatsSelector(trackId));

  return {
    raced: trackStats?.raced,
    won: trackStats?.won > 0,
    won10: trackStats?.won >= 10,
  };
};

export const useEmptyGarageSlots = () => {
  const garageCars = useSelector(garageCarsSelector);
  const garageSlots = useSelector(garageSlotsSelector);

  const rewardedCarsCount = garageCars.reduce(
    (result, { reward }) => result + ~~reward,
    0
  );

  return rewardedCarsCount - (garageCars.length - garageSlots);
};

export const useRequirements = () => {
  const dealerCars = useSelector(dealerCarsSelector);

  const attrCompare = {
    lt: '<',
    eq: '=',
    gt: '>',
  };

  const requirementText = ({ type, value }) => {
    switch (type) {
      case 'no_ups':
        return 'No upgrades';
      case 'brand':
        return `${capitalize(value)} cars`;
      case 'type':
        return `${carTypeText[value]} only`;
      case 'attr':
        return `Cars with ${value.attr.toUpperCase()} ${
          attrCompare[value.compare]
        } ${value.value}`;
      case 'car':
        const car = dealerCars.find(item => item.id === value);
        return `"${capitalize(car?.name)}" car`;
      default:
        return '';
    }
  };

  return { requirementText };
};

export const useCarsAcquired = cars => {
  const boughtCars = useSelector(boughtCarsSelector);
  const rewardCars = useSelector(rewardCarsSelector);

  const uniqueCars = cars.reduce(
    (result, { id }) =>
      boughtCars[id] || rewardCars[id] ? { ...result, [id]: true } : result,
    {}
  );

  return Object.keys(uniqueCars).length;
};
