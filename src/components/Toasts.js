import React, { useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useToast } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toastsSelector } from '../state/selectors';
import { TOAST_TYPES } from '../helpers/utils';
import { dismissToastAction } from '../state/actions';
import Button from './Button';

const toastTypeReward = (type, extra) =>
  ({
    [TOAST_TYPES.SPONSOR]: '+1 Sponsor',
    [TOAST_TYPES.MECHANIC]: '+1 Mechanic',
    [TOAST_TYPES.RACE_WON]: 'Won',
    [TOAST_TYPES.RACE_TOP_3]: `Pos: ${extra.position}`,
    [TOAST_TYPES.RACE_LOST]: 'Lost',
  }[type]);

const toastTypeColor = {
  [TOAST_TYPES.SPONSOR]: colors.green,
  [TOAST_TYPES.MECHANIC]: colors.lightBlue,
  [TOAST_TYPES.RACE_WON]: colors.green,
  [TOAST_TYPES.RACE_TOP_3]: colors.yellow,
  [TOAST_TYPES.RACE_LOST]: colors.red,
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

const Toasts = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toasts = useSelector(toastsSelector);

  useEffect(() => {
    const dismissToast = id => {
      dispatch(dismissToastAction(id));
    };

    toasts.forEach(({ id, title, subtitle, type, extra }) => {
      toast({
        duration: 5000,
        position: 'top-right',
        render: ({ onClose }) => (
          <Toast
            id={id}
            title={title}
            subtitle={subtitle}
            reward={toastTypeReward(type, extra)}
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
