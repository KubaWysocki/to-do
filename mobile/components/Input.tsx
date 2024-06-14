import { FC } from 'react';
import { TextInput } from 'react-native-paper';

export const Input: FC<{
  value: string;
  setValue?: (newValue: string) => void;
  label: string;
  disabled?: boolean;
  multiline?: boolean;
}> = ({ value, setValue, label, disabled, multiline }) => {
  return (
    <TextInput
      disabled={disabled}
      dense
      label={label}
      style={{ width: '80%', marginVertical: 8, height: multiline ? 120 : undefined }}
      value={value}
      onChangeText={(value) => setValue?.(value)}
      mode="outlined"
      multiline={multiline}
    />
  );
};
