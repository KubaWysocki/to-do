import { GestureResponderEvent } from 'react-native';
import { Checkbox, List } from 'react-native-paper';

import { Link } from 'expo-router';

import useSWRMutation from 'swr/mutation';

import { fetcher } from '../app/_layout';
import { useTasksSWR } from '../app/index';
import { Task, TaskSchema } from '../validators';

export const TaskItem = ({ task }: { task: Task; backgroundColor?: string }) => {
  const { mutateTasks } = useTasksSWR(false);
  const { trigger: updateTask } = useSWRMutation(['/tasks/' + task.id, task], ([key, body]) =>
    fetcher([key, TaskSchema], {
      method: 'PUT',
      body: { ...body, status: body.status === 'DONE' ? 'TO_DO' : 'DONE' },
    }),
  );

  const handleCheckboxPress = async (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await updateTask();
    mutateTasks(result);
  };

  return (
    <Link
      href={'/task/' + task.id}
      style={{ maxWidth: '90%', width: 800, marginHorizontal: 'auto' }}
    >
      <List.Item
        title={task.title}
        description={task.description}
        titleStyle={{ color: 'black' }}
        left={() => (
          <Checkbox
            status={task.status === 'DONE' ? 'checked' : 'unchecked'}
            onPress={handleCheckboxPress}
          />
        )}
      />
    </Link>
  );
};
