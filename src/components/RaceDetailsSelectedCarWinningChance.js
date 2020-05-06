import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';
import { CardWinningChanceComponent } from './CardWinningChance';
import { winProbability } from '../helpers/utils';
import { zIndex } from '../helpers/theme';
import { MdInfo, MdInfoOutline } from 'react-icons/md';

const GOOD_VALUE = 3;

const RaceDetailsSelectedCarWinningChance = ({ car, track, ...props }) => {
  const [showTip, setShowTip] = useState();
  const [hover, setHover] = useState();
  const winProbabilityValue = track && winProbability(car, track);

  const goodChances = winProbabilityValue === GOOD_VALUE;

  const toggleTip = () => {
    setShowTip(!showTip);
  };

  return (
    <Flex
      direction="column"
      position="relative"
      cursor="pointer"
      minH="24px"
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
            (goodChances ? 20 : 40) +
            16
          }px`}
          bg="white"
          padding="16px 8px"
          borderRadius="16px"
          zIndex={zIndex.winChanceTip}
        >
          <Text
            w="100%"
            h={goodChances ? '20px' : '40px'}
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
                  winProbabilityValue={GOOD_VALUE - index}
                  borderRadius="16px"
                  border="1px solid black"
                  w="100%"
                  h="24px"
                  marginTop="4px"
                />
              )
            )}
          </Box>
        )}

        <Box
          w="100%"
          bg={showTip ? 'black' : 'unset'}
          top={showTip ? '-2px' : 0}
          padding={showTip ? '2px 0' : 0}
          position="absolute"
          zIndex={showTip ? zIndex.winChanceTip : 'unset'}
        >
          <CardWinningChanceComponent
            winProbabilityValue={winProbabilityValue}
            borderRadius="16px"
            border="1px solid black"
            w="calc(100% - 16px)"
            h="24px"
            marginLeft="8px"
          />
          {!showTip && (
            <Box
              as={hover ? MdInfo : MdInfoOutline}
              w="16px"
              h="16px"
              top={'4px'}
              right="16px"
              position="absolute"
              zIndex={'unset'}
            />
          )}
        </Box>

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
                winProbabilityValue={winProbabilityValue - (index + 1)}
                borderRadius="16px"
                border="1px solid black"
                w="100%"
                h="24px"
                marginTop="4px"
              />
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default RaceDetailsSelectedCarWinningChance;
