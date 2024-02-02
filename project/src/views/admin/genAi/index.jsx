/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { 
  Box
  , Grid
  , GridItem
  , Progress
  ,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
  ,Button
} from "@chakra-ui/react";

import CheckTable from "views/admin/dataTables/components/CheckTable";
import Chat from "views/admin/genAi/components/Chat";

import React, { useState, useEffect } from "react";
import Select from 'react-select';
// import Chat from './components/Chat';
import './index.css';

export default function Settings() {



  // Chakra Color Mode
  return (
    <Box>
      <Chat />
    </Box>
  );
}
