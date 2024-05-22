import { create } from 'zustand';

export type ParticipantProps = {
  fullName: string;
  email: string;
  wheredidyourhear: string;
  dateofbirth: string;
};

export type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  organizer: string;
  participants: ParticipantProps[];
  createdAt: string;
};

interface EventStoreProps {
  event: EventProps | null;
  search: string;
  setEvent: (event: EventProps) => void;
  addParticipant: (participant: ParticipantProps) => void;
  setSearch: (search: string) => void;
}

const useEventStore = create<EventStoreProps>((set, get) => ({
  event: null,
  search: '',
  setEvent: (event: EventProps) => set({ event }),
  addParticipant: (participant: ParticipantProps) =>
    set((state) => {
      if (state.event) {
        return {
          event: {
            ...state.event,
            participants: [...state.event.participants, participant],
          },
        };
      }

      return state;
    }),
  setSearch: (search: string) => set({ search: search }),
}));

export default useEventStore;
