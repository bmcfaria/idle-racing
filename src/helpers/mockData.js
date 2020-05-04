import uuid from 'uuid-random';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import carsFile from '../assets/lists/cars.json';
import tracksFile from '../assets/lists/tracks.json';

// To help on manual object creation
window.uuid = uuid;

const generateAttribute = (base, unit, max, basePrice, upgrade) => {
  const value = base + unit * upgrade;
  const nextValue = base + unit * (upgrade + 1);
  const price = basePrice + (Math.pow(basePrice * 0.5, upgrade) - 1);

  return {
    base,
    unit,
    max,
    basePrice,
    value,
    upgrade,
    upgradeValue: upgrade < max ? nextValue : value,
    price: upgrade < max ? price : undefined,
    priceRaw: price,
  };
};

export const generateCarPrice = attributes =>
  500 +
  (attributes[ATTRIBUTE_TYPES.ACCELERATION].price ||
    attributes[ATTRIBUTE_TYPES.ACCELERATION].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.TOP_SPEED].price ||
    attributes[ATTRIBUTE_TYPES.TOP_SPEED].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.HANDLING].price ||
    attributes[ATTRIBUTE_TYPES.HANDLING].priceRaw);

const generateCar = car => ({
  id: car.id,
  name: car.name,
  type: car.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: generateAttribute(
    car.acc,
    1,
    car['acc upgrades'],
    ~~(car.price / 10),
    0
  ),
  [ATTRIBUTE_TYPES.TOP_SPEED]: generateAttribute(
    car.tsp,
    1,
    car['tsp upgrades'],
    ~~(car.price / 10),
    0
  ),
  [ATTRIBUTE_TYPES.HANDLING]: generateAttribute(
    car.hnd,
    1,
    car['hnd upgrades'],
    ~~(car.price / 10),
    0
  ),
  brand: car.brand,
  price: car.price,
});

const carDevaluation = 0.5;

export const generateGarageCar = car => ({
  id: uuid(),
  name: car.name,
  type: car.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: car[ATTRIBUTE_TYPES.ACCELERATION],
  [ATTRIBUTE_TYPES.TOP_SPEED]: car[ATTRIBUTE_TYPES.TOP_SPEED],
  [ATTRIBUTE_TYPES.HANDLING]: car[ATTRIBUTE_TYPES.HANDLING],
  price: ~~(car.price * carDevaluation),
  dealerCar: car.id,
  brand: car.brand,
  race: undefined,
});

export const upgradeAttribute = attribute => {
  if (attribute.upgrade >= attribute.max) {
    return attribute;
  }

  return generateAttribute(
    attribute.base,
    attribute.unit,
    attribute.max,
    attribute.basePrice,
    attribute.upgrade + 1
  );
};

const generateTrack = track => ({
  id: track.id,
  name: track.name,
  duration: track.duration * 1000,
  price: track.price,
  prizes: [track['prize 1'], track['prize 2'], track['prize 3']],
  category: track.category,
  [ATTRIBUTE_TYPES.ACCELERATION]:
    track.acc / (track.acc + track.tsp + track.hnd),
  [ATTRIBUTE_TYPES.TOP_SPEED]: track.tsp / (track.acc + track.tsp + track.hnd),
  [ATTRIBUTE_TYPES.HANDLING]: track.hnd / (track.acc + track.tsp + track.hnd),
  race: undefined,
  lastRace: undefined,
});

export const generateRace = (car, track) => ({
  id: uuid(),
  car: car.id,
  track: track.id,
  start: new Date().getTime(),
  duration: track.duration,
  name: track.name,
});

export const generatePastRace = (
  race,
  car,
  track,
  reward,
  position,
  results
) => ({
  id: uuid(),
  race: race.id,
  car: car.id,
  track: track.id,
  time: new Date().getTime(),
  checked: false,
  reward,
  position,
  results,
});

export const cars = [
  ...carsFile.reduce(
    (results, car) =>
      car?.id.length > 0 ? [...results, generateCar(car)] : results,
    []
  ),
];

export const tracks = [
  ...tracksFile.reduce(
    (results, track) =>
      track?.id.length > 0 && track['prize 1']
        ? [...results, generateTrack(track)]
        : results,
    []
  ),
];

export const money = 550;
