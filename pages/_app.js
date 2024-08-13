// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
