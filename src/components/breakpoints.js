import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        tiny: 300,
        sm: 550,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
export default function BoxTest() {
    const breakpoints = ['xs', 'tiny', 'sm', 'md', 'lg', 'xl'];
    return (
      <ThemeProvider theme={theme}>
                <Hidden only={['xs','lg','xl']}>

          <h2>ABCD</h2>
          </Hidden>
          <Hidden only={['sm','md']}>

          <h2>pqr</h2>
          </Hidden>
</ThemeProvider>
  );
}