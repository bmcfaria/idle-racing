import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { BottomSpacer } from './BottomSpacer';
import CardDealer from './CardDealer';

const Dealer = props => {
  const containerDealersWidth = useDynamicCardContainerWidth(320);

  const brands = [
    { type: 'basic', name: 'basic' },
    { type: 'city', name: 'city' },
    { type: 'offroad', name: 'offroad' },
    { type: 'supercar', name: 'supercar' },
    { type: 'nascar', name: 'nascar' },
    { type: 'f1', name: 'f1' },
    { type: 'racer', name: 'racer' },
    { type: 'heavy', name: 'heavy' },
  ];

  return (
    <Box {...props}>
      <Flex
        wrap="wrap"
        margin="0 auto"
        paddingLeft={`${containerDealersWidth > 0 ? 16 : 0}px`}
        boxSizing="content-box"
        w={`${containerDealersWidth || 320}px`}
        marginTop="24px"
      >
        {brands.map((brand, index) => (
          <Box marginRight="16px" marginBottom="16px" key={index}>
            <CardDealer brandType={brand.type} brandName={brand.name} />
          </Box>
        ))}
      </Flex>
      <BottomSpacer />
    </Box>
  );
};

export default Dealer;
