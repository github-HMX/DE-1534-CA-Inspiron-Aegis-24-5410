//require('file-loader?name=[name].[ext]!./index.html');
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#006BBD" // This is an orange looking color
               },
     secondary: {
        main: "#006BBD" //Another orange-ish color
                }
           },
// fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});


ReactDOM.render(
  <Fragment>
    <ThemeProvider theme={theme}><App /></ThemeProvider>
  </Fragment>
  ,
  document.getElementById('root')
);

