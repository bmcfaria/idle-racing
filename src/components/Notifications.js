import React, { useState } from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  DrawerHeader,
  CircularProgress,
} from '@chakra-ui/core';
import { MdFlag } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  notificationsSelector,
  racesSelector,
  pastRacesSelector,
} from '../state/selectors';
import NotificationsActiveRace from './NotificationsActiveRace';
import NotificationsPastRace from './NotificationsPastRace';
import { useOpenClose } from '../helpers/hooks';
import { clearNotificationsAction } from '../state/actions';
import { colors } from '../helpers/theme';
import styled from '@emotion/styled';

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
  const [open, onOpen, onClose] = useOpenClose(false);
  const [page, setPage] = useState('races');
  const dispatch = useDispatch();
  const notifications = useSelector(notificationsSelector);
  const pastRaces = useSelector(pastRacesSelector);
  const races = useSelector(racesSelector);

  const clear = () => {
    dispatch(clearNotificationsAction);
  };

  const pageRaces = () => {
    setPage('races');
  };

  const pageHistory = () => {
    setPage('history');
  };

  const isRacing = races?.length > 0;

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
      <Drawer isOpen={open} onClose={onClose} placement="right" isFullHeight>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {page === 'races' && (
            <>
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
                    borderBottom="1px solid black"
                    margin="4px -4px"
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

              <DrawerFooter>
                <Flex w="100%" justifyContent="space-between">
                  <Button color="blue" onClick={pageHistory}>
                    Open history
                  </Button>
                  <Button color="blue" onClick={clear}>
                    Clear
                  </Button>
                </Flex>
              </DrawerFooter>
            </>
          )}

          {page === 'history' && (
            <>
              <DrawerHeader fontSize="24px">History</DrawerHeader>

              <DrawerBody>
                <Box>
                  {pastRaces.map(item => (
                    <NotificationsPastRace
                      key={item.id}
                      pastRace={item}
                      onClose={onClose}
                    />
                  ))}
                </Box>
              </DrawerBody>

              <DrawerFooter>
                <Button color="blue" onClick={pageRaces}>
                  Back
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
