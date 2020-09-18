import React, { useEffect } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useToast } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toastsSelector } from '../state/selectors';
import { TOAST_TYPES } from '../helpers/utils';
import { dismissToastAction } from '../state/actions';
import Button from './Button';
import { ReactComponent as TrophyIcon } from '../assets/icons/trophy.svg';
import { ReactComponent as MechanicIcon } from '../assets/icons/mechanic.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';

const toastTypeReward = (type, extra) =>
  ({
    [TOAST_TYPES.SPONSOR]: '+1 Sponsor',
    [TOAST_TYPES.MECHANIC]: '+1 Mechanic',
    [TOAST_TYPES.RACE_WON]: 'Won',
    [TOAST_TYPES.RACE_TOP_3]: `Pos: ${extra.position}`,
    [TOAST_TYPES.RACE_LOST]: 'Lost',
    [TOAST_TYPES.BRAND]: `+ $${extra.value}/s`,
  }[type]);

const toastTypeColor = {
  [TOAST_TYPES.SPONSOR]: colors.green,
  [TOAST_TYPES.MECHANIC]: colors.lightBlue,
  [TOAST_TYPES.RACE_WON]: colors.green,
  [TOAST_TYPES.RACE_TOP_3]: colors.yellow,
  [TOAST_TYPES.RACE_LOST]: colors.red,
  [TOAST_TYPES.BRAND]: colors.orange,
};

const TrophyIconResized = props => (
  <Box maxW="18px" maxH="18px" as={TrophyIcon} {...props} />
);

const toastTypeIcon = {
  [TOAST_TYPES.SPONSOR]: '$',
  [TOAST_TYPES.MECHANIC]: MechanicIcon,
  [TOAST_TYPES.RACE_WON]: TrophyIconResized,
  [TOAST_TYPES.RACE_TOP_3]: TrophyIconResized,
  [TOAST_TYPES.RACE_LOST]: TrophyIconResized,
  [TOAST_TYPES.BRAND]: CarIcon,
};

const Toast = ({
  id,
  title,
  subtitle,
  removeFromStore,
  type,
  extra,
  onClose,
}) => {
  const reward = toastTypeReward(type, extra);
  const color = toastTypeColor[type];

  useEffect(() => {
    removeFromStore(id);
  });

  const isString = value =>
    typeof value === 'string' || value instanceof String;

  return (
    <Button
      w="190px"
      h="40px"
      borderRadius="4px"
      margin="8px"
      padding="0"
      border={`2px solid ${colors.darkGray}`}
      bg={color}
      fontSize="12px"
      flexDirection="row"
      onClick={onClose}
    >
      <Flex
        w="30px"
        h="40px"
        marginLeft="-2px"
        borderRadius="4px 0 0 4px"
        bg={colors.darkGray}
        color={color}
      >
        {isString(toastTypeIcon[type]) && (
          <Text
            margin="auto"
            textAlign="center"
            lineHeight="32px"
            fontSize="32px"
          >
            {toastTypeIcon[type]}
          </Text>
        )}
        {!isString(toastTypeIcon[type]) && (
          <Box margin="auto" as={toastTypeIcon[type]} />
        )}
      </Flex>
      <Box flexGrow="1">
        <Text textAlign="center">{title}</Text>
        <Flex w="100%" justifyContent="space-between" padding="0 4px">
          <Text>{reward}</Text>
          <Text>({subtitle})</Text>
        </Flex>
      </Box>
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
            type={type}
            extra={extra}
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
