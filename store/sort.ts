import { create } from 'zustand';

export enum ESort {
  all = '',
  eventData = 'eventData',
  organizer = 'organizer',
  title = 'title',
}

interface SortStoreProps {
  sort: ESort;
  setSort: (sort: ESort) => void;
}

const useSortStore = create<SortStoreProps>((set, get) => ({
  sort: ESort.title,
  setSort: (sort) => set({ sort: sort }),
}));

export default useSortStore;
