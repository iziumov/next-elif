import useSWR from 'swr';
import fetcher from './fetcher';

const useEvent = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/event/${id}`, fetcher);

  return { data, error, isLoading };
};

export default useEvent;
