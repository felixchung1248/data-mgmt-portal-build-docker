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

import React, { useState, useEffect } from "react";


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
import Config from "config";



export default function Marketplace() {

  // States
  const [searchString, setSearchString] = useState("");
  const [datasets, setDatasets] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");





  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`http://${Config.manageDataCatalogHost}/listalldatacatalogdatasets`);
        const data = await response.json();
        // Create a new array from the fetched data
        const loadedDatasets = Object.keys(data).map(key => ({
          datasetname: data[key].dataset_name,
          owner: data[key].owners[0].owner_name,
          table_description: data[key].table_description,
          rating: data[key].rating,
          fields: data[key].fields
        }));
        // Update the state with the new array
        setDatasets(loadedDatasets);
      } catch (error) {
        console.error("Failed to fetch datasets:", error);
      }
    };
    fetchDatasets();

    const fetchPermissions = async () => {
      try {
        const response = await fetch(`http://${Config.listDatasetHost}/check-user-access?username=${localStorage.getItem('loginName').split('@')[0]}`);
        const datasetsPermissions = await response.json();
        // Update the state with the new array
        setPermissions(datasetsPermissions);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

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
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              {
                datasets.map((dataset, index) => (
                  (dataset.owner.toLowerCase().includes(searchString.toLowerCase()) || (dataset.datasetname.toLowerCase().includes(searchString.toLowerCase()))) &&
                  <DatasetCard
                    key={index}
                    owner={dataset.owner}
                    table_description={dataset.table_description}
                    datasetname={dataset.datasetname}
                    rating={dataset.rating}
                    fields={dataset.fields}
                    hasAccess={permissions.includes(dataset.datasetname)}
                  />
                ))
              }
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
