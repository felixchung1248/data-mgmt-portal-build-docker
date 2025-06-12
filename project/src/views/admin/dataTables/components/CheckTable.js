import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Input,
  Switch,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormControl
  , FormLabel
  , FormErrorMessage
  , Button
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import config from 'config'

export default function CheckTable(props) {
  const { columnsData, tableData, titleData, error, setError, isOpen, setIsOpen } = props;
  const tableDataFields = tableData;
  // const [ isError, setIsError ] = useState(false)

  const columns = useMemo(() => columnsData, [columnsData]);
  // console.log(columnsData)
  // console.log(tableDataFields)
  const data = useMemo(() => tableDataFields, [tableDataFields]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 9999;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const errorColor = useColorModeValue("red.600", "orange.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const loginName = localStorage.getItem('loginName')

  function validateDescription(value) {
    let error;
    if (!value) {
      error = 'Description cannot be empty'
      setError(error)
    } else {
      setError(null);
    }
    return error;
  }

  return (
    <Formik
      initialValues={data.reduce((values, row, index) => ({
        ...values,
        [`description_${index}`]: '' // Assuming row.description is the initial value
        , [`isSensitive_${index}`]: false
      }), {})
      }
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={
        (values, actions) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            const transformedValues = tableDataFields.map((field, index) => {
              const descriptionValueKey = `description_${index}`;
              const isSensitiveValueKey = `isSensitive_${index}`;
              let description = values[descriptionValueKey];
              let is_sensitive = values[isSensitiveValueKey];

              return {
                ...field,
                description,
                is_sensitive
              };
            });
            const tempResult = transformedValues.map(item => ({
              name: item.COLUMN_NAME,
              description: item.description,
              is_sensitive: item.is_sensitive,
              data_type: item.DATA_TYPE, // Add new datatype property
              type: undefined // Set type as undefined to remove it from the object
            })).map(item => {
              const { type, ...rest } = item; // Destructure to exclude the type property
              return rest;
            })

            const finalResult = {
              field_definition: tempResult
              , dataset_path: titleData.tableSchema + "." + titleData.tableName
              , customer: loginName
              ,table_description: values['table-description']
            };

            // console.log(JSON.stringify(finalResult, null, 2))
            const body = JSON.stringify(finalResult)
            console.log(body)
            const url = `http://${config.submitTicketHost}/submit-ticket`
            // const url = "http://localhost:5001/request-dataset-deploy"

            fetch(url, {
              method: 'POST', // Specify the method
              headers: {
                'Content-Type': 'application/json',
                // Include any other headers like 'Authorization' if needed
              },
              body: JSON.stringify(finalResult) // Convert the data to JSON and pass it in the body
            }).then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.text();
            }).then((text) => {
              if (text == 'There has already been pending request for this dataset for approval')
                setError(text)
              if (text == 'Ticket submitted successfully.')
                setIsOpen(true)
            })

            actions.setSubmitting(false)
          }, 1000)
        }
      }
    >
      {(props) => (
        <Form>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            {error && (
              <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                  color={errorColor}
                  fontSize='15px'
                  fontWeight='700'
                  lineHeight='100%'>
                  {error}
                </Text>
                {/* <Menu /> */}
              </Flex>
            )}
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontWeight='700'
                lineHeight='100%'>
                {titleData.tableSchema + "." + titleData.tableName}
              </Text>
              {/* <Menu /> */}
            </Flex>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
            <Text
                color={textColor}
                fontSize='15px'
                fontWeight='700'
                lineHeight='100%'>
                Table Description:
              </Text>
              
              <Field name="table-description" validate={validateDescription}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors[field.name] && form.touched.name}>
                                  {/* <FormLabel htmlFor="name">First name</FormLabel> */}
                                  <Input
                                    {...field}
                                    // id="description"
                                    placeholder="Table Description"
                                    color={textColor}
                                    fontSize='sm'
                                    fontWeight='700'
                                    borderRadius='16px'
                                    // width="50%"
                                    isRequired="true"
                                  />
                                  <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        pe='10px'
                        key={index}
                        borderColor={borderColor}>
                        <Flex
                          justify='space-between'
                          align='center'
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color='gray.400'>
                          {column.render("Header")}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => {
                        let data = "";
                        if (cell.column.Header === "COLUMN NAME") {
                          data = (
                            <Flex align='center'>
                              {/* <Checkbox
                          defaultChecked={cell.value[1]}
                          colorScheme='brandScheme'
                          me='10px'
                        /> */}
                              <Text color={textColor} fontSize='sm' fontWeight='700'>
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "DATA TYPE") {
                          data = (
                            <Flex align='center'>
                              <Text
                                me='10px'
                                color={textColor}
                                fontSize='sm'
                                fontWeight='700'>
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "DESCRIPTION") {
                          const fieldName = `description_${rowIndex}`;
                          data = (
                            <Field name={fieldName} validate={validateDescription}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors[field.name] && form.touched.name}>
                                  {/* <FormLabel htmlFor="name">First name</FormLabel> */}
                                  <Input
                                    {...field}
                                    // id="description"
                                    placeholder="Description"
                                    color={textColor}
                                    fontSize='sm'
                                    fontWeight='700'
                                    borderRadius='16px'
                                  />
                                  <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          );
                        } else if (cell.column.Header === "IS SENSITIVE") {
                          const fieldName = `isSensitive_${rowIndex}`;
                          data = (
                            <Field name={fieldName}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors[field.name] && form.touched.name}>
                                  <Switch {...field} colorScheme="brand" />
                                  <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          );
                        }
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={cellIndex}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor='transparent'>
                            {data}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {/* SQL logic: {tableData.sql} */}
            <Button
              mt={4}
              colorScheme="brand"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
