import React, { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { gsap, Power2 } from "gsap";

const Reveal = () => {
    let image = useRef(null);
    let reveal = useRef(null);

    useEffect(() => {
        gsap.timeline()
        .to(reveal, { duration: 1.4, width: "0%", ease: Power2.easeInOut })
        .from(image, {
            duration: 1.4,
            scale: 1.6,
            ease: Power2.easeInOut,
            delay: -1.4
        });
    });

    return (
        <section className={styles.main}>
            <p className={styles.text}>GSAP IMAGE REVEAL</p>
            <div className={styles.container}>
                <>
                    <div className={styles.imgContainer}>
                        <div ref={el => (reveal = el)} className={styles.reveal} />
                        <img
                            className={styles.img}
                            ref={el => {
                                image = el;
                            }}
                            src="../../../images/people.webp"
                        />
                    </div>
                </>
            </div>
        </section>
    );
};

export default Reveal;
