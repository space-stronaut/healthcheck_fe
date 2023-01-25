import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Layout from "./components/layout/Layout";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import 'react-slideshow-image/dist/styles.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
import "./assets/css/index.css";
import Axios from "axios";

document.title = "Health Check L2";
// require('dotenv').config()

Axios.defaults.baseURL = "http://10.250.193.133:5000";

// if (process.env.MODE == "DEVELOPMENT") {
//   Axios.defaults.baseURL = "http://127.0.0.1:5000"
// } else {
//   Axios.defaults.baseURL = "http://10.250.193.133:5000";
// }
// Axios.defaults.baseURL = "http://127.0.0.1:5000"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <Layout />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
