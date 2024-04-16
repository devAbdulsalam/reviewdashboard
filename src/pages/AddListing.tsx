import Breadcrumb from '../components/Breadcrumb.js';
import Loader from '../components/Loader.js';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { categoriesData } from '../data.js';
const apiUrl = import.meta.env.VITE_API_URL;
import { useQueryClient } from '@tanstack/react-query';

interface FormData {
  [key: string]: string | Blob;
}

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('image');
  const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
  const isValidFileType = (file: File): boolean => {
    return validTypes.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (selectedFile) {
      if (!isValidFileType) {
        toast.error('Invalid file type. Please select a valid file.');
        event.target.value = '';
        return;
      }
      if (selectedFile.size > maxSize) {
        toast.error('Image size must be less than 10Mb');
        event.target.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error('Listing Business name is required!');
    }
    if (!address.trim()) {
      return toast.error('Listing address is required!');
    }
    if (!file) {
      return toast.error('Listing featured image is required!');
    }
    if (!category) {
      return toast.error('Listing category is required!');
    }
    if (!productName) {
      return toast.error('Listing product name is required!');
    }
    if (!productDescription) {
      return toast.error('Listing product description is required!');
    }
    const data: FormData = {
      businessName: name,
      category,
      description,
      productName,
      productDescription,
      state,
      userId: user?.user._id,
      city,
      email,
      mobile,
      address,
    };
    setLoading(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('featuredImage', file);
    axios
      .post(`${apiUrl}/listings/new`, formData, config)
      .then((res) => {
        if (res.data) {
          toast.success('Listing added successfully');
        }
        queryClient.invalidateQueries(['listing']);
        navigate('/listings');
      })
      .catch((error) => {
        console.error(error);
        const message = getError(error);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Breadcrumb pageName="Add Listing" />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Business info Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Business Info
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Business name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Category</option>
                      {categoriesData.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- product info --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Info
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-2.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Product Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Business name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-2.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Product Description
                  </label>
                  <textarea
                    rows={6}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-2.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- Location info Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Location info
                </h3>
              </div>
              <div>
                <div className="p-6.5">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Mobile <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter phone"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Business email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        State <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter state"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        City <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Add Listing
        </button>
      </div>
      {loading ? <Loader /> : ''}
    </>
  );
};

export default AddListing;
