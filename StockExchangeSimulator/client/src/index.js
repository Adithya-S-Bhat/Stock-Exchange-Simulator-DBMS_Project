import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const darktheme=createMuiTheme({
  palette:{
      type:"dark",
  }
})

ReactDOM.render(
  <ThemeProvider theme={darktheme}>
    <React.StrictMode>
      <CssBaseline/>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

