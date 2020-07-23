import { raceSponsors } from './mockData';

const raceOrWinValidation = (type, position) =>
  type === 'win' ? position === 1 : true;

const trackValidation = (eventTrack, trackId) =>
  eventTrack === trackId || !eventTrack;

const carValidation = (eventCar, carId) => eventCar === carId || !eventCar;

export const evaluateSponsors = (
  track,
  car,
  position,
  tracks,
  pastRaces,
  sponsors
) => {
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
              timestamp: new Date().getTime(),
            },
          }
        : result;
    }
    return result;
  }, {});

  return sponsorsResult;
};
