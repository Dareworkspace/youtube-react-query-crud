import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import customFetch from './utils';
const Form = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const { mutate, isLoading } = useMutation({
    mutationFn: (taskTitle) => {
      return customFetch.post('/', { title: taskTitle });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    mutate(title);
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-row'>
        <label htmlFor='title' className='form-label'>
          Enter Task
        </label>
        <input
          type='text'
          className='form-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-block'>
        {isLoading ? 'please wait...' : 'submit'}
      </button>
    </form>
  );
};
export default Form;
