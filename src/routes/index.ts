import { lazy } from 'react';
const Calendar = lazy(() => import('../pages/Calendar'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Report = lazy(() => import('../pages/Report'));
const Profile = lazy(() => import('../pages/Profile'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const Settings = lazy(() => import('../pages/Settings'));
const Admins = lazy(() => import('../pages/Admins'));
const Users = lazy(() => import('../pages/Users'));
const User = lazy(() => import('../pages/User'));
const Business = lazy(() => import('../pages/Business'));
const BusinessDetails = lazy(() => import('../pages/BusinessDetails'));
const AddBusiness = lazy(() => import('../pages/AddBusiness'));
const EditBusiness = lazy(() => import('../pages/EditBusiness'));
const Listings = lazy(() => import('../pages/Listings'));
const Listing = lazy(() => import('../pages/Listing'));
const AddListing = lazy(() => import('../pages/AddListing'));
const EditListing = lazy(() => import('../pages/EditListing'));
const Adverts = lazy(() => import('../pages/Adverts'));
const Advert = lazy(() => import('../pages/Advert'));
const AddNotice = lazy(() => import('../pages/AddNotice'));
const Payment = lazy(() => import('../pages/Payment'));
const Pricings = lazy(() => import('../pages/Pricings'));
const AddPrice = lazy(() => import('../pages/AddPrice'));
const Amenities = lazy(() => import('../pages/Amenities'));
const Faq = lazy(() => import('../pages/Faq'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const Transactions = lazy(() => import('../pages/Transactions'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/profile/settings',
    title: 'Profile Settings',
    component: ProfileSettings,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/report',
    title: 'Report',
    component: Report,
  },
  {
    path: '/admins',
    title: 'Admins',
    component: Admins,
  },
  {
    path: '/admins/:id',
    title: 'Users',
    component: User,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/users/:id',
    title: 'Users',
    component: User,
  },
  {
    path: '/business',
    title: 'Business',
    component: Business,
  },
  {
    path: '/business/:id',
    title: 'Business',
    component: BusinessDetails,
  },
  {
    path: '/business/add-business',
    title: 'Business',
    component: AddBusiness,
  },
  {
    path: '/business/:id/edit-business',
    title: 'Business',
    component: EditBusiness,
  },
  {
    path: '/listings',
    title: 'Listings',
    component: Listings,
  },
  {
    path: '/listings/:id',
    title: 'Listing',
    component: Listing,
  },
  {
    path: '/listings/add-listing',
    title: 'Add Listing',
    component: AddListing,
  },
  {
    path: '/listings/:id/edit-listing',
    title: 'Listing',
    component: EditListing,
  },
  {
    path: '/adverts',
    title: 'Adverts',
    component: Adverts,
  },
  {
    path: '/adverts/:id',
    title: 'Advert',
    component: Advert,
  },
  {
    path: '/amenities',
    title: 'amenities',
    component: Amenities,
  },
  {
    path: '/faqs',
    title: 'faqs',
    component: Faq,
  },
  {
    path: '/add-price',
    title: 'Add-price',
    component: AddPrice,
  },
  {
    path: '/pricings',
    title: 'Pricings',
    component: Pricings,
  },
  {
    path: '/payments',
    title: 'Payments',
    component: Payment,
  },
  {
    path: '/payments/add-payment',
    title: 'Payments',
    component: Payment,
  },
  {
    path: '/transactions',
    title: 'Transactions',
    component: Transactions,
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: Notifications,
  },
  {
    path: '/forms',
    title: 'forms',
    component: FormElements,
  },
];

const routes = [...coreRoutes];
export default routes;
