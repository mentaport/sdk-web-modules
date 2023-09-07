import '../styles/global.css';
import {MentaportProvider} from '@mentaport/sdk-nextjs/client'

export default function App({ Component, pageProps }) {

  return (
    <MentaportProvider>
      <Component {...pageProps} />;
    </MentaportProvider>
  );
}
