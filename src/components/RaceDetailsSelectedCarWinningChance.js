import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';
import { CardWinningChanceComponent } from './CardWinningChance';
import { winProbability } from '../helpers/utils';
import { zIndex } from '../helpers/theme';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { tutorialWinChanceSelector } from '../state/selectors';
import { disableTutorialWinChanceAction } from '../state/actions';
import Button from './Button';
import CallForAttention from './CallForAttention';

const GOOD_VALUE = 3;

const RaceDetailsSelectedCarWinningChance = ({ car, track, ...props }) => {
  const [showTip, setShowTip] = useState();
  const [hover, setHover] = useState();
  const dispatch = useDispatch();
  const showTutorial = useSelector(tutorialWinChanceSelector);
  const winProbabilityValue = track && winProbability(car, track);

  const goodChances = winProbabilityValue === GOOD_VALUE;

  const toggleTip = () => {
    setShowTip(!showTip);
    if (showTutorial) {
      dispatch(disableTutorialWinChanceAction);
    }
  };

  return (
    <Flex
      direction="column"
      position="relative"
      cursor="pointer"
      onClick={toggleTip}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {showTip && (
        <Box
          top="0"
          left="0"
          width="100%"
          height="100%"
          position="fixed"
          bg="#000000c0"
          display="flex"
          zIndex={zIndex.modalBackground}
        ></Box>
      )}

      {showTip && (
        <Flex
          position="absolute"
          top={`-${(24 + 4) * (GOOD_VALUE - winProbabilityValue) + 16}px`}
          w="100%"
          h={`${
            16 +
            (GOOD_VALUE + 1) * 24 +
            GOOD_VALUE * 3 +
            2 +
            16 +
            (goodChances ? 40 : 90) +
            16
          }px`}
          bg="white"
          padding="16px 8px"
          borderRadius="16px"
          zIndex={zIndex.winChanceTip}
        >
          <Text
            w="100%"
            h={goodChances ? '40px' : '90px'}
            marginTop="auto"
            textAlign="center"
            fontSize="14px"
          >
            {goodChances
              ? 'You have good chances of winning'
              : 'You can upgrade your car or use a better one to improve your chances of winning'}
          </Text>
        </Flex>
      )}

      <Box>
        {showTip && Number.isInteger(winProbabilityValue) && (
          <Box
            top={`-${4 + (24 + 4) * (GOOD_VALUE - winProbabilityValue)}px`}
            left="8px"
            position="absolute"
            w="calc(100% - 16px)"
            zIndex={zIndex.winChanceTip}
          >
            {[...Array(GOOD_VALUE - winProbabilityValue).keys()].map(
              (_, index) => (
                <CardWinningChanceComponent
                  key={index + 1}
                  winProbabilityValue={GOOD_VALUE - index}
                  borderRadius="16px"
                  w="100%"
                  h="24px"
                  marginTop="4px"
                  short
                />
              )
            )}
          </Box>
        )}

        <Box
          w="100%"
          h="24px"
          bg={showTip ? 'black' : 'unset'}
          top={showTip ? '-2px' : 0}
          padding={showTip ? '2px 0' : 0}
          position="absolute"
          zIndex={showTip ? zIndex.winChanceTip : 'unset'}
        >
          <Button
            borderRadius="16px"
            w="calc(100% - 16px)"
            h="100%"
            marginLeft="8px"
            padding="0"
            bg="transparent"
            verticalAlign="top"
          >
            <CardWinningChanceComponent
              winProbabilityValue={winProbabilityValue}
              fontSize="14px"
              lineHeight="24px"
              short
            />
            {!showTip && (
              <Box
                as={hover ? MdInfo : MdInfoOutline}
                w="16px"
                h="16px"
                top="4px"
                right="8px"
                position="absolute"
                zIndex={'unset'}
              />
            )}
          </Button>
        </Box>

        {showTutorial && (
          <CallForAttention
            w="calc(100% - 16px)"
            h="24px"
            borderRadius="16px"
            position="absolute"
            left="8px"
          />
        )}

        {showTip && Number.isInteger(winProbabilityValue) && (
          <Box
            top={`${24}px`}
            left="8px"
            position="absolute"
            w="calc(100% - 16px)"
            zIndex={zIndex.winChanceTip}
          >
            {[...Array(winProbabilityValue).keys()].map((_, index) => (
              <CardWinningChanceComponent
                key={index + 1}
                winProbabilityValue={winProbabilityValue - (index + 1)}
                borderRadius="16px"
                w="100%"
                h="24px"
                marginTop="4px"
                short
              />
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default RaceDetailsSelectedCarWinningChance;
