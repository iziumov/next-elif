'use client';
import useRegister from '@/store/register';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
};

const Event = ({ title, description, id, organizer, date }: Event) => {
  const { setOpen, setId } = useRegister();
  const handleRegister = (id: string) => {
    setId(id);
    setOpen();
  };

  return (
    <div className="border-white border-[1px] flex flex-col gap-1 px-3 py-4">
      <h1 className="text-3xl">{title}</h1>
      <h3 className="text-lg">{description}</h3>
      <div className="mt-4 flex justify-between">
        <button
          className="text-xl hover:underline hover:opacity-75"
          onClick={() => handleRegister(id)}>
          Register
        </button>
        <Link className="text-xl hover:underline hover:opacity-75" href={`/event/${id}`}>
          View
        </Link>
      </div>
      <div>organizer: {organizer}</div>
      <div>Date: {date}</div>
    </div>
  );
};

export default Event;
