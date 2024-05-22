import { create } from 'zustand';

type Participant = {
  fullName: string;
  email: string;
  wheredidyourhear: string;
  dateofbirth: string;
};

type Event = {
  title: string;
  description: string;
  date: string;
  participants: Participant[];
};

interface EventStoreProps {
  event: Event | null;
  search: string;
  setEvent: (event: Event) => void;
  addParticipant: (participant: Participant) => void;
  setSearch: (search: string) => void;
}

const useEventStore = create<EventStoreProps>((set, get) => ({
  event: null,
  search: '',
  setEvent: (event: Event) => set({ event }),
  addParticipant: (participant: Participant) =>
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
