import { StyleSheet } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

type ApiError = {
  message: string | string[];
  error: string;
  statusCode: number;
};

const upperCaseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Error = ({ error }: { error: ApiError | undefined }) => {
  return (
    <Snackbar visible={!!error} onDismiss={() => undefined}>
      {typeof error?.message === 'string' ? (
        <Text style={styles.text}>{upperCaseFirstLetter(error?.message)}</Text>
      ) : (
        error?.message.map((msg) => (
          <Text key={msg} style={styles.text}>
            {upperCaseFirstLetter(msg)}
          </Text>
        ))
      )}
    </Snackbar>
  );
};

const styles = StyleSheet.create({ text: { color: 'white' } });
