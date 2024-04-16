import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb2';
import CardTable from '../components/CardTable';
import Pagination from '../components/Pagination';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
// import { fetchBusinesses } from '../hooks/axiosApis';
import { fetchBusinesses } from './../hooks/axiosApis';

const Teachers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { user } = useContext(AuthContext);
  const info = { token: user?.token || user.accessToken, page, limit };
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['business', page, limit],
      queryFn: () => fetchBusinesses(info),
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (isPlaceholderData) {
      console.log('isPlaceholderData', isPlaceholderData);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError, isPlaceholderData]);

  return (
    <div className="relative min-h-[800px]">
      <Breadcrumb
        pageName="Business"
        link="add-business"
        linkName="add business"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTable data={data?.data?.data} />
      </div>
      <div className="absolute bottom-2 w-full mt-10 flex items-center justify-end gap-2 p-2 bg-white shadow">
        <div className="flex items-center">
          <label className="mr-2.5 block text-black dark:text-white">
            Page Limit
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
        <Pagination data={data?.data} setPage={setPage} page={page} />
      </div>
      {isFetching || isPending ? <Loader /> : ''}
    </div>
  );
};

export default Teachers;
