import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import ChatCard from '../components/ChatCard.tsx';
import TableOne from '../components/UserTable.tsx';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader.tsx';
import { fetchDashboard } from '../hooks/axiosApis.js';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { useContext, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => fetchDashboard(user),
  });
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error]);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFour data={data?.totalUsers} />
        <CardTwo data={data?.totalBusiness} />
        <CardOne data={data?.totalListing} />
        <CardThree data={data?.totalReviews} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne data={data} />
        <ChartTwo data={data} />
        <ChartThree data={data} />
        <div className="col-span-12 xl:col-span-6">
          <ChatCard data={data} />
        </div>
        {/* <MapOne /> */}
        <div className="col-span-12">
          <TableOne data={data?.newUsers} />
        </div>
      </div>
      {isLoading ? <Loader /> : ''}
    </>
  );
};

export default Dashboard;
