import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useSelector } from 'react-redux';
import { offlineEarningsSelector } from '../state/selectors';
import { formatMoney } from '../helpers/utils';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as MechanicIcon } from '../assets/icons/mechanic.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';

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

const OfflineEarningsNotificationDetails = ({
  newMoneySponsors,
  newMechanics,
  raceEarnings,
  newCars,
}) => {
  const { sponsorsValue, brandsValue } = useSelector(offlineEarningsSelector);

  return (
    <>
      <DetailsRow
        text="Sponsors (max 2h):"
        value={`+ $${formatMoney(sponsorsValue)}`}
        bg={colors.yellow}
      />

      <DetailsRow
        text="Brands (max 2h):"
        value={`+ $${formatMoney(brandsValue)}`}
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
    </>
  );
};

export default OfflineEarningsNotificationDetails;
