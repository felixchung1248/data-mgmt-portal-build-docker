// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  GridItem ,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  Tooltip
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { Player } from '@lordicon/react';
// Assets
import React, { useState, useRef } from "react";
import { IoHeart, IoHeartOutline, IoStar, IoStarOutline } from "react-icons/io5";
import DataCatalogTable from "views/admin/dataTables/components/DataCatalogTable";
import SampleDataTable from "views/admin/dataTables/components/SampleDataTable";
import Config from 'config';

export default function DatasetCard(props) {
  const [tableData, setTableData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [sampleColumnData, setSampleColumnData] = useState([]);
  const { owner, table_description, datasetname, rating, fields, hasAccess } = props;
  const [requested, setRequested] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const [isOpen, setIsOpen] = useState(false);
  const ICON = require('assets/dataset.json');
  const onClose = () => setIsOpen(false);
  const [columnsDataCheck, setColumnsDataCheck] = useState([]);
  const [beginRating, setBeginRating] = useState(false);
  const [rated, setRated] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating)

  const playerRef = useRef(null);
  const handleMouseEnter = () => {
    playerRef.current?.playFromBeginning();
  };

  const generateColumns = (data) => {
    if (data.length === 0) return [];

    const sampleObject = data[0];
    return Object.keys(sampleObject).map(key => ({
      Header: key,
      accessor: key
    }));
  };

  const outputDataCatalog = () => {
        const columnData = [
          {
            Header: "NAME",
            accessor: "fieldPath",
          },
          {
            Header: "DESCRIPTION",
            accessor: "description",
          },
          {
            Header: "IS_SENSITIVE",
            accessor: "isSensitive",
          },
          {
            Header: "DATA_TYPE",
            accessor: "type",
          },
        ]
        setColumnsDataCheck(columnData);
        setTableData(fields.fields); // If you want to update state with this json, uncomment this line
        setIsOpen(true);


    const dataSampleUrl = `http://${Config.dataPropagateHost}/datapropagate?view=${datasetname}&count=10`

    fetch(dataSampleUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((tableCatalog) => {
        // Function to generate columns from data keys
        const columns = generateColumns(tableCatalog);

        setSampleData(tableCatalog); // If you want to update state with this json, uncomment this line
        setSampleColumnData(columns);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  const rateDataset = async (rating) => {
    try {
      const response = await fetch(`http://${Config.manageDataCatalogHost}/rate-dataset?rating=${rating}&dataset_name=${datasetname}`, {'method': 'POST'});
      const data = await response.json();
      setCurrentRating(data.rating);
    } catch (error) {
      console.error("Failed to rate dataset:", error);
    }
  }

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <div onMouseEnter={handleMouseEnter} align="center">
            <Player
              ref={playerRef}
              icon={ICON}
              size={80}
            />
          </div>
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Tooltip label={table_description} aria-label='A tooltip'>
              {/* <Text
                color='secondaryGray.900'
                fontSize={{
                  base: "md",
                }}
                mb='7px'
                fontWeight='600'
                me='14px'>
                {datasetname}
              </Text> */}
              <Link
                color='secondaryGray.900'
                fontSize={{
                  base: "md",
                }}
                mb='7px'
                fontWeight='600'
                me='14px'
                onClick={outputDataCatalog}
              >
                {datasetname}
              </Link>
            </Tooltip>
            <Flex direction='row' align='end'>
              <>
              <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{datasetname}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {
                        (
                          <GridItem colStart={2} rowSpan={2}>
                            <DataCatalogTable
                              columnsData={columnsDataCheck}
                              tableData={tableData}
                              datasetname={datasetname}
                            />
                            <SampleDataTable
                              columnsData={sampleColumnData}
                              tableData={sampleData}
                              datasetname={datasetname}
                            />
                          </GridItem>
                        )
                      }
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="lightBrand" mr={3} onClick={onClose}>Close</Button>

                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>

              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                mb='7px'
                fontWeight='400'
                me='14px'>
                {"By "}{owner}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='5px'>
            <Flex>
              <Text fontWeight='700' fontSize='sm' color={textColorBid} marginRight={2}>
                {currentRating !== "No rating" && "Rating:" || currentRating}
              </Text>
              {currentRating !== "No rating" && (
                <Flex>
                  <Icon
                    transition='0.2s linear'
                    w='20px'
                    h='20px'
                    as={currentRating >= 0.5 ? IoStar : IoStarOutline}
                    color='brand.500'
                  />
                  <Icon
                    transition='0.2s linear'
                    w='20px'
                    h='20px'
                    as={currentRating >= 1.5 ? IoStar : IoStarOutline}
                    color='brand.500'
                  />
                  <Icon
                    transition='0.2s linear'
                    w='20px'
                    h='20px'
                    as={currentRating >= 2.5 ? IoStar : IoStarOutline}
                    color='brand.500'
                  />
                  <Icon
                    transition='0.2s linear'
                    w='20px'
                    h='20px'
                    as={currentRating >= 3.5 ? IoStar : IoStarOutline}
                    color='brand.500'
                  />
                  <Icon
                    transition='0.2s linear'
                    w='20px'
                    h='20px'
                    as={currentRating >= 4.5 ? IoStar : IoStarOutline}
                    color='brand.500'
                  />
                </Flex>
              )}
            </Flex>
            {!hasAccess && <Button
              variant={requested ? 'lightBrand' : 'darkBrand'}
              color={requested ? 'black' : 'white'}
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              px='24px'
              py='5px'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              onClick={() => {
                setRequested(true);

                fetch(`http://${Config.submitTicketHost}/submit-access-request`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    dataset_name: datasetname,
                    user: localStorage.getItem('loginName')
                  })
                }).then((res) => {
                  if (!res.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return res.text();
                }).then((text) => {
                    console.log(text)
                })
              }}
              isDisabled={requested}>
              {requested ? 'Request submitted' : 'Request access'}
            </Button>}
            {hasAccess && !beginRating && <Button
              variant={'brand'}
              color={'white'}
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              px='24px'
              py='5px'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              onClick={() => setBeginRating(true)}>
              Rate this dataset
            </Button>}
            {beginRating && <Flex direction='column'>
              <Flex>
                <Text fontWeight='bold' mr='14px'>
                  Rate this dataset:
                </Text>
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rated >= 1 ? IoStar : IoStarOutline}
                  color='brand.500'
                  onClick={() => {
                    setRated(1);
                  }}
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rated >= 2 ? IoStar : IoStarOutline}
                  color='brand.500'
                  onClick={() => {
                    setRated(2);
                  }}
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rated >= 3 ? IoStar : IoStarOutline}
                  color='brand.500'
                  onClick={() => {
                    setRated(3);
                  }}
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rated >= 4 ? IoStar : IoStarOutline}
                  color='brand.500'
                  onClick={() => {
                    setRated(4);
                  }}
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rated >= 5 ? IoStar : IoStarOutline}
                  color='brand.500'
                  onClick={() => {
                    setRated(5);
                  }}
                />
              </Flex>
              <Flex justifyContent='space-evenly'>
                <Button
                  variant='brand'
                  color='white'
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='70px'
                  px='24px'
                  py='5px'
                  onClick={() => {setBeginRating(false); rateDataset(rated); setRated(0)}}>
                  Confirm
                </Button>
                <Button
                  variant='action'
                  color='black'
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='70px'
                  px='24px'
                  py='5px'
                  onClick={() => {setBeginRating(false); setRated(0)}}>
                  Cancel
                </Button>
              </Flex>
            </Flex>}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}