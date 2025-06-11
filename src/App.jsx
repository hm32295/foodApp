
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Login from './modules/Authentiction/components/login/Login'
import AuthLayout from './modules/Shared/componetns/AuthLayout/AuthLayout';
import Regestor from './modules/Authentiction/components/Regestor/Regestor';
import ForgetPass from './modules/Authentiction/components/ForgetPass/ForgetPass';
import ResetPass from './modules/Authentiction/components/ResetPass/ResetPass';
import VerifyAccount from './modules/Authentiction/components/VerifyAccount/VerifyAccount';
import NotFound from './modules/Shared/componetns/NotFound/NotFound';
import MasterLayout from './modules/Shared/componetns/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard';
import RecipesData from './modules/Recipes/components/RecipesData/RecipesData';
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList';
import CategoriseData from './modules/Categorise/components/CategoriseData/CategoriseData';
import CategoriseList from './modules/Categorise/components/CategoriseList/CategoriseList';
import Users from './modules/Users/components/UsersList/Users';
import ProtectedRoute from './modules/Shared/componetns/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavList from './modules/Favorite/componetns/FavList/FavList';
import ChangePass from './modules/Authentiction/components/ChangePass/ChangePass';


function App() {
  
  const routs = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout /> , 
      children:[
        {
          path :"",
          element : <Login />
        },
        {
          path :"login",
          element : <Login  />
        },
        {
          path :"register",
          element : <Regestor />
        },
        {
          path :"forget-pass",
          element : <ForgetPass />
        },
        {
          path :"reset-pass",
          element : <ResetPass />
        },
        {
          path :"verify-account",
          element : <VerifyAccount />
        },
        {
          path :"change-password",
          element : <ChangePass />
        },
      ],
      errorElement : <NotFound />
    },
    {
      path : "/dashboard",
      element: <ProtectedRoute > <MasterLayout /> </ProtectedRoute> , 
      children :[
        { index : true, element : <Dashboard /> },
        { path : "Recipes-data", element : <RecipesData /> },
        { path : "Recipes-list", element : <RecipesList /> },
        { path : "Categorise-data", element : <CategoriseData /> },
        { path : "Categorise-list", element : <CategoriseList /> },
        { path : "Favorite", element : <FavList /> },
        { path : "users", element : <Users /> },
      ]
    }
  ])
  return (
    <>
        <RouterProvider router={routs}>
          
        </RouterProvider>
        <ToastContainer /> 
    </>
  )
}

export default App
