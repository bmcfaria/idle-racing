import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import CollapsiblePanel from './CollapsiblePanel';
import { BottomSpacer } from './BottomSpacer';
import CardRaceEvent from './CardRaceEvent';
import { useSelector } from 'react-redux';
import { raceEventsSelector } from '../state/selectors';

const Sponsors = props => (
  <CollapsiblePanel text="Sponsors (TBD)" {...props}></CollapsiblePanel>
);

const Race = props => {
  const events = useSelector(raceEventsSelector);
  const containerWidth = useDynamicCardContainerWidth(320);

  return (
    <Box {...props}>
      <Sponsors w={`${containerWidth - 16}px`} />

      <Flex
        wrap="wrap"
        margin="0 auto"
        paddingLeft={`${containerWidth > 0 ? 16 : 0}px`}
        boxSizing="content-box"
        w={`${containerWidth || 320}px`}
        marginTop="24px"
      >
        {events.map((event, index) => (
          <Box marginRight="16px" marginBottom="16px" key={index}>
            <CardRaceEvent eventType={event.type} eventName={event.name} />
          </Box>
        ))}
      </Flex>
      <BottomSpacer />
    </Box>
  );
};

export default Race;
