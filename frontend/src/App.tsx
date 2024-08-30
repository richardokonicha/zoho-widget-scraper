import Header from './components/Header';
import useFetch from './components/useFetch';
import { DataTable, SkeletonTable } from './components/DataTable';

function App() {
  const { data, refetch, fetching } = useFetch();
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="mt-8 container mx-auto px-4 flex justify-center items-center min-h-fit ">
        <div>
          <div className="bg-background min-h-screen">
            {data ? (
              <DataTable data={data}/>
            ) : (
              <SkeletonTable/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;