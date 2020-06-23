import React from 'react';
import { Box, PseudoBox } from '@chakra-ui/core';
import { Flex } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import {
  moneySelector,
  experienceMechanicSelector,
  experienceBusinessSelector,
  experienceRaceSelector,
} from '../state/selectors';
import { zIndex, colors } from '../helpers/theme';
import { useCurrentPageName } from '../helpers/hooks';
import abbreviate from 'number-abbreviate';
import Button from './Button';
import Modal from './Modal';
import ExperienceUpgrades from './ExperienceUpgrades';
import { ReactComponent as Triange } from '../assets/icons/triangle.svg';

const TriangleArrowButton = props => (
  <PseudoBox
    as="button"
    w="32px"
    h="32px"
    display="flex"
    color={colors.white}
    transform="rotate(-90deg)"
    _hover={{
      color: colors.pink,
    }}
    {...props}
  >
    <Triange style={{ margin: 'auto' }} />
  </PseudoBox>
);

const Navigation = () => {
  const currentPage = useCurrentPageName();

  if (!currentPage) {
    return <Box />;
  }

  return (
    <Flex h="100%" padding="0 8px" alignItems="center">
      <TriangleArrowButton as={Link} to="/" />
      <Text marginLeft="8px" fontSize="24px" color={colors.white}>
        {currentPage}
      </Text>
    </Flex>
  );
};

const Money = props => {
  const money = useSelector(moneySelector);

  return (
    <Flex
      w="100%"
      h="100%"
      align="center"
      justifyContent={['flex-end', 'center']}
      paddingRight={['52px', 0]}
      position="absolute"
      {...props}
    >
      <Text fontSize="24px" color={colors.yellow}>
        $
      </Text>
      <Text fontSize="24px" color={colors.white}>
        {abbreviate(money, 1)}
      </Text>
    </Flex>
  );
};

const ExperienceButton = ({
  text,
  experience,
  color = colors.orande,
  onClick,
  selected,
}) => {
  const percentageToNextLevel =
    experience.exp < experience.max
      ? (experience.exp * 100) / experience.nextLevel
      : 100;

  const valueText =
    experience.exp < experience.max
      ? `${abbreviate(experience.exp, 1)} / ${abbreviate(
          experience.nextLevel,
          1
        )}`
      : `${abbreviate(experience.exp, 1)}`;

  return (
    <Button
      h="100%"
      bg={colors.white}
      boxShadow={selected ? `0 0 0 3px ${colors.purple}` : 'none'}
      onClick={onClick}
    >
      <Box marginBottom="2px" position="relative">
        <Text w="100%" h="16px" fontSize="14px" textAlign="center">
          {text}
        </Text>
        <Box w="100px" h="14px" position="relative" border="1px solid black">
          <Box w={`${percentageToNextLevel}%`} h="100%" bg={color} />
          <Text
            w="100%"
            h="12px"
            top="0"
            lineHeight="12px"
            fontSize="12px"
            textAlign="center"
            position="absolute"
          >
            {valueText}
          </Text>
        </Box>
        {~~experience.availablePoints > 0 && (
          <Box
            top="10px"
            right="-15px"
            w="14px"
            h="14px"
            borderRadius="50%"
            position="absolute"
            bg={colors.darkGray}
          >
            <Text
              w="100%"
              h="100%"
              fontSize="12px"
              lineHeight="14px"
              textAlign="center"
              color={colors.white}
            >
              {experience.availablePoints}
            </Text>
          </Box>
        )}
      </Box>
    </Button>
  );
};

const HeaderBar = () => {
  const location = useLocation();
  const history = useHistory();
  const experienceBusiness = useSelector(experienceBusinessSelector);
  const experienceRace = useSelector(experienceRaceSelector);
  const experienceMechanic = useSelector(experienceMechanicSelector);

  const expTypeModal = location.state?.expType;

  const openUpgradeModal = expType => {
    if (location.state?.expType) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), expType },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), expType },
      });
    }
  };

  return (
    <header>
      {/* spacer */}
      <Box w="100%" h="88px" />

      <Modal isOpen={!!expTypeModal} backOnClose zIndex={zIndex.headerBar}>
        <ExperienceUpgrades expType={expTypeModal} />
      </Modal>

      <Box position="fixed" top="0" left="0" w="100%" zIndex={zIndex.headerBar}>
        <Flex
          w="100%"
          h="48px"
          bg={colors.blue}
          position="relative"
          justifyContent="space-between"
        >
          <Money />
          <Navigation />
          <Notifications />
        </Flex>

        <Flex
          w="100%"
          h="40px"
          bg={colors.white}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          justifyContent="space-around"
        >
          <ExperienceButton
            text="Business exp"
            experience={experienceBusiness}
            color={colors.orange}
            onClick={() => openUpgradeModal('business')}
            selected={expTypeModal === 'business'}
          />
          <ExperienceButton
            text="Race exp"
            experience={experienceRace}
            color={colors.green}
            onClick={() => openUpgradeModal('race')}
            selected={expTypeModal === 'race'}
          />
          <ExperienceButton
            text="Mechanic exp"
            experience={experienceMechanic}
            color={colors.lightBlue}
            onClick={() => openUpgradeModal('mechanic')}
            selected={expTypeModal === 'mechanic'}
          />
        </Flex>
      </Box>
    </header>
  );
};

export default HeaderBar;
