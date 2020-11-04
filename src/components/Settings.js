import React, { useEffect, useRef, useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors } from '../helpers/theme';
import {
  resetAndRecalculateAction,
  resetAndRecalculateWithStateAction,
} from '../state/actions';
import offroadRaceAll from '../dev/offroad_race_all.json';
import beforeAllRewardCars from '../dev/before_all_reward_cars.json';
import beforeAllMechanics from '../dev/before_all_mechanics.json';
import beforeAllRacesGreen from '../dev/before_all_races_green.json';
import beforeGettingAllCars from '../dev/before_getting_all_cars.json';
import allRacesGreen from '../dev/all_races_green.json';
import Button from './Button';

const inDev = process.env.NODE_ENV === 'development';

const loadSaveStates = {
  NONE: 'NONE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const Settings = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [loadSaveNotification, setLoadSaveNotification] = useState(
    loadSaveStates.NONE
  );

  useEffect(() => {
    const onChange = event => {
      const fileList = event.target.files;

      const reader = new FileReader();
      reader.addEventListener('load', event => {
        const decodedText = atob(event.target.result);
        try {
          dispatch(resetAndRecalculateWithStateAction(JSON.parse(decodedText)));
          setLoadSaveNotification(loadSaveStates.SUCCESS);
        } catch {
          setLoadSaveNotification(loadSaveStates.ERROR);
        }
      });

      reader.readAsText(fileList[0]);
    };

    const fileRefTmp = fileRef.current;
    if (fileRefTmp) {
      fileRefTmp.addEventListener('change', onChange);
    }
    return () => {
      fileRefTmp.removeEventListener('change', onChange);
    };
  }, [dispatch]);

  const reset = () => {
    dispatch(resetAndRecalculateAction);
  };

  const resetDev = state => {
    dispatch(resetAndRecalculateWithStateAction(state));
  };

  const downloadSaveFile = () => {
    const saveData = btoa(localStorage.getItem('state'));
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(saveData)
    );
    element.setAttribute('download', 'save.txt');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <Box>
      <Flex
        w="240px"
        padding="16px"
        borderRadius="16px"
        direction="column"
        bg={colors.lightGray}
        alignItems="center"
      >
        <Text lineHeight="18px" textAlign="center" fontSize="18px">
          Reset save data
        </Text>
        <Button marginTop="8px" bg={colors.red} onClick={reset}>
          Reset
        </Button>
      </Flex>
      <Flex
        w="240px"
        padding="16px"
        borderRadius="16px"
        marginTop="16px"
        direction="column"
        bg={colors.lightGray}
        alignItems="center"
      >
        <Text lineHeight="18px" textAlign="center" fontSize="18px">
          Load save data
        </Text>
        <Button
          as="label"
          htmlFor="upload-save"
          marginTop="8px"
          bg={colors.red}
        >
          Load
        </Button>
        <input
          id="upload-save"
          ref={fileRef}
          type="file"
          accept=".txt"
          style={{ display: 'none' }}
        />
        {loadSaveNotification === loadSaveStates.SUCCESS && (
          <Text marginTop="8px" padding="0 4px" bg={colors.green}>
            Success
          </Text>
        )}
        {loadSaveNotification === loadSaveStates.ERROR && (
          <Text marginTop="8px" padding="0 4px" bg={colors.red}>
            Bad file format
          </Text>
        )}
      </Flex>
      <Flex
        w="240px"
        padding="16px"
        borderRadius="16px"
        marginTop="16px"
        direction="column"
        bg={colors.lightGray}
        alignItems="center"
      >
        <Text lineHeight="18px" textAlign="center" fontSize="18px">
          Download save data
        </Text>
        <Button marginTop="8px" bg={colors.red} onClick={downloadSaveFile}>
          Download
        </Button>
      </Flex>
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Rich
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev({ money: 9999999999 })}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Enough for car and lvl1 upgrades
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev({ money: 722 })}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Offroad raced all
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(offroadRaceAll)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before all reward cars
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllRewardCars)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before All Mechanics
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllMechanics)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before All Races Green
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeAllRacesGreen)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            All races green
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(allRacesGreen)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Before Getting All Cars
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() => resetDev(beforeGettingAllCars)}
          >
            Reset
          </Button>
        </Flex>
      )}
      {inDev && (
        <Flex
          w="240px"
          padding="16px"
          borderRadius="16px"
          marginTop="16px"
          direction="column"
          bg={colors.lightGray}
          alignItems="center"
        >
          <Text lineHeight="18px" textAlign="center" fontSize="18px">
            Max Exp
          </Text>
          <Button
            marginTop="8px"
            bg={colors.red}
            onClick={() =>
              resetDev({
                money: 9999999999,
                experience: {
                  business: {
                    exp: 10 ** (3 * 3),
                  },
                  race: { exp: 10 ** (3 * 3) },
                  mechanic: {
                    exp: 10 ** (3 * 3),
                  },
                },
              })
            }
          >
            Reset
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Settings;
