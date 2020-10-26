import { raceSponsors, tracks } from './data';

const raceOrWinValidation = (type, position) =>
  type === 'win' ? position === 1 : true;

const trackValidation = (eventTrack, trackId) =>
  eventTrack === trackId || !eventTrack;

const carValidation = (eventCar, carId) => eventCar === carId || !eventCar;

export const evaluateSponsors = (track, car, position, pastRaces, sponsors) => {
  const filteredSponsors = raceSponsors.filter(
    sponsor => sponsor.event === track.category
  );
  const eventTrackIds = tracks.reduce(
    (result, item) =>
      item.category === track.category ? [...result, item.id] : result,
    []
  );
  const sponsorsResult = filteredSponsors.reduce((result, sponsor) => {
    const pastRacesEvent = pastRaces.reduce(
      (acumulator, pastRace) =>
        eventTrackIds.includes(pastRace.track) &&
        trackValidation(sponsor.track, pastRace.track) &&
        carValidation(sponsor.car, pastRace.dealerCar) &&
        raceOrWinValidation(sponsor.type, pastRace.position)
          ? acumulator + 1
          : acumulator,
      0
    );

    if (
      pastRacesEvent +
        ~~(
          trackValidation(sponsor.track, track.id) &&
          carValidation(sponsor.car, car.dealerCar) &&
          raceOrWinValidation(sponsor.type, position)
        ) >=
      sponsor.times
    ) {
      return !sponsors[sponsor.id]
        ? {
            ...result,
            [sponsor.id]: {
              event: track.category,
              reward: sponsor.reward ?? 'money',
              timestamp: new Date().getTime(),
            },
          }
        : result;
    }
    return result;
  }, {});

  return sponsorsResult;
};

export const brandSponsors = {
  compact: 10,
  city: 100,
  family: 100,
  offroad: 1000,
  supercar: 10000,
  f1: 10000,
  racer: 10000,
  nascar: 10000,
  prototype: 10000,
  heavy: 10000,
};
