import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import ContentPanel from './ContentPanel';
import CardCar from './CardCar';
import CardTrack from './CardTrack';
import { displayResponsivePanel } from '../helpers/utils';
import RaceDetails from './RaceDetails';
import { useSelector } from 'react-redux';
import { garageCarsSelector, tracksSelector } from '../state/selectors';

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const Separator = props => <Box w="1rem" {...props} />;

const TrackPanel = ({ tracks, ...props }) => (
  <ContentPanel title="Select Track" {...props}>
    {tracks.map((track, index) => (
      <React.Fragment key={track.id}>
        {index > 0 && <Divider />}
        <CardTrack track={track} />
      </React.Fragment>
    ))}
  </ContentPanel>
);

const CarsPanel = ({ cars, ...props }) => (
  <ContentPanel title="Select Car" {...props}>
    {cars.length === 0 && <div>No cars owned</div>}

    {cars.map((car, index) => (
      <React.Fragment key={car.id}>
        {index > 0 && <Divider />}
        <CardCar
          id={car.id}
          name={car.name}
          type={car.type}
          image={car.image}
          acceleration={car.acceleration}
          topSpeed={car.topSpeed}
          handling={car.handling}
        />
      </React.Fragment>
    ))}
  </ContentPanel>
);

const Race = () => {
  const location = useLocation();
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);

  const selectedTrackId = location?.state?.track;
  const selectedCarId = location?.state?.car;

  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const selectedCar = cars.find(item => item.id === selectedCarId);

  return (
    <Flex justifyContent="center">
      <TrackPanel
        tracks={tracks}
        display={displayResponsivePanel(selectedTrack)}
      />
      {selectedTrack && (
        <>
          <Separator display={displayResponsivePanel(selectedTrack)} />

          <CarsPanel
            cars={cars}
            display={displayResponsivePanel(selectedCar)}
          />
        </>
      )}
      {selectedCar && (
        <Separator display={displayResponsivePanel(selectedCar)} />
      )}
      {selectedCar && (
        <ContentPanel title="Race Details" wrap>
          <RaceDetails
            id={selectedTrack.id}
            name={selectedTrack.name}
            type={selectedTrack.type}
            image={selectedTrack.image}
            prizes={selectedTrack.prizes}
            duration={selectedTrack.duration}
            price={selectedTrack.price}
          />
        </ContentPanel>
      )}
    </Flex>
  );
};

export default Race;
