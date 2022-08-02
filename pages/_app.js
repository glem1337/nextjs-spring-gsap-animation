import { PageTransition } from "../components/react-spring/PageTransition";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <PageTransition>
            <Component {...pageProps} />
        </PageTransition>
    )
}

export default MyApp
