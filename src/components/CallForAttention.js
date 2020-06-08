import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { colors } from '../helpers/theme';

const CallForAttention = styled(Box)`
  background-color: ${colors.white};
  animation: blink 0.5s alternate infinite;

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.9;
    }
  }
`;

export default CallForAttention;
