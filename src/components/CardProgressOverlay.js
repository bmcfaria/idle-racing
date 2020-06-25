import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import CardProgressCircle from './CardProgressCircle';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import Modal from './Modal';
import Button from './Button';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { stopRaceAction } from '../state/actions';

const CardProgressOverlay = ({
  race,
  label,
  car,
  circleSize = '116px',
  ...props
}) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  if (!race) {
    return null;
  }

  const showModal = location.state?.cancelRaceModal === race.id;

  const openModal = () => {
    history.push({
      pathname: location.pathname,
      state: { ...(location.state || {}), cancelRaceModal: race.id },
    });
  };

  const stopRace = () => {
    dispatch(stopRaceAction(race.id));
  };

  const onClose = () => {
    history.goBack();
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={onClose}>
        <Flex
          direction="column"
          bg={colors.white}
          margin="32px"
          padding="24px"
          borderRadius="16px"
          {...props}
        >
          <Text textAlign="center" fontSize="16px">
            Stop auto race
          </Text>
          <Flex marginTop="16px">
            <Button
              onClick={stopRace}
              minW="72px"
              h="24px"
              fontSize="12px"
              bg={colors.darkGray}
              color={colors.white}
            >
              Yes
            </Button>
            <Button
              onClick={onClose}
              minW="72px"
              h="24px"
              fontSize="12px"
              color={colors.darkGray}
              bg={colors.lightGray}
              marginLeft="16px"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Flex
        position="absolute"
        w="100%"
        h="100%"
        top="0"
        left="0"
        padding="8px 0"
        bg={hexAlpha(colors.white, 0.98)}
        cursor="progress"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        onClick={openModal}
        {...props}
      >
        {label && (
          <Text textAlign="center" color={colors.darkGray} fontSize="14px">
            ({race.name})
          </Text>
        )}
        <CardProgressCircle
          race={race}
          size={circleSize}
          textColor={colors.darkGray}
        />
        {car && (
          <Text textAlign="center" color={colors.darkGray} fontSize="14px">
            ({car.name})
          </Text>
        )}
      </Flex>
    </>
  );
};

export default CardProgressOverlay;
