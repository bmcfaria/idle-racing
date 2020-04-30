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
} from '@chakra-ui/core';
import { GiFlyingFlag } from 'react-icons/gi';
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

  return (
    <>
      <Box
        as={GiFlyingFlag}
        marginTop="auto"
        marginBottom="auto"
        size="1.5rem"
        w="2.5rem"
        paddingRight="0.5rem"
        paddingLeft="0.5rem"
        color={open ? 'white' : 'inherit'}
        zIndex="100"
        onClick={onOpen}
      />
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
