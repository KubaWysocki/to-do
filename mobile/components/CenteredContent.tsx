import { ReactNode } from 'react';
import { View } from 'react-native';

export const CenteredContent = ({ children }: { children: ReactNode | undefined }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
    >
      {children}
    </View>
  );
};
