import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import LoginLayout from 'layouts/login';
// import FirstPageLayout from 'layouts/firstpage';
import AdminLayout from 'layouts/admin';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import theme from 'theme/theme';


const rootElement = document.getElementById("root");
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ThemeEditorProvider>
      <HashRouter>
        <Switch>
          <Route path={`/login`} component={LoginLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from='/' to='/login' />
        </Switch>
      </HashRouter>
    </ThemeEditorProvider>
  </ChakraProvider>

  ,
  rootElement
);