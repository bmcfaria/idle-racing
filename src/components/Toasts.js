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
  [TOAST_TYPES.SPONSOR]: '+1 Sponsor',
  [TOAST_TYPES.MECHANIC]: '+1 Mechanic',
};

const toastTypeColor = {
  [TOAST_TYPES.SPONSOR]: colors.green,
  [TOAST_TYPES.MECHANIC]: colors.lightBlue,
};

const Toast = ({
  id,
  title,
  reward,
  subtitle,
  color,
  removeFromStore,
  onClose,
}) => {
  useEffect(() => {
    removeFromStore(id);
  });

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
      onClick={onClose}
    >
      <Text textAlign="center">{title}</Text>
      <Flex w="100%" justifyContent="space-between" padding="0 4px">
        <Text>{reward}</Text>
        <Text>({subtitle})</Text>
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

    toasts.forEach(({ id, title, subtitle, type }) => {
      toast({
        duration: null,
        position: 'top-right',
        render: ({ onClose }) => (
          <Toast
            id={id}
            title={title}
            subtitle={subtitle}
            reward={toastTypeReward[type]}
            color={toastTypeColor[type]}
            removeFromStore={dismissToast}
            onClose={onClose}
          />
        ),
      });
    });
  }, [dispatch, toast, toasts]);

  return null;
};

export default Toasts;
