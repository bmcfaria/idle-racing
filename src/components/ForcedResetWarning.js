import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors, zIndex } from '../helpers/theme';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { warningsSelector } from '../state/selectors';
import { useLocation } from 'react-router-dom';
import { clearStoreResetAction } from '../state/actions';
import { useHistoryHelper } from '../helpers/hooks';

const ForcedResetWarning = props => {
  const dispatch = useDispatch();
  const warnings = useSelector(warningsSelector);
  const location = useLocation();
  const history = useHistoryHelper();
  const showModal = location.state?.warningStoreReset;

  useEffect(() => {
    if (warnings?.storeReset && !showModal) {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), warningStoreReset: true },
      });
    }
  }, [history, location.pathname, location.state, showModal, warnings]);

  const onClose = () => {
    dispatch(clearStoreResetAction);
    history.goBack();
  };

  return (
    <Modal isOpen={showModal} onClose={onClose} zIndex={zIndex.warningModal}>
      <Flex
        direction="column"
        bg={colors.white}
        margin="32px"
        padding="24px"
        borderRadius="16px"
        {...props}
      >
        <Text textAlign="center" fontSize="24px">
          Forced reset
        </Text>
        <Text textAlign="center" marginTop="16px">
          Your previous saved game was incompatible with the current game
          version
        </Text>
        <Text textAlign="center" marginTop="16px">
          (The game is still under development)
        </Text>
      </Flex>
    </Modal>
  );
};

export default ForcedResetWarning;
