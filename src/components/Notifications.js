import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  CircularProgress,
} from '@chakra-ui/core';
import { MdFlag } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  notificationsSelector,
  racesSelector,
  raceSponsorsActiveSelector,
} from '../state/selectors';
import NotificationsActiveRace from './NotificationsActiveRace';
import NotificationsPastRace from './NotificationsPastRace';
import { useOpenClose } from '../helpers/hooks';
import { colors } from '../helpers/theme';
import styled from '@emotion/styled';
import { checkEndRaceAction, checkSponsorsAction } from '../state/actions';

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
  const sponsors = useSelector(raceSponsorsActiveSelector);

  const isRacing = races?.length > 0;

  useEffect(() => {
    const countDown = setInterval(() => {
      races.forEach(race => {
        dispatch(checkEndRaceAction(race.id));
      });

      if (Object.keys(sponsors).length > 0) {
        dispatch(checkSponsorsAction);
      }
    }, 500);

    return () => {
      clearInterval(countDown);
    };
  }, [dispatch, races, sponsors]);

  return (
    <>
      <Flex
        position="relative"
        zIndex="100"
        w="48px"
        h="48px"
        color={colors.white}
        onClick={onOpen}
      >
        <Box
          as={MdFlag}
          margin="auto"
          size="100%"
          w="24px"
          h="24px"
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
        <DrawerContent borderLeft={`2px solid ${colors.darkGray}`}>
          <DrawerCloseButton />
          <DrawerHeader fontSize="24px">Races</DrawerHeader>

          <DrawerBody>
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

            <Box>
              {notifications.map(item => (
                <NotificationsPastRace
                  key={item.id}
                  pastRace={item}
                  onClose={onClose}
                />
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
