'use client';

import { Event, Sort, Spinner } from '@/components';
import useEvents from '@/hooks/useEvents';
import { EventProps } from '@/store/event';
import useSortStore, { ESort } from '@/store/sort';

const Home = () => {
  const { data, isLoading, error } = useEvents();
  const { sort } = useSortStore();

  if (isLoading) return <Spinner />;

  const sortedData = [...(data as EventProps[])].sort((a, b) => {
    switch (sort) {
      case ESort.title:
        return a.title.localeCompare(b.title);
      case ESort.eventData:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case ESort.organizer:
        return a.organizer.localeCompare(b.organizer);
      default:
        return 0;
    }
  });

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Sort />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-8">
        {sortedData.length > 0 ? (
          sortedData.map(({ title, id, description, organizer, date }) => (
            <Event
              key={id}
              id={id}
              title={title}
              description={description}
              organizer={organizer}
              date={date}
            />
          ))
        ) : (
          <div>No events available</div>
        )}
      </div>
    </main>
  );
};

export default Home;
