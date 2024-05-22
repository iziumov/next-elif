import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex flex-1 align-center justify-center animate-spin">
      <FaSpinner size={54} color="white" className="animate-spin" />
    </div>
  );
};

export default Spinner;
