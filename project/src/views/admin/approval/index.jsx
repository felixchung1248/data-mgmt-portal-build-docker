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
import TicketCard from "components/card/TicketCard";
import Config from "config";


export default function Approval() {

  // States
  // const [searchString, setSearchString] = useState("");
  const [tickets, setTickets] = useState([]);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://${Config.manageTicketHost}/listticket`);
        const data = await response.json();
        // Create a new array from the fetched data
        const loadedTickets = Object.keys(data).map(key => ({
          title: data[key].title,
          firstname: data[key].customer_firstname,
          lastname: data[key].customer_lastname,
          email: data[key].customer_email,
          id: data[key].id,
          datasetname: data[key].datasetname,
          tabledescription: data[key].table_description
        }));
        // Update the state with the new array
        setTickets(loadedTickets);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
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
                Request Tickets
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 1 }} gap='20px'>
              {
                tickets.map((ticket, index) => (
                  <TicketCard
                    key={index}
                    title={ticket.title}
                    firstname={ticket.firstname}
                    lastname={ticket.lastname}
                    email={ticket.email}
                    id={ticket.id}
                    datasetname={ticket.datasetname}
                    tabledescription={ticket.tabledescription}
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
