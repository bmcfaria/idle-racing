import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { globalStatsSelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import { formatDuration } from '../helpers/utils';

const HomeCardTimeStarted = props => {
  const [elapsedTime, setElapsedTime] = useState();
  const globalStats = useSelector(globalStatsSelector);

  useEffect(() => {
    const elapsedTimeUpdate = setInterval(() => {
      setElapsedTime(new Date().getTime() - globalStats?.firstBuy);
    }, 500);

    return () => {
      clearInterval(elapsedTimeUpdate);
    };
  }, [globalStats.firstBuy]);

  return (
    <Box
      w="160px"
      padding="8px 16px"
      borderRadius="16px"
      textAlign="center"
      bg={colors.orange}
      border={`1px solid ${colors.darkGray}`}
      {...props}
    >
      <Text w="100%" fontSize="20px" lineHeight="20px">
        First car bought
      </Text>
      {elapsedTime && (
        <Text fontSize="16px" lineHeight="16px" marginTop="8px">
          {formatDuration(elapsedTime)} ago
        </Text>
      )}
    </Box>
  );
};

export default HomeCardTimeStarted;
