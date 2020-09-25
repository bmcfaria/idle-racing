import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import {
  useDynamicCardContainerWidth,
  useEventsLockedState,
} from '../helpers/hooks';
import { BottomSpacer } from './BottomSpacer';
import CardRaceEvent from './CardRaceEvent';
import { useSelector } from 'react-redux';
import { raceEventsSelector } from '../state/selectors';
import Button from './Button';
import { colors } from '../helpers/theme';
import Modal from './Modal';
import { useHistory, useLocation } from 'react-router-dom';

const RaceEvents = ({ containerWidth, showAll, ...props }) => {
  const events = useSelector(raceEventsSelector);

  const { isLocked: isLockedHook } = useEventsLockedState();
  const isLocked = eventType => isLockedHook(eventType) && !showAll;

  return (
    <Flex
      wrap="wrap"
      margin="0 auto"
      paddingTop="24px"
      paddingLeft={`${containerWidth > 0 ? 16 : 0}px`}
      boxSizing="content-box"
      w={`${containerWidth || 320}px`}
      {...props}
    >
      {events.map(event => (
        <React.Fragment key={event.type}>
          {!isLocked(event.type) && (
            <Box marginRight="16px" marginBottom="16px">
              <CardRaceEvent eventType={event.type} eventName={event.name} />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

const Race = props => {
  const location = useLocation();
  const history = useHistory();
  const containerWidth = useDynamicCardContainerWidth(320);

  const showAllEvents = location?.state?.allEvents;

  // To improve mobile navigation,
  // this way the back button will close the modal
  const openAllEvents = () => {
    if (location?.state?.track) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), allEvents: true },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), allEvents: true },
      });
    }
  };

  const closeAllEvents = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Box {...props}>
      <Button
        w={`${containerWidth > 0 ? containerWidth - 16 : 320}px`}
        marginLeft={`${containerWidth > 0 ? 16 : 0}px`}
        bg={colors.darkGray}
        color={colors.white}
        borderRadius="8px"
        onClick={openAllEvents}
      >
        All Race Events
      </Button>

      <Modal isOpen={showAllEvents} backOnClose>
        <RaceEvents
          containerWidth={containerWidth}
          showAll
          onClick={closeAllEvents}
        />
      </Modal>

      <RaceEvents containerWidth={containerWidth} />

      <BottomSpacer />
    </Box>
  );
};

export default Race;
