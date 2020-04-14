import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { MdNotifications } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notificationsSelector } from '../state/selectors';

const NotificationItem = ({ item, onClose }) => {
  const location = useLocation();
  const history = useHistory();
  const won = item?.won;
  const trackId = item?.track?.id;
  const trackName = item?.track?.name;
  const award = item?.award;
  const position = item?.position;
  const carName = item?.car?.name;
  const carId = item?.car?.id;

  const onClick = () => {
    history.push({
      pathname: '/race',
      state: {
        ...(location.state || {}),
        race: trackId,
        car: carId,
      },
    });

    onClose();
  };

  return (
    <Box
      borderBottom="solid 1px black"
      onClick={onClick}
      paddingLeft="0.5rem"
      paddingRight="0.5rem"
      backgroundColor="gray.100"
    >
      <Flex justifyContent="space-between">
        <Text>{won ? 'WON' : 'LOST'}</Text>
        <Text>{trackName}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{won ? award : position}</Text>
        <Text>{carName}</Text>
      </Flex>
    </Box>
  );
};

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const notifications = useSelector(notificationsSelector);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        as={MdNotifications}
        marginTop="auto"
        marginBottom="auto"
        size="1.5rem"
        w="2.5rem"
        paddingRight="0.5rem"
        paddingLeft="0.5rem"
        color={open ? 'white' : 'inherit'}
        zIndex="100"
        onClick={onClick}
      />
      <Box
        position="fixed"
        w="100%"
        h="100%"
        backgroundColor="black"
        opacity=".5"
        zIndex="99"
        display={open ? 'block' : 'none'}
        onClick={onClick}
      />
      <Box
        position="absolute"
        marginTop="2.5rem"
        right="0.1rem"
        w="13rem"
        h="13rem"
        backgroundColor="white"
        zIndex="100"
        display={open ? 'block' : 'none'}
      >
        {notifications.map(item => (
          <NotificationItem key={item.id} item={item} onClose={onClick} />
        ))}
      </Box>
    </>
  );
};

export default Notifications;
