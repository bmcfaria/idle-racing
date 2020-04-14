import uuid from 'uuid-random';
import { ATTRIBUTE_TYPES } from '../helpers/utils';

const generateAttribute = (base, unit, max, basePrice, upgrade) => {
  const value = base + unit * upgrade;
  const nextValue = base + unit * (upgrade + 1);
  const price = basePrice + Math.pow(basePrice * 0.1, upgrade);

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

const generateRandomAttribute = (base, unit, max, basePrice) => {
  const upgrade = Math.round(Math.random() * max);
  return generateAttribute(base, unit, max, basePrice, upgrade);
};

export const generateCarPrice = attributes =>
  500 +
  (attributes[ATTRIBUTE_TYPES.ACCELERATION].price ||
    attributes[ATTRIBUTE_TYPES.ACCELERATION].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.TOP_SPEED].price ||
    attributes[ATTRIBUTE_TYPES.TOP_SPEED].priceRaw) +
  (attributes[ATTRIBUTE_TYPES.HANDLING].price ||
    attributes[ATTRIBUTE_TYPES.HANDLING].priceRaw);

const generateCar = (name = 'Some car name', type = '4x4') => {
  const baseAttributes = {
    id: uuid(),
    name,
    type,
    [ATTRIBUTE_TYPES.ACCELERATION]: generateRandomAttribute(100, 20, 6, 50),
    [ATTRIBUTE_TYPES.TOP_SPEED]: generateRandomAttribute(100, 20, 4, 50),
    [ATTRIBUTE_TYPES.HANDLING]: generateRandomAttribute(100, 20, 5, 50),
  };

  return {
    ...baseAttributes,
    price: generateCarPrice(baseAttributes),
  };
};

export const generateGarageCar = car => ({
  id: uuid(),
  name: car.name,
  type: car.type,
  [ATTRIBUTE_TYPES.ACCELERATION]: car[ATTRIBUTE_TYPES.ACCELERATION],
  [ATTRIBUTE_TYPES.TOP_SPEED]: car[ATTRIBUTE_TYPES.TOP_SPEED],
  [ATTRIBUTE_TYPES.HANDLING]: car[ATTRIBUTE_TYPES.HANDLING],
  price: ~~(car.price * 0.7),
  dealerCar: car.id,
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

const generateTrack = (name = 'Some race name', type = '4x4') => ({
  id: uuid(),
  name: name,
  duration: 3,
  price: 10,
  prizes: [1000, 500, 100],
  type: type,
  race: undefined,
});

export const generateRace = (car, track) => ({
  car: car.id,
  track: track.id,
  start: new Date().getTime(),
  duration: track.duration,
});

export const cars = [...new Array(20)].map(_ => generateCar());
export const tracks = [...new Array(20)].map(_ => generateTrack());
export const money = 9999999999;
export const notifications = [
  {
    id: 0,
    won: true,
    position: 1,
    award: '$1200',
    track: { id: 1, name: 'Same race name' },
    car: { id: 1, name: 'Same car name' },
  },
  {
    id: 1,
    won: false,
    position: 2,
    award: undefined,
    track: { id: 2, name: 'Same race name' },
    car: { id: 2, name: 'Same car name' },
  },
];
