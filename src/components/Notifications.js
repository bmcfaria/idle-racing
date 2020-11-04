import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  CircularProgress,
  Link,
} from '@chakra-ui/core';
import { ReactComponent as FlagIcon } from '../assets/icons/flag.svg';
import { useSelector, useDispatch } from 'react-redux';
import { notificationsSelector, racesSelector } from '../state/selectors';
import NotificationsActiveRace from './NotificationsActiveRace';
import { useOpenClose, usePassiveIncome } from '../helpers/hooks';
import { colors, zIndex } from '../helpers/theme';
import styled from '@emotion/styled';
import { clearNotificationsAction, syncAction } from '../state/actions';
import Toast from './Toast';

// Workaround to override the circle color without the theme color variants
const CustomCircularProgress = styled(CircularProgress)`
  circle {
    color: ${colors.white};
  }
  circle:nth-of-type(2) {
    color: ${colors.darkGray};
  }
`;

const Notifications = () => {
  const dispatch = useDispatch();
  const [open, onOpen, onClose] = useOpenClose(false);
  const notifications = useSelector(notificationsSelector);
  const races = useSelector(racesSelector);
  const passiveIncome = usePassiveIncome();

  const isRacing = races?.length > 0;

  useEffect(() => {
    // No need to start a timer without passive income or races
    if (passiveIncome === 0 && races.length === 0) {
      return;
    }

    const countDown = setInterval(() => {
      if (passiveIncome > 0 || races.length > 0) {
        dispatch(syncAction);
      }
    }, 500);

    return () => {
      clearInterval(countDown);
    };
  }, [dispatch, races, passiveIncome]);

  const clearNotifications = () => {
    dispatch(clearNotificationsAction);
  };

  return (
    <>
      <Flex
        position="relative"
        zIndex="100"
        w="48px"
        h="48px"
        color={colors.white}
        onClick={onOpen}
        cursor="pointer"
        style={{
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Box
          as={FlagIcon}
          margin="auto"
          size="100%"
          w="18px"
          h="18px"
          color={open ? 'black' : colors.white}
        />
        <CustomCircularProgress
          w="40px"
          h="40px"
          margin="4px"
          position="absolute"
          value={0}
          isIndeterminate={isRacing}
          capIsRound
        />
      </Flex>
      <Drawer isOpen={open} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent
          borderLeft={`2px solid ${colors.darkGray}`}
          zIndex={zIndex.sidebar}
        >
          <DrawerCloseButton />
          {notifications.length > 0 && (
            <Link
              top="12px"
              left="16px"
              position="absolute"
              border={`1px solid ${colors.darkGray}`}
              borderRadius="4px"
              bg={colors.red}
              padding="0 4px"
              onClick={clearNotifications}
            >
              Clear notifications
            </Link>
          )}

          <DrawerBody
            marginTop="48px"
            overflowY="auto"
            paddingBottom="env(safe-area-inset-bottom)"
          >
            <Box>
              {races.map(item => (
                <NotificationsActiveRace
                  key={item.id}
                  race={item.id}
                  item={item}
                  onClose={onClose}
                />
              ))}
            </Box>

            {notifications.length > 0 && (
              <Box
                w="calc(100% + 8px)"
                borderBottom={`1px solid ${colors.darkGray}`}
                margin="8px -4px"
              />
            )}

            <Flex direction="column" alignItems="center">
              {notifications.map(item => (
                <Toast
                  w="270px"
                  h="48px"
                  fontSize="16px"
                  key={item.id}
                  toast={item}
                  clickable={false}
                  margin="4px"
                />
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
