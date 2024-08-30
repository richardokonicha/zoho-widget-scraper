export default function Search({ setSearchValue }: any) {
  return (
    <div className="flex">
      <input
        type="text"
        className=" mr-8  sm:w-48 sm:pl-10 p-1.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary block appearance-none leading-normal"
        placeholder="Search here!"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}