import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { openGarageCarAction } from '../state/actions';
import { colors } from '../helpers/theme';
import CarDetailsImageAndType from './CarDetailsImageAndType';
import CarDetailsGarageSell from './CarDetailsGarageSell';
import CarDetailsGarageAttributes from './CarDetailsGarageAttributes';
import CarDetailsGarageTuning from './CarDetailsGarageTuning';
import CarDetailsGarageColor from './CarDetailsGarageColor';
import { useDynamicCardContainerWidth } from '../helpers/hooks';
import Button from './Button';
import { useCarDetailsCustomTypeVisibility } from '../helpers/hooksGarage';

const BlockContainer = ({ children, ...props }) => (
  <Box onClick={e => e.stopPropagation()} {...props}>
    {children}
  </Box>
);

const CarDetailsGarage = ({ car, onClose, ...props }) => {
  const { id, name, reward } = car;
  const containerWidth = useDynamicCardContainerWidth(200, 2, 0);
  const [showColorPicker, setShowColorPicker] = useState();
  const [showTuning, setShowTuning] = useState();

  const customization = useCarDetailsCustomTypeVisibility('customization');
  const enabledColorPickerButton =
    customization.availableToBuy || customization.unlocked;

  const tuning = useCarDetailsCustomTypeVisibility('tuning');
  const enabledTuningButton = tuning.availableToBuy || tuning.unlocked;

  const dispatch = useDispatch();

  useEffect(() => {
    // To remove pending notifications (dot)
    dispatch(openGarageCarAction(id));
  }, [dispatch, id]);

  const cardBg = (reward && colors.green) || colors.lightBlue;

  return (
    <Box
      w={containerWidth}
      minW="200px"
      maxW={`${200 * 2 + 4}px`}
      margin="0 auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gridGap="4px"
      onClick={onClose}
    >
      <BlockContainer>
        <Flex
          position="relative"
          w="200px"
          h="224px"
          bg={cardBg}
          padding="1px"
          borderRadius="16px"
          direction="column"
          alignItems="center"
          style={{
            gridRowStart: 'span 28',
          }}
          {...props}
        >
          <CarDetailsImageAndType car={car} />
          <Text
            textAlign="center"
            margin="8px 0"
            fontSize="16px"
            lineHeight="16px"
          >
            {name}
          </Text>

          <Button
            onClick={() => setShowColorPicker(!showColorPicker)}
            minW="72px"
            h="32px"
            isDisabled={!enabledColorPickerButton}
            color={colors.white}
            bg={showColorPicker ? colors.purple : colors.darkGray}
            marginBottom="6px"
          >
            Color picker
          </Button>
        </Flex>
      </BlockContainer>

      {showColorPicker && (
        <BlockContainer>
          <CarDetailsGarageColor
            car={car}
            style={{
              gridRowStart: 'span 28',
            }}
          />
        </BlockContainer>
      )}

      <BlockContainer>
        <CarDetailsGarageAttributes
          car={car}
          style={{
            gridRowStart: 'span 23',
          }}
        >
          <Button
            onClick={() => setShowTuning(!showTuning)}
            minW="72px"
            h="32px"
            isDisabled={!enabledTuningButton}
            color={colors.white}
            bg={showTuning ? colors.purple : colors.darkGray}
          >
            Tuning
          </Button>
        </CarDetailsGarageAttributes>
      </BlockContainer>

      {showTuning && (
        <BlockContainer>
          <CarDetailsGarageTuning
            car={car}
            style={{
              gridRowStart: 'span 19',
            }}
          />
        </BlockContainer>
      )}

      <BlockContainer>
        <CarDetailsGarageSell
          car={car}
          style={{
            gridRowStart: 'span 9',
          }}
        />
      </BlockContainer>
    </Box>
  );
};

export default CarDetailsGarage;
