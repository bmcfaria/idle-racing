import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import { BottomSpacer } from './BottomSpacer';
import CardDealer from './CardDealer';
import { useSelector } from 'react-redux';
import { dealerBrandsSelector } from '../state/selectors';

const Dealer = props => {
  const brands = useSelector(dealerBrandsSelector);
  const containerDealersWidth = useDynamicCardContainerWidth(320);

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
        {brands.map(brand => (
          <Box marginRight="16px" marginBottom="16px" key={brand.type}>
            <CardDealer brandType={brand.type} brandName={brand.name} />
          </Box>
        ))}
      </Flex>
      <BottomSpacer />
    </Box>
  );
};

export default Dealer;
