import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import { fetchBusiness } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../components/BusinessCard';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';

const Business = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['resources', id],
    queryFn: () => fetchBusiness(info),
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handleEdit = () => {
    navigate(`/business/${id}/edit-business`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These business would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/business/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['business']);
              Swal.fire({
                title: 'Business deleted',
                icon: 'success',
                text: 'Business deleted successfully!',
              });
              navigate('/business');
            }
          })
          .catch((error) => {
            const message = getError(error);
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: message,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Business" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Name: {data?.name}
        </h2>
        <div className="flex gap-2 text-center items-center">
          <EditTooltip handleEdit={handleEdit} />
          <DeleteToolTip handleDelete={handelDelete} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card data={data} />
        <div>
          <div>
            <h3 className="font-semibold">Description:</h3>
          </div>
          <div>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Business info:</h3>
        <div>
          <p>Description: {data?.description}</p>
          <p>Category: {data?.category}</p>
          <p>Total reviews: {data?.totalReviews}</p>
          <p>Total rating: {data?.averageRating}</p>
          <h3 className="font-semibold my-2">User info:</h3>
          <Link to={`/users/${data?.userId?._id}`}>
            Name: {data?.userId?.firstName + ' ' + data?.userId?.lastName}
          </Link>
          <p>User role: {data?.userId?.role}</p>
          <p>Email: {data?.userId?.email}</p>
          <p>Address: {data?.userId?.address}</p>
        </div>
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Business;
