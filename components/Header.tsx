import Link from 'next/link';
import { FaPastafarianism } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="py-4 flex justify-between border-white border-b-[1px]">
      <Link className="hover:opacity-75" href="/">
        <FaPastafarianism size={36} />
      </Link>
    </header>
  );
};

export default Header;
