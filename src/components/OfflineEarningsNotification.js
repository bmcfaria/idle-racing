import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { colors, zIndex } from '../helpers/theme';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { offlineEarningsSelector } from '../state/selectors';
import { useLocation, useHistory } from 'react-router-dom';
import { clearOfflineEarningsAction } from '../state/actions';

const OfflineEarningsNotification = props => {
  const dispatch = useDispatch();
  const offlineEarnings = useSelector(offlineEarningsSelector);
  const location = useLocation();
  const history = useHistory();
  const showModal = location.state?.offlineEarnings;

  useEffect(() => {
    if (offlineEarnings.value > 0 && !showModal) {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), offlineEarnings: true },
      });
    }
  }, [history, location.pathname, location.state, showModal, offlineEarnings]);

  const onClose = () => {
    dispatch(clearOfflineEarningsAction);
    history.goBack();
  };

  return (
    <Modal
      isOpen={showModal && offlineEarnings.value > 0}
      onClose={onClose}
      zIndex={zIndex.warningModal}
    >
      <Flex
        direction="column"
        bg={colors.white}
        margin="32px"
        padding="24px"
        borderRadius="16px"
        {...props}
      >
        <Text textAlign="center" fontSize="24px">
          While you were away
        </Text>
        <Text textAlign="center" marginTop="16px">
          You've earned ${offlineEarnings.value}
        </Text>
      </Flex>
    </Modal>
  );
};

export default OfflineEarningsNotification;
