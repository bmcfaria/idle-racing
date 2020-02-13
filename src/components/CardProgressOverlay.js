import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex
} from "@chakra-ui/core";

const CardProgressOverlay = ({
  timeTotal = 1,
  timeLeft,
  label,
  big,
  ...props
}) => {
  const [value, setValue] = useState(timeLeft);
  const progress = ((timeTotal - value) * 100) / timeTotal;

  useEffect(() => {
    const countDown = setInterval(() => {
      setValue(prev => {
        const nextValue = prev - 1;
        if (nextValue <= 0) {
          clearInterval(countDown);
        }

        return nextValue;
      });
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, []);

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      flexDirection="column"
      {...props}
    >
      <Box margin="auto">
        <CircularProgress
          value={progress}
          color="blue"
          trackColor="blackAlpha"
          size={big ? "10rem" : "4rem"}
        >
          <CircularProgressLabel color="white">{value}s</CircularProgressLabel>
        </CircularProgress>
        {label && (
          <Text color="white" ontSize="sm">
            ({label})
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default CardProgressOverlay;
