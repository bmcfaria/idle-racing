import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { useLocation } from "react-router-dom";
import ContentPanel from "./ContentPanel";
import CardCar from "./CardCar";
import CardRace from "./CardRace";
import { cars, races } from "../helpers/mockData";
import { displayResponsivePanel } from "../helpers/utils";
import RaceDetails from "./RaceDetails";

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const Separator = props => <Box w="1rem" {...props} />;

const RacePanel = ({ races, ...props }) => (
  <ContentPanel title="Select Race" {...props}>
    {races.map((race, index) => (
      <React.Fragment key={race.id}>
        {index > 0 && <Divider />}
        <CardRace
          id={race.id}
          name={race.name}
          type={race.type}
          image={race.image}
          prizes={race.prizes}
          duration={race.duration}
          price={race.price}
        />
      </React.Fragment>
    ))}
  </ContentPanel>
);

const CarsPanel = ({ cars, ...props }) => (
  <ContentPanel title="Select Car" {...props}>
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

  const selectedRaceId = location?.state?.race;
  const selectedCarId = location?.state?.car;

  //TODO: change: simple selector, only for mocked data
  const selectedRace = races[selectedRaceId - 1];
  //TODO: change: simple selector, only for mocked data
  const selectedCar = cars[selectedCarId - 1];

  return (
    <Flex justifyContent="center">
      <RacePanel races={races} display={displayResponsivePanel(selectedRace)} />
      {selectedRace && (
        <>
          <Separator display={displayResponsivePanel(selectedRace)} />

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
            id={selectedRace.id}
            name={selectedRace.name}
            type={selectedRace.type}
            image={selectedRace.image}
            prizes={selectedRace.prizes}
            duration={selectedRace.duration}
            price={selectedRace.price}
          />
        </ContentPanel>
      )}
    </Flex>
  );
};

export default Race;
