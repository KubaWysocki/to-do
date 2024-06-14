import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';

import { Link } from 'expo-router';

import useSWR from 'swr';
import { z } from 'zod';

import { Error } from '../components/Error';
import { Spinner } from '../components/Spinner';
import { TaskItem } from '../components/TaskItem';
import { Task, TaskSchema } from '../validators';

const ArrayOfTasks = z.array(TaskSchema);

export const useTasksSWR = (revalidateOnMount: boolean = true) => {
  const { mutate, ...rest } = useSWR<Task[]>(['/tasks', ArrayOfTasks], { revalidateOnMount });
  const mutateTasks = useCallback(
    (result: Task) =>
      mutate((data) => {
        const task = data?.find((task) => task.id === result.id);
        return task
          ? data?.map((task) => (task.id === result.id ? result : task))
          : [result].concat(data || []);
      }, false),
    [mutate],
  );
  return { ...rest, mutateTasks };
};

export default function Index() {
  const { data, error, isLoading } = useTasksSWR();

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
      <Error error={error} />
    </>
  );
}
