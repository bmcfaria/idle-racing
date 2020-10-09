import React, { useEffect } from 'react';
import { Flex, Text, Box, CircularProgress } from '@chakra-ui/core';
import { colors, zIndex } from '../helpers/theme';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  offlineEarningsSelector,
  raceSponsorsActiveSelector,
  pastRacesSelector,
  racesSelector,
} from '../state/selectors';
import { useLocation, useHistory } from 'react-router-dom';
import { clearOfflineEarningsAction } from '../state/actions';
import { formatMoney } from '../helpers/utils';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as MechanicIcon } from '../assets/icons/mechanic.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';
import { tracks, cars } from '../helpers/data';

const DetailsRow = ({
  text,
  value,
  icon,
  iconW = '16px',
  iconH = '16px',
  ...props
}) => (
  <Flex lineHeight="24px" alignItems="center" {...props}>
    {!icon ? (
      <Text w="16px" textAlign="center" fontSize="24px" marginRight="4px">
        $
      </Text>
    ) : (
      <Flex
        w="16px"
        h="16px"
        alignItems="center"
        justifyContent="center"
        marginRight="4px"
      >
        <Box w={iconW} h={iconH} as={icon} />
      </Flex>
    )}
    <Text flexGrow="1">{text}</Text>
    <Text>{value}</Text>
    {!icon ? (
      <Text w="16px" textAlign="center" fontSize="24px" marginLeft="4px">
        $
      </Text>
    ) : (
      <Flex
        w="16px"
        h="16px"
        alignItems="center"
        justifyContent="center"
        marginLeft="4px"
      >
        <Box w={iconW} h={iconH} as={icon} />
      </Flex>
    )}
  </Flex>
);

const RaceRow = ({ race, ...props }) => (
  <Flex lineHeight="24px" alignItems="center" {...props}>
    <Box
      w="14px"
      h="14px"
      as={TrophyIcon}
      marginLeft="1px"
      marginRight="5px"
      color={colors.darkGray}
    />
    <Text flexGrow="1">{tracks.find(({ id }) => id === race.track)?.name}</Text>
    <Text w="12px" textAlign="right">
      {race.position}
    </Text>
    <Box
      w="14px"
      h="14px"
      as={TrophyIcon}
      marginLeft="5px"
      marginRight="1px"
      color={colors.darkGray}
    />
  </Flex>
);

