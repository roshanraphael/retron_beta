import Head from 'next/head'
import {useEffect} from 'react'
import Link from "next/link"  
import Image from 'next'
import Login from './login'
import AOS from 'aos'
const Home = () => {

  useEffect(() => {
    AOS.init({
      duration : 1000
    });
  }, []);
  
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" 
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"/>
    </Head>
    <div className="container-fluid bg-white pt-5" style={{ width:"100%"}}>
      <div className="row p-5" style={{height:"500px"}}>
        <div className='col-sm d-flex justify-content-center align-item-center' data-aos="fade-up" data-aos-delay="400">
        <div className="col-sm order-lg-first content-center img-fluid"style={{
                backgroundImage:
                    'url(' +
                    'https://github.com/roshanraphael/retron_beta/blob/master/retron_frontend/assects/logo.png?raw=true' +
                    ')',
                    backgroundSize:"contain",
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center"
            }}>
          </div>
        </div>
        <div className="col d-flex justify-content-center align-item-center" 
        data-aos="fade-up" data-aos-delay="600">
          <Login />
        </div>
      </div>

    </div>
    </>
  )
}

export default Home