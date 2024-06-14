import { IconButton, PaperProvider } from 'react-native-paper';

import { Link, Stack } from 'expo-router';

import { SWRConfig } from 'swr';
import { ZodSchema, z } from 'zod';

export const fetcher = async <OutSchema extends ZodSchema, InSchema extends ZodSchema = OutSchema>(
  [key, outSchema, inSchema]: [key: string, schema: OutSchema, InSchema?],
  options: {
    [Property in keyof Omit<RequestInit, 'body'>]: RequestInit[Property];
  } & { body?: z.infer<OutSchema> },
): Promise<z.infer<OutSchema>> => {
  const res = await fetch(
    'http://localhost:3000' + key,
    options && {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: options.body && JSON.stringify(options.body),
    },
  );
  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return (inSchema || outSchema).parse(json);
};

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
