import { CircularProgress } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { colors } from '../helpers/theme';

export const CustomCircularProgress = styled(CircularProgress)`
  circle {
    color: transparent;
  }
  circle:nth-of-type(2) {
    color: ${colors.blue};
  }
`;
