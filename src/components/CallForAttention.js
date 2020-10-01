import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { colors } from '../helpers/theme';

const CallForAttention = styled(Box)`
  animation: call-for-attention-blink 0.5s alternate infinite;

  @keyframes call-for-attention-blink {
    0% {
      background: transparent;
    }
    100% {
      background: ${colors.white};
    }
  }
`;

export default CallForAttention;
