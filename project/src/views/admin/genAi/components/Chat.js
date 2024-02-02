import {
    Box,
  } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import './App.css';
import SimpleForm from './module/form/SimpleForm';

export default function Chat(props) {
    return (
        <Box>
          <div className="App">
            <SimpleForm />
          </div>
        </Box>
    );
}