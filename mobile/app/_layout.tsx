import { IconButton, PaperProvider } from 'react-native-paper';

import { Link, Stack } from 'expo-router';

import { SWRConfig } from 'swr';

import { fetcher } from '../utils/fetcher';

const BackButton = () => (
  <Link href="/">
    <IconButton icon="arrow-left"></IconButton>
  </Link>
);

export default function RootLayout() {
  return (
    <SWRConfig value={{ provider: () => new Map(), fetcher, shouldRetryOnError: false }}>
      <PaperProvider theme={{ dark: false }}>
        <Stack screenOptions={{ headerLeft: undefined }}>
          <Stack.Screen name="index" options={{ title: 'Task List', headerLeft: undefined }} />
          <Stack.Screen name="task/index" options={{ headerLeft: BackButton }} />
          <Stack.Screen name="task/[id]" options={{ headerLeft: BackButton }} />
        </Stack>
      </PaperProvider>
    </SWRConfig>
  );
}
