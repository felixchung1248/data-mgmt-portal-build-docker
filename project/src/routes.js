import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCall,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import GenAi from "views/admin/genAi";
import Approval from "views/admin/approval"

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Config from "./config"

// Function to get user email
const getUserEmail = () => localStorage.getItem('loginName');
const isAdmin = () => localStorage.getItem('admin'); 


export const generateRoutes = (userEmail) => [
  {
    name: "Data Marketplace",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
  },
  {
    name: isAdmin() === 'Y' ? "Dataset promotion approval" : "Dataset promotion request",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: isAdmin() === 'Y' ? Approval : DataTables,
  },
  {
    name: "Gen AI chatroom",
    layout: "/admin",
    path: "/genai",
    icon: <Icon as={MdCall} width='20px' height='20px' color='inherit' />,
    component: GenAi,
    secondary: true,
  },
];


const routes = [
  {
    name: "Data Marketplace",
    layout: "/admin",
    path: "/default",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
  },
  {
    name: isAdmin() === 'Y' ? "Dataset promotion approval" : "Dataset promotion request",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: isAdmin() === 'Y' ? Approval : DataTables,
  },
  {
    name: "Gen AI chatroom",
    layout: "/admin",
    path: "/genai",
    icon: (
      <Icon
        as={MdCall}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: GenAi,
    secondary: true,
  },
];

export default routes;
