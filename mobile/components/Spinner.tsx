import { ActivityIndicator } from 'react-native-paper';

import { CenteredContent } from './CenteredContent';

export const Spinner = () => {
  return (
    <CenteredContent>
      <ActivityIndicator animating size="large" />
    </CenteredContent>
  );
};
