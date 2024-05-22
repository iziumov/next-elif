'use client';

import { useEffect, useState } from 'react';
import { Back, Spinner } from '@/components';
import useEvent from '@/hooks/useEvent';
import useEventStore, { ParticipantProps, EventProps } from '@/store/event';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading, error } = useEvent(id);
  const { search, event, setEvent, setSearch } = useEventStore();
  const [filteredParticipants, setFilteredParticipants] = useState<ParticipantProps[]>([]);

  useEffect(() => {
    if (data) {
      setEvent(data as EventProps);
    }
  }, [data, setEvent]);

  useEffect(() => {
    if (event) {
      const filtered = event.participants.filter(
        (participant) =>
          participant.fullName.toLowerCase().includes(search.toLowerCase()) ||
          participant.email.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredParticipants(filtered);
    }
  }, [search, event]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex-1 flex flex-col gap-2">
      <Back />
      <h2 className="text-3xl">Title: {event?.title}</h2>
      <h3 className="text-2xl">Description: {event?.description}</h3>
      <div className="flex justify-between">
        <h4 className="text-xl">Participants: </h4>
        <input
          className="px-5 py-1 text-black"
          type="text"
          placeholder="find user by email or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-8">
        {filteredParticipants.length > 0 ? (
          filteredParticipants.map((participant) => (
            <div
              key={participant.email}
              className="border-white border-[1px] flex flex-col gap-1 px-2 py-3">
              <p>{participant.fullName}</p>
              <p>{participant.email}</p>
            </div>
          ))
        ) : (
          <div>No participants found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
