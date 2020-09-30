import React, { useEffect } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { TOAST_TYPES } from '../helpers/utils';
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
  [TOAST_TYPES.RACE_EVENT]: colors.lightGray,
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
  [TOAST_TYPES.RACE_EVENT]: TrophyIconResized,
};

const Toast = ({
  toast,
  removeFromStore,
  onClose,
  h = '44px',
  clickable = true,
  ...props
}) => {
  const { id, title, subtitle, type, extra } = toast;
  const reward = toastTypeReward(type, extra);
  const color = toastTypeColor[type];

  useEffect(() => {
    if (removeFromStore) {
      removeFromStore(id);
    }
  });

  const isString = value =>
    typeof value === 'string' || value instanceof String;

  return (
    <Button
      w="224px"
      h={h}
      borderRadius="4px"
      margin="8px"
      padding="0"
      border={`2px solid ${colors.darkGray}`}
      bg={color}
      fontSize="14px"
      flexDirection="row"
      {...(clickable && { onClick: onClose })}
      {...(!clickable && { cursor: 'auto', boxShadow: 'none' })}
      {...props}
    >
      <Flex
        w="30px"
        // iPadOS was not handling h="100%" correctly
        h={h}
        margin="-2px 0 -2px -2px"
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
          {reward && <Text>{reward}</Text>}
          <Text {...(!reward && { w: '100%', textAlign: 'center' })}>
            ({subtitle})
          </Text>
        </Flex>
      </Box>
    </Button>
  );
};

export default Toast;
