import React, { useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useToast } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toastsSelector } from '../state/selectors';
import { TOAST_TYPES } from '../helpers/utils';
import { dismissToastAction } from '../state/actions';
import Button from './Button';

const toastTypeReward = {
  [TOAST_TYPES.MECHANIC_RACE]: '+1 Mechanic',
  [TOAST_TYPES.MECHANIC_WON]: '+1 Mechanic',
  [TOAST_TYPES.MECHANIC_100_WIN]: '+1 Mechanic',
};

const toastTypeDescription = {
  [TOAST_TYPES.MECHANIC_RACE]: 'finish race',
  [TOAST_TYPES.MECHANIC_WON]: 'won race',
  [TOAST_TYPES.MECHANIC_100_WIN]: '100 wins',
};

const toastTypeColor = {
  [TOAST_TYPES.MECHANIC_RACE]: colors.orange,
  [TOAST_TYPES.MECHANIC_WON]: colors.green,
  [TOAST_TYPES.MECHANIC_100_WIN]: colors.lightBlue,
};

const Toast = ({
  id,
  name,
  reward,
  description,
  color,
  dismissToast,
  onClose,
}) => {
  const onClick = () => {
    dismissToast(id);
    onClose();
  };

  return (
    <Button
      w="160px"
      h="40px"
      borderRadius="4px"
      margin="8px"
      padding="0"
      border={`2px solid ${colors.darkGray}`}
      bg={color}
      fontSize="12px"
      flexDirection="column"
      onClick={onClick}
    >
      <Text textAlign="center">{name}</Text>
      <Flex w="100%" justifyContent="space-between" padding="0 4px">
        <Text>{reward}</Text>
        <Text>({description})</Text>
      </Flex>
    </Button>
  );
};

const Toasts = props => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toasts = useSelector(toastsSelector);

  useEffect(() => {
    const dismissToast = id => {
      dispatch(dismissToastAction(id));
    };

    toasts.forEach(({ id, name, type }) => {
      toast({
        duration: null,
        position: 'top-right',
        render: ({ onClose }) => (
          <Toast
            id={id}
            name={name}
            reward={toastTypeReward[type]}
            description={toastTypeDescription[type]}
            color={toastTypeColor[type]}
            dismissToast={dismissToast}
            onClose={onClose}
          />
        ),
      });
    });
  }, [dispatch, toast, toasts]);

  return null;
};

export default Toasts;
