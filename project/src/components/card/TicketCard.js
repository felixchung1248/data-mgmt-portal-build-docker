// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
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
  GridItem,
  useDisclosure
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import Config from 'config';
import DataCatalogTable from "views/admin/dataTables/components/DataCatalogTable";
import SampleDataTable from "views/admin/dataTables/components/SampleDataTable";


export default function TicketCard(props) {
  const [ticketIsClosed, setTicketIsClosed] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [sampleColumnData, setSampleColumnData] = useState([]);
  const { title, firstname, lastname, email, id, datasetname, tabledescription } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isApprovedOpen, setIsApprovedOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onApprovedClose = () => setIsApprovedOpen(false);
  const [columnsDataCheck, setColumnsDataCheck] = useState([]);

  const generateColumns = (data) => {
    if (data.length === 0) return [];

    const sampleObject = data[0];
    return Object.keys(sampleObject).map(key => ({
      Header: key,
      accessor: key
    }));
  };

  function csvToJson(csvString) {
    // Split the CSV string into lines using the line break and filter out any empty lines
    const lines = csvString.split("\r\n").filter(line => line);

    // Extract headers from the first line
    const headers = lines[0].split(",");

    const transformedHeaders = headers.map(key => {
      return { Header: key.toUpperCase(), accessor: key };
    });

    setColumnsDataCheck(transformedHeaders);

    const result = lines.slice(1).map(line => {
      const values = line.split(",");
      // Reduce the values into a single object using header names as keys
      return values.reduce((obj, value, index) => {
        obj[headers[index]] = value; // Use header from headers array as key
        return obj;
      }, {});
    });

    return result;
  }

  const outputDataCatalog = (ticket_id) => {
    if (ticket_id === null) {
      return;
    }
    const showDataCatalogUrl = `http://${Config.manageTicketHost}/showdatacatalog?ticketId=${ticket_id}`
    fetch(showDataCatalogUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text();
      })
      .then((tableCatalog) => {
        const jsonResult = csvToJson(tableCatalog);
        setTableData(jsonResult); // If you want to update state with this json, uncomment this line
        setIsOpen(true);
        // setTitleData(selectedOption.value);
        // setShowTable(true);
      })
      .catch((error) => {
        console.error(error)
      });

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

  const approveTicket = (ticket_id, ticket_title, datasetname, email) => {
    if (ticket_id === null) {
      return;
    }

    const approveTicketUrl = `http://${Config.manageTicketHost}/approveticket?ticketId=${ticket_id}&datasetName=${datasetname}&datasetOwner=${email}&datasetDescription=${tabledescription}`
    const approveAccessUrl = `http://${Config.manageTicketHost}/approve-access?ticketId=${ticket_id}&datasetName=${datasetname}&user=${email.split('@')[0]}`

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(ticket_title.startsWith("Deploy") ? approveTicketUrl : approveAccessUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text();
      })
      .then((resString) => {
        setIsApprovedOpen(true)
        setTicketIsClosed(true)
        console.log(resString)
      })
      .catch((error) => {
        console.error(error)
      });
  };

  const rejectTicket = (ticket_id) => {
    if (ticket_id === null) {
      return;
    }

    const rejectTicketUrl = `http://${Config.manageTicketHost}/reject-ticket?ticketId=${ticket_id}`

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(rejectTicketUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text()
      })
      .then((resString) => {
        setTicketIsClosed(true)
        console.log(resString)
      })
  };

  if (ticketIsClosed) {
    return false
  } else {
    return (
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
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
              <Flex direction='row' align='end'>
                <Link
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px'
                  onClick={() => outputDataCatalog(id)}
                >
                  {title}
                </Link>
                <>
                  <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{title}</ModalHeader>
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
                  <Modal isOpen={isApprovedOpen} onClose={onApprovedClose} size='sm' isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      {/* <ModalHeader>{title}</ModalHeader> */}
                      <ModalCloseButton />
                      <ModalBody>
                        {
                          (
                            <Text>
                              {"The ticket has been approved"}
                            </Text>
                          )
                        }
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="lightBrand" mr={3} onClick={onApprovedClose}>Close</Button>

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
                  {firstname}{' '}{lastname}
                </Text>
              </Flex>
            </Flex>
            <Flex
              align='start'
              // justify='space-between'
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt='5px'>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                mb='7px'
                fontWeight='400'
                me='14px'>
                {tabledescription}
              </Text>
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
              <Flex columnGap={2}>
                <Button
                  variant='darkBrand'
                  color='white'
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
                  onClick={() => approveTicket(id, title, datasetname, email)}
                >
                  {'Approve'}
                </Button>
                <Button
                  variant='lightBrand'
                  color='black'
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
                  onClick={() => rejectTicket(id)}
                >
                  {'Reject'}
                </Button>
              </Flex>
            </Flex>
            
          </Flex>
        </Flex>
      </Card>
    );
  }
}