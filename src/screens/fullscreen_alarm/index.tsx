import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, Box, Button, StatusBar, Spacer} from 'native-base';
import {useLayoutEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {Prayer, prayerTranslations} from '@/adhan';
import {i18n} from '@/i18n';
import {replace} from '@/navigation/root_navigation';
import {RootStackParamList} from '@/navigation/types';
import {cancelAdhanNotif, isAdhanPlaying} from '@/notifee';
import {SetAlarmTaskOptions} from '@/tasks/set_alarm';
import {getTime24} from '@/utils/date';

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FullscreenAlarm'
>;

export function FullscreenAlarm({route}: ScreenProps) {
  const [adhanOptions, setAdhanOptions] = useState<SetAlarmTaskOptions>({
    date: new Date(),
    prayer: Prayer.Motn,
  });

  useLayoutEffect(() => {
    isAdhanPlaying()
      .then(isPlaying => {
        if (isPlaying) {
          const parsedAdhanOptions = JSON.parse(
            route.params.options,
          ) as SetAlarmTaskOptions;
          parsedAdhanOptions.date = new Date(parsedAdhanOptions.date);
          setAdhanOptions(parsedAdhanOptions);
        } else {
          throw new Error('Not playing adhan anymore');
        }
      })
      .catch(() => replace('Home'));
  }, [route.params.options]);

  const onDismissPress = async () => {
    const isPlaying = await isAdhanPlaying();
    if (isPlaying) {
      await cancelAdhanNotif();
      BackHandler.exitApp();
    } else {
      replace('Home');
    }
  };

  return (
    <Box
      flex={1}
      flexDirection="column"
      safeArea
      alignItems="stretch"
      display="flex">
      <StatusBar />
      <Text
        textAlign="center"
        fontSize="sm"
        borderBottomWidth={1}
        borderBottomColor="coolGray.300">
        Adhan
      </Text>
      <Box margin="2">
        <Text textAlign="center" fontSize="6xl" marginBottom={3}>
          {i18n._(prayerTranslations[adhanOptions.prayer.toLowerCase()])}
        </Text>
        <Text fontSize="4xl" textAlign="center">
          At {getTime24(adhanOptions.date)}
        </Text>
      </Box>
      <Spacer />
      <Button height="100" onPress={onDismissPress} margin="2">
        <Text fontSize="3xl" adjustsFontSizeToFit>
          Dismiss
        </Text>
      </Button>
    </Box>
  );
}
