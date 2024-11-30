import Achievements from '../pages/Achievements';
import Login from '../pages/Login';
import Clients from '../pages/Clients';
import Products from '../pages/Products';
import FormAddClient from '../components/UI/FormAddClient/FormAddClient';
import FormCreateDeal from '../components/UI/FormCreateDeal/FormCreateDeal';
import HelpInfo from '../components/UI/HelpInfo/HelpInfo';

export const privateRoutes = [
	{ path: '/achievements', element: <Achievements />, exact: true },
	{ path: '/clients', element: <Clients />, exact: true },
	{ path: '/products', element: <Products />, exact: true },
	{ path: '/formaddclient', element: <FormAddClient />, exact: true },
	{ path: '/formcreatedeal', element: <FormCreateDeal />, exact: true },
	{ path: '/helpinfo', element: <HelpInfo />, exact: true },
];

export const publicRoutes = [
	{ path: '/login', element: <Login />, exact: true },
];
