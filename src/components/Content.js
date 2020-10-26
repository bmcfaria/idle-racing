import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { colors, MAX_WIDTH, MAX_WIDTH_VALUE } from '../helpers/theme';
import { useWindowDimensions } from '../helpers/hooks';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openPageAction } from '../state/actions';

const marginPaddingToEaseScrollbar = (scrollbarWidth, windowWidth) => {
  const diffBetweenWindowScrollMaxWidth =
    windowWidth - (MAX_WIDTH_VALUE + 2 * scrollbarWidth);

  if (scrollbarWidth === 0) {
    return { margin: 0, padding: 0 };
  }

  if (diffBetweenWindowScrollMaxWidth >= 0) {
    // The screen is large, therefore apply scrollbar full margin
    return { margin: scrollbarWidth, padding: 0 };
  }

  if (windowWidth <= MAX_WIDTH_VALUE) {
    // The overall screen is lower or equal to the max-width, therefore apply only padding
    return { margin: 0, padding: scrollbarWidth };
  } else {
    // It'll partially need margin and padding to cope with the scrollbar
    return {
      margin: scrollbarWidth + diffBetweenWindowScrollMaxWidth / 2,
      padding: Math.abs(diffBetweenWindowScrollMaxWidth / 2),
    };
  }
};

const Content = ({ children, ...props }) => {
  const ref = useRef();
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(openPageAction(location.pathname));
  }, [dispatch, location]);

  // Anytime the window is resized or a new page loaded
  // verify the presence and width of the scrollbar
  useLayoutEffect(() => {
    if (ref.current?.clientWidth) {
      setScrollbarWidth(windowWidth - ref.current.clientWidth);
    }
  }, [location.pathname, windowWidth, windowHeight]);

  // The scrollbar is applied to the content component and
  // to avoid having the component jumping to the left
  // whenever a scrollbar appears (windows for example)
  // it will add margin (parent padding) and padding
  // depending on the screen size and respecting the max-width design
  const {
    margin: marginForScrollbar,
    padding: paddingForScrollbar,
  } = marginPaddingToEaseScrollbar(scrollbarWidth, windowWidth);

  return (
    <Box
      ref={ref}
      w="100%"
      h="100%"
      paddingLeft={`${marginForScrollbar}px`}
      overflow="auto"
      {...props}
    >
      <Flex
        w="100%"
        maxW={MAX_WIDTH}
        minH="100%"
        paddingTop="2rem"
        paddingBottom="2rem"
        paddingLeft={`${paddingForScrollbar}px`}
        margin="0 auto"
        bg={colors.white}
        justifyContent="center"
      >
        {children}
      </Flex>
    </Box>
  );
};

export default Content;
