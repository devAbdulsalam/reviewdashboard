import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb2';
import CardTable from '../components/CardTable';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import Pagination from '../components/Pagination';
import { fetchTransactions } from '../hooks/axiosApis';

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const { user } = useContext(AuthContext);
  const info = { token: user?.token || user.accessToken, page, limit };
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['projects', page, limit],
      queryFn: () => fetchTransactions(info),
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError]);

  return (
    <>
      <Breadcrumb
        pageName="Resources"
        link="add-resource"
        linkName="add resourse"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTable data={data?.data} />
      </div>
      <div>
        <div className="mb-4.5 flex items-center">
          <label className="mb-2.5 block text-black dark:text-white">
            Page Limit
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
      <Pagination data={data?.data} setPage={setPage} page={page} />
      {isFetching ? <Loader /> : ''}
      {isPending ? <Loader /> : ''}
    </>
  );
};
export default Transactions;
