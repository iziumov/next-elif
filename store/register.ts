import { create } from 'zustand';

export enum EDidYouHear {
  socialmedia = 'SOCIALMEDIA',
  friends = 'FRIENDS',
  foundmyself = 'FOUNDMYSELF',
}

interface RegisterProps {
  id: string;
  name: string;
  email: string;
  birthday: string;
  whereDidYouHear: EDidYouHear | '';
  isOpen: boolean;
  setId: (id: string) => void;
  setOpen: () => void;
  setClose: () => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBirthday: (date: string) => void;
  setWhereDidYouHear: (where: EDidYouHear) => void;
  clearModal: () => void;
}

const useRegister = create<RegisterProps>((set) => ({
  id: '',
  name: '',
  email: '',
  birthday: '',
  whereDidYouHear: '',
  isOpen: false,
  setId: (id: string) => set({ id: id }),
  setOpen: () => set((state) => ({ ...state, isOpen: true })),
  setClose: () => set((state) => ({ ...state, isOpen: false })),
  setName: (name) => set((state) => ({ ...state, name })),
  setEmail: (email) => set((state) => ({ ...state, email })),
  setBirthday: (date) => set((state) => ({ ...state, birthday: date })),
  setWhereDidYouHear: (where) => set((state) => ({ ...state, whereDidYouHear: where })),
  clearModal: () =>
    set((state) => ({
      ...state,
      id: '',
      name: '',
      email: '',
      birthday: '',
      whereDidYouHear: '',
      isOpen: false,
    })),
}));

export default useRegister;
