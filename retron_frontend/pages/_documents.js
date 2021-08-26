import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import AOS from 'aos'
class MyDocument extends Document {
  
//   setGoogleTags() {
//     if (publicRuntimeConfig.PRODUCTION) {
//       return {
//         __html: `
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', 'UA-147955896-1');
//         `
//       };
//     }
//   }

  render() {
    useEffect(() => {
      AOS.init({
        duration:1000
      })
    },[])
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
              name="description"
              content="This is my Portfolio site with Blogs."
            />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" 
          integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous"></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          /><link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" 
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
          <link rel="stylesheet" href="/static/css/styles.css" />
          <React.Fragment>
          </React.Fragment>
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    );
  }
}

export default MyDocument;