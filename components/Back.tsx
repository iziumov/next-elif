'use client';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const Back = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="mb-4 text-2xl hover:cursor-pointer hover:opacity-75" onClick={handleBack}>
      <MdOutlineKeyboardBackspace size={36} />
    </div>
  );
};

export default Back;
