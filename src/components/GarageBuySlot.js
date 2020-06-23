import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { garageSlotPriceSelector } from '../state/selectors';
import { buyGarageSlotAction } from '../state/actions';
import { colors } from '../helpers/theme';
import Button from './Button';
import abbreviate from 'number-abbreviate';
import Modal from './Modal';
import { useLocation, useHistory } from 'react-router-dom';

const GarageBuySlot = props => {
  const slotPrice = useSelector(garageSlotPriceSelector);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const showModal = location.state?.buySlot;

  const buySlot = () => {
    dispatch(buyGarageSlotAction);
    history.goBack();
  };

  const openModal = () => {
    history.push({
      pathname: location.pathname,
      state: { ...(location.state || {}), buySlot: true },
    });
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
            Buy new car slot
          </Text>
          <Flex marginTop="16px">
            <Button
              onClick={buySlot}
              minW="72px"
              h="24px"
              fontSize="12px"
              bg={colors.lightBlue}
            >
              ${abbreviate(slotPrice, 1)}
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
      <Button
        w="160px"
        h="180px"
        borderRadius="16px"
        bg={colors.lightBlue}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        onClick={openModal}
        {...props}
      >
        <Text fontSize="14px">Buy car slot</Text>
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.4001 0H21.6001V21.6001H0V32.4001H21.6001V54H32.4001V32.4001H54V21.6001H32.4001V0Z"
            fill="currentColor"
          />
        </svg>
        <Text fontSize="16px">${abbreviate(slotPrice, 1)}</Text>
      </Button>
    </>
  );
};

export default GarageBuySlot;
