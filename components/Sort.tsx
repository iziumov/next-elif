import useSortStore, { ESort } from '@/store/sort';

const Sort = () => {
  const { sort, setSort } = useSortStore();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as ESort;
    setSort(selectedSort);
  };
  return (
    <select className="align-start text-black" value={sort} onChange={handleSortChange}>
      <option className="text-black" value={ESort.all}>
        All
      </option>
      <option className="text-black" value={ESort.title}>
        Title
      </option>
      <option className="text-black" value={ESort.eventData}>
        Event Data
      </option>
      <option className="text-black" value={ESort.organizer}>
        Organizer
      </option>
    </select>
  );
};

export default Sort;
