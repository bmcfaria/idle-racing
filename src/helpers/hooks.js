import { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  experienceSelector,
  raceSponsorsActiveSelector,
  eventMultipliersSelector,
  brandCompleteSelector,
  tracksSelector,
  tracksStatsSelector,
} from '../state/selectors';
import {
  buffValue,
  discountValue,
  capitalize,
  expLevel,
  expNextLevel,
  moneySponsorsCount,
  passiveMoneySponsors,
  passiveMoneyBrands,
} from './utils';
import { MAX_WIDTH_VALUE } from './theme';
import experience, { experienceTypePointsSpent } from './experience';
import { PageContentContext } from './context';

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
  const matchHome = useRouteMatch({ path: '/', exact: true });
  const matchGarage = useRouteMatch('/garage');
  const matchDealerBrand = useRouteMatch('/dealer/:brand');
  const matchDealer = useRouteMatch('/dealer');
  const matchRaceEvent = useRouteMatch('/race/:event');
  const matchRace = useRouteMatch('/race');
  const matchSettings = useRouteMatch('/settings');
  const matchStars = useRouteMatch('/stars');
  const matchAbout = useRouteMatch('/about');

  const selectedPage =
    (matchHome && 'Home') ||
    (matchGarage && 'Garage') ||
    (matchDealer && 'Dealer') ||
    (matchDealerBrand && '/' + capitalize(matchDealerBrand?.params?.brand)) ||
    (matchRace && 'Race') ||
    (matchRaceEvent && '/' + capitalize(matchRaceEvent?.params?.event)) ||
    (matchSettings && 'Settings') ||
    (matchStars && 'Stars') ||
    (matchAbout && 'About') ||
    '';

  const backPage =
    (matchDealerBrand && '/dealer') || (matchRaceEvent && '/race') || '/';

  return { name: selectedPage, ...(!matchHome && { back: backPage }) };
};

export const useHistoryHelper = () => {
  const { pageContentRef } = useContext(PageContentContext);
  const location = useLocation();
  const history = useHistory();

  const setScrollPositionInState = () => {
    const currentScrollPosition = pageContentRef?.scrollTop;

    history.replace({
      pathname: location.pathname,
      state: {
        ...(location.state || {}),
        scrollPosition: currentScrollPosition,
      },
    });
  };

  const push = (...args) => {
    setScrollPositionInState();
    history.push(...args);
  };

  const goBack = (...args) => {
    setScrollPositionInState();
    history.goBack(...args);
  };

  return { ...history, push, goBack };
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
  cardMargin = 16,
  screenMargin = 24
) => {
  const { width } = useWindowDimensions();
  const normalizedWidth = width > MAX_WIDTH_VALUE ? MAX_WIDTH_VALUE : width;

  return (
    Math.floor(
      (normalizedWidth - 2 * screenMargin) / (cardWidth + cardMargin)
    ) *
    (cardWidth + cardMargin)
  );
};

export const useExperience = type => {
  const experience = useSelector(experienceSelector);
  const { exp, max } = experience[type];
  const level = expLevel(exp, max);
  const pointsSpent = experienceTypePointsSpent([type], experience);
  const availablePoints = level - pointsSpent;

  return {
    ...experience[type],
    nextLevel: expNextLevel(exp),
    availablePoints,
  };
};

export const useCarPriceWithDiscount = price => {
  const experience = useExperience('business');

  return discountValue(price, ~~experience.newCars);
};

export const useCarPriceWithBuff = price => {
  const experience = useExperience('business');

  return buffValue(price, ~~experience.usedCars);
};

export const useRacePrizesWithBuff = prizes => {
  const experience = useExperience('race');

  return prizes.map(prize =>
    isNaN(prize) ? prize : buffValue(prize, ~~experience.prizes)
  );
};

export const useRacePriceWithDiscount = price => {
  const experience = useExperience('race');

  return discountValue(price, ~~experience.price);
};

export const useUpgradePriceWithDiscount = price => {
  const experience = useExperience('mechanic');

  return discountValue(price, ~~experience.attrs);
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

export const useRaceDurationWithDiscount = duration => {
  const raceExperience = useExperience('race');

  const { value } = experience.race.duration;

  return discountValue(duration, ~~raceExperience.duration, value);
};

export const useStarsLegend = () => {
  const tracksTotalCount = useSelector(tracksSelector).length;
  const won10RacesCount = Object.values(
    useSelector(tracksStatsSelector)
  ).filter(({ won }) => won >= 10).length;

  const isLegend = won10RacesCount === tracksTotalCount;
  const percentageComplete = (won10RacesCount * 100) / tracksTotalCount;
  return { isLegend, percentageComplete };
};
