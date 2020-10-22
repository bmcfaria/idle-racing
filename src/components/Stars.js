import React, { useEffect } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { stars } from '../helpers/stars';
import { BottomSpacer } from './BottomSpacer';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { starsSelector } from '../state/selectors';
import { openStarsAction } from '../state/actions';

const StarItem = ({ star, active, ...props }) => (
  <Flex
    borderRadius="16px"
    minW="160px"
    w="160px"
    h="48px"
    {...(!active && {
      bg: colors.lightGray,
    })}
    border={`1px solid ${colors.darkGray}`}
    lineHeight="16px"
    alignItems="center"
    {...props}
  >
    {active && (
      <Flex
        minW="40px"
        w="40px"
        h="48px"
        borderRadius="16px 0 0 16px"
        marginLeft="-1px"
        color={colors.white}
        bg={colors.darkGray}
      >
        <Box maxW="24px" maxH="24px" margin="auto" as={StarIcon} />
      </Flex>
    )}
    <Box flexGrow="1" padding="0 4px">
      <Text textAlign="center">{star.name}</Text>
    </Box>
  </Flex>
);

const Stars = () => {
  // stars object is rewritten very frequently
  const completedStars = useSelector(starsSelector, shallowEqual);
  const dispatch = useDispatch();
  const containerWidth = useDynamicCardContainerWidth(160, 8, 16);

  useEffect(() => {
    dispatch(openStarsAction);
  }, [dispatch]);

  return (
    <Flex w="100%" direction="column" alignItems="center">
      <Box
        w={`${containerWidth}px`}
        minWidth="320px"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
        gridGap="8px"
      >
        {stars.map(star => (
          <StarItem
            star={star}
            active={completedStars[star.id]}
            key={star.id}
            margin="auto"
          />
        ))}
      </Box>

      <BottomSpacer />
    </Flex>
  );
};

export default Stars;
