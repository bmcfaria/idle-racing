import numbro from 'numbro';
import { brandSponsors } from './sponsors';

export const displayResponsivePanel = condition => [
  condition ? 'none' : 'flex',
  condition ? 'none' : 'flex',
  'flex',
];

export const ATTRIBUTE_TYPES = {
  ACCELERATION: 'acc',
  SPEED: 'spd',
  HANDLING: 'hnd',
};

export const calculateCarAttributeValues = car => ({
  [ATTRIBUTE_TYPES.ACCELERATION]:
    car[ATTRIBUTE_TYPES.ACCELERATION].value +
    ~~car.tuning?.[ATTRIBUTE_TYPES.ACCELERATION],
  [ATTRIBUTE_TYPES.SPEED]:
    car[ATTRIBUTE_TYPES.SPEED].value + ~~car.tuning?.[ATTRIBUTE_TYPES.SPEED],
  [ATTRIBUTE_TYPES.HANDLING]:
    car[ATTRIBUTE_TYPES.HANDLING].value +
    ~~car.tuning?.[ATTRIBUTE_TYPES.HANDLING],
});

export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export const buffValue = (value, times, buffPercentage = 0.1) =>
  value * (1 + buffPercentage * ~~times);

export const discountValue = (value, times, buffPercentage = 0.1) =>
  value * (1 - buffPercentage * ~~times);

export const expLevel = (exp, max) =>
  exp < max ? `${~~exp}`.length : `${~~max}`.length;

export const expNextLevel = exp => 10 ** `${~~exp}`.length;

export const PROBABILITY_GOOD_VALUE = 3;

export const TOAST_TYPES = {
  SPONSOR: 'SPONSOR',
  MECHANIC: 'MECHANIC',
  RACE_WON: 'RACE_WON',
  RACE_TOP_3: 'RACE_TOP_3',
  RACE_LOST: 'RACE_LOST',
  BRAND: 'BRAND',
  RACE_EVENT: 'RACE_EVENT',
};

export const sponsorEntryText = sponsor => {
  const timeText = sponsor.times > 1 ? 'times' : 'time';
  const raceText = sponsor.times > 1 ? 'races' : 'race';

  const text = `
        ${capitalize(sponsor.type)} ${sponsor.times} ${
    sponsor.type === 'race' ? timeText : raceText
  }
        `;
  return text;
};

export const raceEventToastSubtitle = 'Race event unlocked';

export const formatDuration = (duration, decimals = 0) =>
  duration / 1000 / 60 / 60 >= 1
    ? `${(duration / 1000 / 60 / 60).toFixed(decimals)}h`
    : duration / 1000 / 60 >= 1
    ? `${(duration / 1000 / 60).toFixed(decimals)}m`
    : `${(duration / 1000).toFixed(decimals)}s`;

export const formatMoney = value =>
  numbro(value).format({
    average: true,
    optionalMantissa: true,
    mantissa: 1,
    roundingFunction: Math.floor,
  });

export const moneySponsorsCount = (sponsors, event) =>
  Object.values(sponsors).filter(
    sponsor => (sponsor.event === event || !event) && sponsor.reward === 'money'
  ).length;

export const eventSponsorsStats = (tracks, tracksStats) =>
  tracks.reduce(
    (result, track) => ({
      everRaced: result.everRaced || !!tracksStats[track.id]?.raced,
      raced: result.raced && !!tracksStats[track.id]?.raced,
      won: result.won && tracksStats[track.id]?.won > 0,
      won10: result.won10 && tracksStats[track.id]?.won >= 10,
    }),
    { everRaced: false, raced: true, won: true, won10: true }
  );

export const passiveMoneySponsors = (sponsors, eventMultipliers) =>
  Object.values(sponsors).reduce(
    (result, sponsor) =>
      sponsor.reward === 'money'
        ? result + ~~eventMultipliers?.[sponsor.event] || 1
        : result,
    0
  );

export const passiveMoneyBrands = brandComplete =>
  Object.keys(brandComplete).reduce(
    (result, brandKey) =>
      result + ~~(brandComplete[brandKey] && brandSponsors[brandKey]),
    0
  );

export const carTypeText = {
  rwd: 'Rear-wheel-drive',
  fwd: 'Front-wheel-drive',
  '4x4': '4x4',
};
