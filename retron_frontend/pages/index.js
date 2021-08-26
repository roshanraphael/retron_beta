import Head from 'next/head'
import Link from "next/link"  
import Image from 'next'
import Login from './login'
export default function Home() {
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" 
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"/>
    </Head>
    <div className="container-fluid bg-warning pt-5" style={{height:"700px", width:"100%"}}>
      <div className="row p-5">
        <div className='col d-flex justify-content-center align-item-center shadow-lg'>
        <div className="project-card card card-img col-md ml-2 mr-2 mt-2 mb-2"style={{
                backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                    ')',
                    backgroundSize:"cover",
                    backgroundPosition:"center"
            }} data-aos="zoom-in" data-aos-delay="400">
          </div>
        </div>
        <div className="col d-flex justify-content-center align-item-center shadow-lg bg-white" style={{borderBottomLeftRadius: 40, borderBottomRightRadius:40, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
          <Login />
        </div>
      </div>

    </div>
    </>
  )
}