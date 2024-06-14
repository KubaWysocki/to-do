import { ReactNode } from 'react';
import { View } from 'react-native';

export const CenteredContent = ({
  children,
  backgroundColor = 'white',
}: {
  children: ReactNode | undefined;
  backgroundColor?: string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
};
