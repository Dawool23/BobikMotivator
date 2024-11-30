/* import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Add from "../pages/Add";
import AdvancedSearch from "../pages/AdvancedSearch";
import AddParticDB from "../pages/AddParticDB";
import DownloadFile from "./DownloadFile"; */
import Achievements from '../pages/Achievements';
import Login from '../pages/Login';
import Clients from '../pages/Clients';
import Products from '../pages/Products';
import AddSale from '../pages/AddSale';

export const privateRoutes = [
	{ path: '/achievements', element: <Achievements />, exact: true },
	{ path: '/clients', element: <Clients />, exact: true },
	{ path: '/products', element: <Products />, exact: true },
	{ path: '/addsale', element: <AddSale />, exact: true },
];

export const publicRoutes = [
	{ path: '/login', element: <Login />, exact: true },
];
