import * as React from 'react';

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { useMentaportSDK } from '@mentaport/sdk-nextjs/client';

export default function Home() {

  const {mentaportSDK } = useMentaportSDK();
  const [geoStart, setGeoStart] = React.useState(false);
  const [statusGeo, setStatusGeo] = React.useState("");
  const [mintStatusTrigger, setMintStatus] = React.useState("");

  function StartGeo() {
    const isMobile = false;
    mentaportSDK.startGeoLocation(isMobile);
    setGeoStart(true)
  }

  function GetStatus() {
    const result = mentaportSDK.getStatus();
    setStatusGeo(JSON.stringify(result))
  }

  async function CheckMintStatus() {
    try {
      const wallet = ""
      const result = await mentaportSDK.checkMintStatus(process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID, wallet);
      setMintStatus(JSON.stringify(result));
    } catch(error){
      console.log(error)
      setMintStatus(JSON.stringify(error));
    }
  }

  return (
    <Layout >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.center}>
      
        {!geoStart ? 
          <>
          <h2 className={utilStyles.headingMd}>Init Mentaport SDK</h2>
          <button onClick={StartGeo}> Start Geo</button>
          </>
        : 
        (
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingMd}>Current Geo Status</h2>
            <button onClick={GetStatus}> Get Geo Status</button>
            <p>{statusGeo}</p>

            <button onClick={CheckMintStatus}> Check Mint Status</button>
            <p>{mintStatusTrigger}</p>
          </section>
        )
        }
      </section>
       
    </Layout>
  );
}

