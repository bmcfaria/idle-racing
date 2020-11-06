import React, { useEffect, useState } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import Modal from './Modal';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { stopRaceAction } from '../state/actions';
import { useRace, useTrack } from '../helpers/hooksRace';
import { useHistoryHelper } from '../helpers/hooks';
import getImageTrack from '../helpers/imageMappingTracks';

const StopRaceModal = props => {
  const location = useLocation();
  const history = useHistoryHelper();
  const raceId = location.state?.cancelRaceModal;
  const race = useRace(raceId);
  const track = useTrack(race?.track);
  const dispatch = useDispatch();
  const [imageContainerRef, setImageContainerRef] = useState();

  useEffect(() => {
    if (imageContainerRef) {
      const path = imageContainerRef
        ?.getElementsByTagName('path')?.[0]
        ?.getAttribute('d');

      let circleEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circleEl.setAttribute('r', 5);
      circleEl.setAttribute('fill', colors.blue);

      let animateMotionEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'animateMotion'
      );
      animateMotionEl.setAttribute('dur', '5s');
      animateMotionEl.setAttribute('repeatCount', 'indefinite');
      animateMotionEl.setAttribute('path', path);

      circleEl.appendChild(animateMotionEl);
      imageContainerRef.appendChild(circleEl);

      // Minor zoom out so it won't cut the animated circle
      const originalViewBox = imageContainerRef
        .getAttribute('viewBox')
        .split(' ');

      imageContainerRef.setAttribute(
        'viewBox',
        `${originalViewBox[0]} ${parseInt(originalViewBox[1]) - 2} ${
          originalViewBox[2]
        } ${parseInt(originalViewBox[3]) + 4}`
      );
    }
  }, [imageContainerRef]);

  const stopRace = () => {
    dispatch(stopRaceAction(raceId));
  };

  const onClose = () => {
    history.goBack();
  };

  return (
    <Modal isOpen={race} onClose={onClose}>
      <Flex
        direction="column"
        bg={colors.white}
        margin="32px"
        padding="24px"
        borderRadius="16px"
        {...props}
      >
        {track && (
          <Box
            ref={ref => setImageContainerRef(ref)}
            w="auto"
            h="52px"
            color={colors.darkGray}
            as={getImageTrack(track)}
          />
        )}

        <Text textAlign="center" fontSize="16px" marginTop="16px">
          {race?.auto ? 'Stop auto race' : 'Stop race'}
        </Text>
        <Flex marginTop="16px">
          <Button
            onClick={stopRace}
            minW="72px"
            h="32px"
            bg={colors.darkGray}
            color={colors.white}
          >
            Yes
          </Button>
          <Button
            onClick={onClose}
            minW="72px"
            h="32px"
            color={colors.darkGray}
            bg={colors.lightGray}
            marginLeft="16px"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default StopRaceModal;
