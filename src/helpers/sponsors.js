import { raceSponsors } from './mockData';

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
    if (sponsor.type === 'win') {
      const pastRacesWins = pastRaces.reduce(
        (acumulator, pastRace) =>
          eventTrackIds.includes(pastRace.track) && pastRace.position === 1
            ? acumulator + 1
            : acumulator,
        0
      );
      console.log(pastRacesWins, eventTrackIds);
      if (pastRacesWins + ~~(position === 1) >= sponsor.times) {
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
    }
    return result;
  }, {});

  return sponsorsResult;
};
