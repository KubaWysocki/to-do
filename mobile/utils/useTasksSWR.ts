import { useCallback } from 'react';

import useSWR from 'swr';
import { z } from 'zod';

import { Task, TaskSchema } from './zod';

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
  return { ...rest, mutate, mutateTasks };
};
