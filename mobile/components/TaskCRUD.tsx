import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

import { fetcher } from '../utils/fetcher';
import { useTasksSWR } from '../utils/useTasksSWR';
import { Task, TaskSchema, TaskCreateInputSchema, TaskUpdateInputSchema } from '../utils/zod';
import { CenteredContent } from './CenteredContent';
import { Error } from './Error';
import { Input } from './Input';
import { Spinner } from './Spinner';

const statusList: { label: string; value: Task['status'] }[] = [
  { label: 'To-Do', value: 'TO_DO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
];

export const TaskCRUD = () => {
  const { id } = useLocalSearchParams();
  const { mutateTasks } = useTasksSWR(false);
  const { data, error, isLoading, mutate } = useSWR<Task>(
    id ? ['/tasks/' + id, TaskSchema] : null,
    { revalidateOnMount: true },
  );

  const [task, setTask] = useState({
    title: data?.title || '',
    description: data?.description || '',
    status: data?.status || 'TO_DO',
  });
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [edit, setEdit] = useState(!id);
  useEffect(() => {
    if (data) {
      const newData: z.infer<typeof TaskUpdateInputSchema> = { ...data };
      delete newData.id;
      setTask(newData);
    }
  }, [data]);
  useFocusEffect(useCallback(() => () => setEdit(false), []));

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: edit && id ? 'Edit Task' : id ? 'Task Details' : 'Create Task',
    });
  }, [navigation, id, edit]);

  const {
    trigger: createTask,
    error: errCreate,
    reset: resetCreate,
  } = useSWRMutation(['/tasks', task], ([key, body]) =>
    fetcher([key, TaskCreateInputSchema, TaskSchema], { method: 'POST', body }),
  );
  const {
    trigger: updateTask,
    error: errUpdate,
    reset: resetUpdate,
  } = useSWRMutation(['/tasks/' + id, task], ([key, body]) =>
    fetcher([key, TaskUpdateInputSchema, TaskSchema], { method: 'PUT', body }),
  );
  const {
    trigger: deleteTask,
    error: errDelete,
    reset: resetDelete,
  } = useSWRMutation('/tasks/' + id, (key) => fetcher([key, TaskSchema], { method: 'DELETE' }));

  if (isLoading) {
    return <Spinner />;
  }

  const handleTaskChange = (key: keyof Task) => (value: string) => {
    setTask((prev) => ({ ...prev!, [key]: value }));
  };

  const handleSave = async () => {
    const promise = id ? updateTask : createTask;
    const result = await promise();
    delete result.id;
    setTask(result);
    mutateTasks(result);
    if (id) {
      setEdit(false);
    } else {
      router.replace('/task/' + result.id);
    }
  };

  const handleDelete = async () => {
    await deleteTask();
    router.push('/');
  };

  return (
    <>
      <CenteredContent>
        <Input
          value={task?.title || ''}
          label="Title"
          disabled={!edit}
          setValue={handleTaskChange('title')}
        />
        <Input
          value={task?.description || ''}
          label="Description"
          disabled={!edit}
          setValue={handleTaskChange('description')}
          multiline
        />
        {data && (
          <>
            <Input value={data?.createdAt.toLocaleString() || ''} label="Created At" disabled />
            <DropDown
              value={task.status}
              label="Status"
              inputProps={{ disabled: !edit }}
              setValue={handleTaskChange('status')}
              mode="outlined"
              visible={showStatusDropdown}
              showDropDown={() => edit && setShowStatusDropdown(true)}
              onDismiss={() => setShowStatusDropdown(false)}
              list={statusList}
            />
          </>
        )}
        <View style={{ marginTop: 16 }} />
        {!edit ? (
          <Button icon="file-document-edit" mode="elevated" onPress={() => setEdit(true)}>
            Edit
          </Button>
        ) : (
          <Button icon="content-save" mode="contained" onPress={handleSave}>
            Save
          </Button>
        )}
        {id && (
          <View style={{ marginTop: 16 }}>
            <Button
              icon="content-save"
              mode="contained"
              onPress={handleDelete}
              style={{ backgroundColor: 'red' }}
            >
              Delete
            </Button>
          </View>
        )}
      </CenteredContent>
      <Error
        error={error || errCreate || errUpdate || errDelete}
        reset={() =>
          resetCreate()! || resetUpdate() || resetDelete() || mutate(() => undefined, false)
        }
      />
    </>
  );
};
