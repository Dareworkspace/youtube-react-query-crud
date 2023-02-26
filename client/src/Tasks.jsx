import customFetch from './utils';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
const Tasks = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const resp = await customFetch.get('/');
      return resp.data;
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;
  return (
    <section className='tasks'>
      {data.taskList.map((task) => {
        return (
          <div key={task.id}>
            <input
              type='checkbox'
              checked={task.isDone}
              onChange={(e) => {
                editTask({ taskId: task.id, isDone: e.target.checked });
              }}
            />
            <p style={{ textDecoration: task.isDone ? 'line-through' : null }}>
              {task.title}
            </p>

            <button className='btn' onClick={() => deleteTask(task.id)}>
              remove
            </button>
          </div>
        );
      })}
    </section>
  );
};
export default Tasks;
