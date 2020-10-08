import React, { useContext, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { useRequirements } from '../helpers/hooksRace';
import CardCarSmallRace from './CardCarSmallRace';
import { RaceContext } from '../helpers/context';

const RaceDetailsCarsContainer = ({ cars, selectCar, onClose, ...props }) => {
  const containerWidth = useDynamicCardContainerWidth();
  const { requirements } = useContext(RaceContext);
  const { requirementText } = useRequirements();

  useEffect(() => {
    const escapeClose = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', escapeClose, false);

    return () => {
      document.removeEventListener('keydown', escapeClose, false);
    };
  }, [onClose]);

  const onClickChild = e => {
    e.stopPropagation();
  };

  return (
    <Flex borderRadius="16px" overflowX="hidden" onClick={onClose}>
      <Box
        w={`${containerWidth + 16}px`}
        borderRadius="16px"
        bg={colors.white}
        margin="auto"
        onClick={onClickChild}
      >
        {requirements.length > 0 && (
          <Flex justifyContent="space-around" flexWrap="wrap">
            {requirements.map((requirement, index) => (
              <Text
                margin="4px"
                minW="160px"
                textAlign="center"
                border={`2px solid ${colors.darkGray}`}
                key={index}
              >
                {requirementText(requirement)}
              </Text>
            ))}
          </Flex>
        )}
        <Flex
          w={`${containerWidth}px`}
          minH="240px"
          wrap="wrap"
          margin="0 auto"
          paddingTop="16px"
          paddingLeft="16px"
          boxSizing="content-box"
          {...props}
        >
          {cars.length === 0 && (
            <Flex margin="auto" direction="column">
              <Text textAlign="center" fontSize="24px">
                You need to buy a car first
              </Text>
              <ChakraLink
                as={Link}
                to="/dealer"
                fontSize="12px"
                color="teal.500"
                margin="8px auto 0"
              >
                go to Dealer
              </ChakraLink>
            </Flex>
          )}
          {cars.map(car => (
            <Box marginRight="16px" marginBottom="16px" key={car.id}>
              <CardCarSmallRace car={car} onClick={selectCar} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default RaceDetailsCarsContainer;
