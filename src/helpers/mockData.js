const generateRandomAttribute = (base, unit, max, basePrice) => {
  const upgrade = Math.round(Math.random() * max);
  const value = base + unit * upgrade;
  const nextValue = base + unit * (upgrade + 1);
  const price = basePrice + Math.pow(basePrice * 0.1, upgrade);

  return {
    value: value,
    upgradeValue: upgrade < max ? nextValue : value,
    upgrade: upgrade,
    max: max,
    price: upgrade < max ? price : undefined,
    priceRaw: price
  };
};

class Car {
  image = undefined;

  constructor(id, name = "Some car name", type = "4x4") {
    this.id = id;
    this.name = name;
    this.type = type;

    this.acceleration = generateRandomAttribute(100, 20, 6, 50);
    this.topSpeed = generateRandomAttribute(100, 20, 4, 50);
    this.handling = generateRandomAttribute(100, 20, 5, 50);

    this.price =
      500 +
      (this.acceleration.price || this.acceleration.priceRaw) +
      (this.topSpeed.price || this.topSpeed.priceRaw) +
      (this.handling.price || this.handling.priceRaw);
  }
}

class Race {
  image = undefined;

  constructor(id, name = "Some race name", type = "4x4") {
    this.id = id;
    this.name = name;
    this.duration = 3;
    this.price = 10;
    this.prizes = [1000, 500, 100];
    this.type = type;
  }
}

export const cars = [...new Array(20)].map((_, index) => new Car(index + 1));
export const races = [...new Array(20)].map((_, index) => new Race(index + 1));
export const money = 9999999999;
export const notifications = [
  { id: 0, won: true, position: 1, award: '$1200', track: { id: 1, name: 'Same race name' }, car: { id: 1, name: 'Same car name' } },
  { id: 1, won: false, position: 2, award: undefined, track: { id: 2, name: 'Same race name' }, car: { id: 2, name: 'Same car name' } }
];
