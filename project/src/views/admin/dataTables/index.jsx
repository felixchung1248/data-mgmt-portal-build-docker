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

import React, { useState, useEffect } from "react";
import Select from 'react-select';


export default function Settings() {

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [titleData, setTitleData] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  const apiUrl = "http://datamgmtdemo01.eastasia.cloudapp.azure.com/listalldatasets";
  console.log(`ListALLDatasets URL: ${apiUrl}`)
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        setData(json); // If you want to update state with this json, uncomment this line
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false);
      });
  }, []);

  const columnsDataCheck = [
    {
      Header: "COLUMN NAME",
      accessor: "name",
    },
    {
      Header: "DATA TYPE",
      accessor: "type",
    },
    {
      Header: "DESCRIPTION",
      accessor: "quantity",
    },
    {
      Header: "IS SENSITIVE",
      accessor: "date",
    },
  ];


  const handleSelectChange = (selectedOption) => {
    if (selectedOption === null){
      return;
    }
    setError(null)
    const url = `http://datamgmtdemo01.eastasia.cloudapp.azure.com/showdatasetdesc?name=${selectedOption.value}`
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((tableCatalog) => {
        setTableData(tableCatalog); // If you want to update state with this json, uncomment this line
        setTitleData(selectedOption.value);
        setShowTable(true);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      // These properties allow the text to wrap within the control
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      // You may need to adjust the line height to ensure the wrapped lines are spaced appropriately
      lineHeight: 'normal',
    }),
    option: (provided, state) => ({
      ...provided,
      // These properties allow the text to wrap within the options
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      // You may need to adjust the line height to ensure the wrapped lines are spaced appropriately
      lineHeight: 'normal',
    }),
    // You might also need to adjust the control height to accommodate wrapped text
    control: (provided) => ({
      ...provided,
      // If you have a specific height you want to set, you can set it here
      minHeight: '50px',
    }),
    // Adjusting the value container might also be necessary
    valueContainer: (provided) => ({
      ...provided,
      overflow: 'hidden', // Prevents text overflow
      whiteSpace: 'normal', // Allows text to wrap
      display: 'flex',
      flexWrap: 'wrap', // Allows child elements to wrap within the container
    }),
    // Other styles...
  };

  const onClose = () => setIsOpen(false);


  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Request has been submitted successfully
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        mb='20px'
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4fr 6fr)"
        gap={{ sm: 1, md: 4 }}
      // spacing={{ base: "20px", xl: "20px" }}
      >
        <GridItem width="350px" colSpan={1}>
          {isLoading && ( <Progress size="md" isIndeterminate />)}
          {!isLoading && data && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              // value={selectedOption}
              onChange={handleSelectChange}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={data.map(item => ({ value: item, label: item }))}
              styles={customStyles}
            />
          )}
        </GridItem>
          {showTable && 
            (<GridItem colStart={2} rowSpan={2}>
              <CheckTable 
                columnsData={columnsDataCheck} 
                tableData={tableData} 
                titleData={titleData} 
                error={error} 
                setError={setError} 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </GridItem>
            )
          }
        </Grid>
    </Box>
  );
}
