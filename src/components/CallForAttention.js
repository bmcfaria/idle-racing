import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { colors } from '../helpers/theme';

const CallForAttention = styled(Box)`
  animation: blink 0.5s alternate infinite;

  @keyframes blink {
    0% {
      background: transparent;
    }
    100% {
      background: ${colors.white};
    }
  }
`;

export default CallForAttention;
