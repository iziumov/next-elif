import useSWR from 'swr';
import fetcher from './fetcher';

const useEvents = () => {
  const { data, error, isLoading } = useSWR(`/api/event`, fetcher);

  return { data, error, isLoading };
};

export default useEvents;
