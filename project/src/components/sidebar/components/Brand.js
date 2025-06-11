import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
// import logo from 'assets/img/logo/logo-black.png';
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      {/* <img src={logo} alt='Logo' /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