const OfflineEarningsNotification = props => {
  const dispatch = useDispatch();
  const offlineEarnings = useSelector(offlineEarningsSelector);
  const sponsors = useSelector(raceSponsorsActiveSelector);
  const races = useSelector(racesSelector);
  const pastRaces = useSelector(pastRacesSelector);
  const location = useLocation();
  const history = useHistory();

  const showModal = location.state?.offlineEarnings;

  const hourInSeconds = 60 * 60;
  const dayInSeconds = hourInSeconds * 24;
  const totalSeconds = offlineEarnings.timelapse / 1000;
  const days = totalSeconds / dayInSeconds;
  const hours = (totalSeconds % dayInSeconds) / hourInSeconds;
  const minutes = ((totalSeconds % dayInSeconds) % hourInSeconds) / 60;
  const seconds = ((totalSeconds % dayInSeconds) % hourInSeconds) % 60;

  const previousTimestamp = new Date().getTime() - offlineEarnings.timelapse;

  const { money: newMoneySponsors, mechanics: newMechanics } = Object.values(
    sponsors
  ).reduce(
    (result, sponsor) =>
      sponsor.timestamp > previousTimestamp
        ? {
            money: result.money + ~~(sponsor.reward === 'money'),
            mechanics: result.mechanics + ~~(sponsor.reward === 'mechanic'),
          }
        : result,
    { money: 0, mechanics: 0 }
  );

  const offlineRaces = pastRaces.reduce(
    (result, race) =>
      race.timestamp > previousTimestamp ? [...result, race] : result,
    []
  );

  const { raceEarnings, newCars } = offlineRaces.reduce(
    (result, race) => {
      const track = tracks.find(({ id }) => id === race.track);
      const prize = track?.prizes[race.position - 1];

      return {
        raceEarnings: result.raceEarnings + ~~prize,
        newCars:
          result.newCars +
          ~~(isNaN(prize) && !!cars.find(({ id }) => id === prize)),
      };
    },
    { raceEarnings: 0, newCars: 0 }
  );

  const totalEarning = offlineEarnings.totalValue + raceEarnings;

  const earningsToShow =
    totalEarning > 0 || newMechanics > 0 || offlineRaces.length > 0;

  useEffect(() => {
    if (earningsToShow && !showModal) {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), offlineEarnings: true },
      });
    }
  }, [history, location.pathname, location.state, showModal, earningsToShow]);

  const onClose = () => {
    dispatch(clearOfflineEarningsAction);
    history.goBack();
  };

  return (
    <Modal
      isOpen={showModal && earningsToShow}
      onClose={onClose}
      zIndex={zIndex.warningModal}
      paddingTop="80px"
    >
      <Flex
        w="304px"
        maxH="calc(100vh - 2 * 16px)"
        direction="column"
        bg={colors.white}
        padding="24px"
        borderRadius="16px"
        fontSize="16px"
        overflowY="auto"
        {...props}
      >
        <Text textAlign="center" fontSize="24px">
          While you were away
        </Text>
        <Text textAlign="center" fontSize="14px">
          ({`Time offline ${~~days}d ${~~hours}h ${~~minutes}m ${~~seconds}s`})
        </Text>
        <Flex
          marginTop="8px"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
        >
          <Text>You've earned:</Text>
          <Text fontSize="24px" marginLeft="4px" bg={colors.yellow}>
            ${formatMoney(totalEarning)}
          </Text>
        </Flex>

        <Box w="100%" h="2px" marginTop="4px" bg={colors.darkGray} />

        <Text textAlign="center">Details</Text>

        <DetailsRow
          text="Sponsors (max 2h):"
          value={`+ $${formatMoney(offlineEarnings.sponsorsValue)}`}
          bg={colors.yellow}
        />

        <DetailsRow
          text="Brands (max 2h):"
          value={`+ $${formatMoney(offlineEarnings.brandsValue)}`}
          icon={CarIcon}
          iconW="14px"
          iconH="14px"
          bg={colors.orange}
        />

        <DetailsRow
          text="Mechanics (unlocked):"
          value={`+ ${newMechanics}`}
          icon={MechanicIcon}
          bg={colors.lightBlue}
        />

        <DetailsRow
          text="Sponsors (unlocked):"
          value={`+ ${newMoneySponsors}`}
          bg={colors.green}
        />

        <DetailsRow
          text="Races:"
          value={`+ $${formatMoney(raceEarnings)}`}
          icon={TrophyIcon}
          iconW="14px"
          iconH="14px"
          bg={colors.yellow}
        />

        <DetailsRow
          text="Cars:"
          value={`+ ${newCars}`}
          icon={CarIcon}
          iconW="14px"
          iconH="14px"
          bg={colors.orange}
        />

        {/* If there's no offline (finished) races but there are active races, 
            then no need to show this section */}
        {!(offlineRaces.length === 0 && races.length > 0) && (
          <>
            <Box w="100%" h="2px" marginTop="4px" bg={colors.darkGray} />
            {offlineRaces.length > 0 && (
              <Flex w="100%" alignItems="flex-end">
                <Text fontSize="14px" marginLeft="20px" color={colors.darkGray}>
                  Name
                </Text>
                <Text flexGrow="1" textAlign="center">
                  Races
                </Text>
                <Text
                  fontSize="14px"
                  marginRight="20px"
                  color={colors.darkGray}
                >
                  Pos
                </Text>
              </Flex>
            )}
            {offlineRaces.length === 0 && (
              <Text textAlign="center">No races</Text>
            )}
            {offlineRaces.map((race, index) => (
              <RaceRow
                race={race}
                {...(index % 2 === 1 && { bg: colors.lightGray })}
                key={race.id}
              />
            ))}
          </>
        )}

        {races.length > 0 && (
          <>
            <Box w="100%" h="2px" marginTop="4px" bg={colors.darkGray} />
            <Flex alignItems="center">
              <CircularProgress
                w="14px"
                h="14px"
                marginLeft="1px"
                marginRight="5px"
                isIndeterminate
                capIsRound
                color={colors.darkGray}
              />
              <Text flexGrow="1" textAlign="center">
                {`${races.length} active race${races.length > 1 ? 's' : ''}`}
              </Text>
              <CircularProgress
                w="14px"
                h="14px"
                marginLeft="5px"
                marginRight="1px"
                isIndeterminate
                capIsRound
                color={colors.darkGray}
              />
            </Flex>
          </>
        )}
      </Flex>
    </Modal>
  );
};

export default OfflineEarningsNotification;
