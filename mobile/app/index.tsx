import { FlatList, View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';

import { Link } from 'expo-router';

import { Error } from '../components/Error';
import { Spinner } from '../components/Spinner';
import { TaskItem } from '../components/TaskItem';
import { useTasksSWR } from '../utils/useTasksSWR';

export default function Index() {
  const { data, error, isLoading, mutate } = useTasksSWR();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <TaskItem task={item} />
            <Divider />
          </>
        )}
        keyExtractor={(task) => String(task.id)}
      />
      <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
        <Link href="/task">
          <IconButton
            icon="plus"
            iconColor="black"
            size={40}
            mode="outlined"
            style={{ backgroundColor: 'white' }}
          />
        </Link>
      </View>
      <Error error={error} reset={() => mutate(() => undefined, false)} />
    </>
  );
}
