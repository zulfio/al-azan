import {Box, Button, Flex, HStack} from 'native-base';
import {useEffect, useState} from 'react';
import {styles} from './styles';
import {getPrayerTimes, PrayerTimesExtended} from '@/adhan';
import {ArrowBackIcon} from '@/assets/icons/arrow_back';
import {ArrowForwardIcon} from '@/assets/icons/arrow_forward';
import {RestoreIcon} from '@/assets/icons/restore';
import {UpdateIcon} from '@/assets/icons/update';
import {AppBar} from '@/components/AppBar';
import {PrayerTimesBox} from '@/components/PrayerTimesBox';
import {useStore} from '@/store/home';
import {useStore as useSettingStore} from '@/store/settings';
import {getDay, getDayName, getMonthName} from '@/utils/date';
import useInterval from '@/utils/hooks/use_interval';

export function Home() {
  const [
    currentDate,
    increaseCurrentDateByOne,
    decreaseCurrentDateByOne,
    updateCurrentDate,
  ] = useStore(state => [
    state.date,
    state.increaseCurrentDateByOne,
    state.decreaseCurrentDateByOne,
    state.updateCurrentDate,
  ]);
  const [prayerTimes, setPrayerTimes] = useState<
    PrayerTimesExtended | undefined
  >(undefined);

  const settingsState = useSettingStore(state => state);

  const todayName = getDayName(currentDate);
  const monthName = getMonthName(currentDate);

  useInterval(() => {
    updateCurrentDate();
  }, 60 * 1000);

  useEffect(() => {
    getPrayerTimes(currentDate).then(setPrayerTimes);
  }, [currentDate, settingsState]);

  return (
    <Box
      safeArea
      style={[styles.hCenter]}
      onTouchStart={() => updateCurrentDate()}>
      <AppBar
        dayName={todayName}
        monthName={monthName}
        dd={getDay(currentDate)}
      />
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <Button variant="ghost" onPress={() => decreaseCurrentDateByOne()}>
          <Flex direction="row" alignItems="center">
            <ArrowBackIcon size="2xl" />
            <RestoreIcon size="xl" />
          </Flex>
        </Button>
        <Button variant="ghost" onPress={() => increaseCurrentDateByOne()}>
          <Flex direction="row" alignItems="center">
            <UpdateIcon size="xl" />
            <ArrowForwardIcon size="2xl" />
          </Flex>
        </Button>
      </HStack>
      <PrayerTimesBox prayerTimes={prayerTimes} />
    </Box>
  );
}
