## Next.js Package
Our Next.js package includes everything you need to plug Mentaports core sdk into your Next.js application.
  - Provider
  - Server callback
   
 ### Installation
     npm install @mentaport/sdk-nextjs
     
### Configure the Application
You need to allow your Next.js application to communicate appropriately with Mentaport. In your .env file under your root project directory, make sure to add the following values:

``` bash

# MENTAPORT_SDK
# make sure to change it to production URL when deploy (www.my-app.xyz)
# For dev, change the port to the one you are using
NEXT_PUBLIC_API_URL=http://localhost:3000
MENTAPORT_API_KEY='YOUR_API_KEY'

NEXT_PUBLIC_MENTAPORT_CONTRACT_ID='YOUR_CONTRACT_ID
```

### Adding the provider
```js
// pages/_app.ts
import React from 'react';
import { MentaportProvider } from '@mentaport/sdk-nextjs'

export default function App({ Component, pageProps }) {

  return (
    <MentaportProvider>
      <Component {...pageProps} />;
    </MentaportProvider>
  );
}

```

### Using the provider
```js
// pages/index.ts
import React from 'react';
import { useMentaportSDK } from '@mentaport/sdk-nextjs';

export default function Home() {

  const { mentaportSDK } = useMentaportSDK();
  const [geoStart, setGeoStart] = React.useState(false);
  const [statusGeo, setStatusGeo] = React.useState("");

  function StartGeo() {
    const isMobile = true;
    cosnt walkTime = 10;
    mentaportSDK.startGeoLocation(isMobile, walkTime);
    setGeoStart(true)
  }

  function GetStatus() {
    const result = mentaportSDK.getStatus();
    setStatusGeo(JSON.stringify(result))
  }

  return (
    <div>
       <h1>Mentaport Example</h1>
        {!geoStart ? 
          <>
            <h2>Init Mentaport SDK</h2>
            <button onClick={StartGeo}> Start Geo</button>
          </>
        : 
        (
           <>
            <h2>Current Geo Status</h2>
            <button onClick={GetStatus}> Get Geo Status</button>
            <p>{statusGeo}</p>
          </>
        )
       }
    </div>
  );
}

```


### API Routes
Add `/mentaport/[...mentaport].ts` under the `api` directory.

```js
// api/mentaport/[...mentaport].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { handlerCallback } from '@mentaport/sdk-nextjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   await handlerCallback(req, res);
   return;
  } catch (error) {
    console.log("error", error)
    return res.status(500).end();
  }
}
