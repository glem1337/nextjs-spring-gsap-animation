import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import styles from "./styles.module.css";


const Page = ({ offset, color, text }) => (
    <>
        <ParallaxLayer offset={offset} speed={1}>
            <div className={styles.background}></div>
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={2.1}>
            <div className={`${styles.shape} ${color}`} />
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={1}>
            <div className={styles.text}>
                <span>{text}</span>
            </div>
        </ParallaxLayer>
    </>
);

export default function ParallaxPage() {
    return (
        <div>
            <Parallax pages={3} className={styles.container} horizontal>
                <Page offset={0} color="red" text="text 1" />
                <Page offset={1} color="purple" text="text 2" />
                <Page offset={2} color="pink" text="text 3" />
            </Parallax>
        </div>
    );
}
