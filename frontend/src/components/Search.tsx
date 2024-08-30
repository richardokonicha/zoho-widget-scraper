// The search and filter components html and tailwind

// import type { SearchProps, ClickRatingEvent, Target } from '../react-app-env';

export default function Search({ setSearchValue, setRatingFilter, ratingFilter }: any) {
  const handleRatings = (e: any) => {
    const { value } = e.target;
    if (ratingFilter.includes(value) === true) {
      setRatingFilter(ratingFilter.filter((i: string) => i !== value));
    } else {
      setRatingFilter([...ratingFilter, value]);
    }
  };
  return (
    <div className="flex">
      <input
        type="text"
        className=" mr-8  sm:w-48 sm:pl-10 p-1.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary block appearance-none leading-normal"
        placeholder="Search here!"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex items-center sm:space-x-3 space-x-1 font-xs">
        {['1', '2', '3', '4', '5'].map((item: string) => (
          <button
            type="button"
            key={item}
            value={item}
            onClick={(e) => handleRatings(e)}
            className={
              `text-primary bg-white rounded-full flex justify-center items-center w-7 h-7 font-xs ${ratingFilter.includes(item) && 'bg-accent text-slate-50 '
              } hover:shadow-lg`
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}