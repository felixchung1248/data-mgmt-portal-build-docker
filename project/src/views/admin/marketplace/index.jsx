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

import React, { useState } from "react";

// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  Grid,
  Input,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import DatasetCard from "components/card/DatasetCard";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

export default function Marketplace() {

  // States
  const [searchString, setSearchString] = useState("");

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 2" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Datasets
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <FormControl>
                  <Input
                    isRequired={false}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Search...'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    onChange={(value) => setSearchString(value.target.value)}
                  />
                </FormControl>
                {/* <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link> */}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              { ('Abstract Colors'.toLowerCase().includes(searchString.toLowerCase()) || ('Esthera Jackson'.toLowerCase().includes(searchString.toLowerCase()))) && <DatasetCard
                name='Abstract Colors'
                author='By Esthera Jackson'
                image={Nft1}
                rating={3}
                download='#'
              />}
              { ('ETH AI Brain'.toLowerCase().includes(searchString.toLowerCase()) || ('Nick Wilson'.toLowerCase().includes(searchString.toLowerCase()))) && <DatasetCard
                name='ETH AI Brain'
                author='By Nick Wilson'
                image={Nft2}
                rating={1}
                download='#'
              />}
              { ('Mesh Gradients'.toLowerCase().includes(searchString.toLowerCase()) || ('Will Smith'.toLowerCase().includes(searchString.toLowerCase()))) && <DatasetCard
                name='Mesh Gradients'
                author='By Will Smith'
                image={Nft3}
                rating={2}
                download='#'
              />}
              { ('Swipe Circles'.toLowerCase().includes(searchString.toLowerCase()) || ('Peter Will'.toLowerCase().includes(searchString.toLowerCase()))) && <DatasetCard
                name='Swipe Circles'
                author='By Peter Will'
                image={Nft4}
                rating={0}
                download='#'
              />}
              { ('Colorful Heaven'.toLowerCase().includes(searchString.toLowerCase()) || ('Mark Benjamin'.toLowerCase().includes(searchString.toLowerCase())))  && <DatasetCard
                name='Colorful Heaven'
                author='By Mark Benjamin'
                image={Nft5}
                rating={4}
                download='#'
              />}
              { ('3D Cubes Art'.toLowerCase().includes(searchString.toLowerCase()) || ('Manny Gates'.toLowerCase().includes(searchString.toLowerCase()))) && <DatasetCard
                name='3D Cubes Art'
                author='By Manny Gates'
                image={Nft6}
                rating={4.6}
                download='#'
              />}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
