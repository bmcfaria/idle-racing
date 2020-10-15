import React, { useEffect, useState } from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { colors } from '../helpers/theme';
import Button from './Button';
import UpgradableCircle from './UpgradableCircle';

const ExperienceUpgradesCard = ({
  text,
  base = 0,
  value = 0,
  max = 1,
  onClick,
  bg,
  innerTextArray = [],
  availablePoints,
  lockedText,
  confirmationState,
  setConfirmationState,
  notEnoughPointsCb,
  ...props
}) => {
  const [hoverOnAttr, setHoverOnAttr] = useState();
  const [showNextTouchTimeout, setShowNextTouchTimeout] = useState();

  const clickable = value < max && !lockedText;
  const inConfirmationState = confirmationState === text;
  const showNext = (clickable && hoverOnAttr) || inConfirmationState;

  useEffect(() => {
    let touchHoverTimeout;
    if (showNextTouchTimeout && !inConfirmationState) {
      touchHoverTimeout = setTimeout(() => {
        setShowNextTouchTimeout();
        setHoverOnAttr();
      }, 1500);
    }

    return () => {
      clearTimeout(touchHoverTimeout);
    };
  }, [showNextTouchTimeout, inConfirmationState]);

  const onMouseEnter = () => {
    setHoverOnAttr(true);
  };

  const onClickCard = e => {
    e.stopPropagation();

    if (!clickable) {
      return;
    }

    if (availablePoints > 0) {
      setConfirmationState(text);
    } else {
      notEnoughPointsCb();
    }
  };

  const onClickAndHandleFlag = e => {
    e.stopPropagation();
    if (onClick && clickable) {
      onClick();
    }

    setConfirmationState();
  };

  const onTouchStart = () => {
    // Only enable hover flag when not "upgrading"
    setHoverOnAttr(availablePoints === 0);
  };

  // Since touch devices don't have onHover like the desktop
  // the showNext will activate when a user touches the button
  // the timeOut will disable the showNext after 1.5s for better experience
  const onTouchEnd = () => {
    setShowNextTouchTimeout(true);
  };

  return (
    <Flex direction="column" margin="0 auto">
      <Button
        w="80px"
        h="104px"
        padding="4px 8px"
        border={`1px solid ${colors.darkGray}`}
        flexDirection="column"
        justifyContent="space-between"
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setHoverOnAttr()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClickCard}
        {...(!clickable && { cursor: 'auto', boxShadow: 'none' })}
        bg={value > 0 ? bg : colors.lightGray}
        position="relative"
        {...props}
      >
        {lockedText && (
          <Flex
            w="100%"
            h="100%"
            top="0"
            left="0"
            padding="4px"
            borderRadius="4px"
            direction="column"
            position="absolute"
            background={`linear-gradient(180deg, ${colors.white}00 0%, ${colors.white} 50%)`}
            zIndex="1"
          >
            <Text
              marginTop="auto"
              textAlign="center"
              whiteSpace="normal"
              lineHeight="14px"
            >
              {lockedText}
            </Text>
          </Flex>
        )}
        <Flex flexGrow="1" alignItems="center">
          <Text textAlign="center" whiteSpace="normal" lineHeight="14px">
            {text}
          </Text>
        </Flex>
        <UpgradableCircle
          base={base}
          value={value}
          max={max}
          showNextUpgradeValue={showNext}
        >
          {innerTextArray.length > 0 && (
            <Flex margin="auto" alignItems="center">
              <Text fontSize="14px" lineHeight="14px">
                {showNext
                  ? innerTextArray?.[value + 1]
                  : innerTextArray?.[value]}
              </Text>
            </Flex>
          )}
        </UpgradableCircle>
      </Button>
      {inConfirmationState && (
        <Button
          w="80px"
          marginTop="8px"
          bg={colors.darkGray}
          color={colors.white}
          onClick={onClickAndHandleFlag}
        >
          Confirm
        </Button>
      )}
    </Flex>
  );
};

export default ExperienceUpgradesCard;
