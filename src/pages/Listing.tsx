import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { fetchListing } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import Card from '../components/CardTable';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';

const Listing = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['listings', id],
    queryFn: () => fetchListing(info),
  });

  useEffect(() => {
    if (data) {
      console.log(data?.resources);
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
  const handelEdit = () => {
    navigate(`/listings/${id}/edit-listing`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These listing would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/listings/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['listings', id]);
              Swal.fire({
                title: 'Listing deleted',
                icon: 'success',
                text: 'Listing deleted successfully!',
              });
              navigate('/listings');
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
      <Breadcrumb pageName="Listing" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Name: {data?.businessName || data?.productNmae}
        </h2>
        <div className="flex gap-2 text-center">
          <EditTooltip handleEdit={handelEdit} />
          <DeleteToolTip handleDelete={handelDelete} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Business info:</h3>
        <div>
          <p>Description: {data?.description}</p>
          <p>Category: {data?.category}</p>
          <p>Total reviews: {data?.totalReviews}</p>
          <p>Total rating: {data?.averageRating}</p>
          <h3 className="font-semibold my-2">Listing info:</h3>
          <p>Product Name: {data?.businessName}</p>
          <p>Product description: {data?.productDescription}</p>
          <p>Email: {data?.email}</p>
          <p>Phone: {data?.mobile}</p>
          <p>State: {data?.state}</p>
          <p>LGA: {data?.lga}</p>
          <p>Address: {data?.address}</p>
          <p>Website: {data?.website}</p>
          <h3 className="font-semibold my-2">user info:</h3>
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

export default Listing;
