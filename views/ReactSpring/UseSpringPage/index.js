import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {useSpring, animated, config, to} from '@react-spring/web'
import {useGesture} from 'react-use-gesture'

import styles from './styles.module.css'

const calcX = (y, ly) =>
    -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const UseSpringPage = () => {
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)

        return () => {
            document.removeEventListener('gesturestart', preventDefault)
            document.removeEventListener('gesturechange', preventDefault)
        }
    }, [])

    const [flipped, set] = useState(false)
    const domTarget = useRef(null)


    const {transform, opacity} = useSpring({
        // to: {opacity: flipped ? 1 : 0},
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80}, // config: config.molasses,
    })

    const [{x, y, rotateX, rotateY, rotateZ, zoom, scale}, api] = useSpring(() => ({
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        zoom: 0,
        x: 0,
        y: 0,
        config: {mass: 5, tension: 350, friction: 40},
    }))

    useGesture({
        onDrag: ({active, offset: [x, y]}) => api({x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1}),
        onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
        onMove: ({ xy: [px, py], dragging }) =>
            !dragging &&
            api({
                rotateX: calcX(py, y.get()),
                rotateY: calcY(px, x.get()),
                scale: 1.1,
            }),
        onHover: ({ hovering }) =>
            !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 })
    }, {domTarget, eventOptions: {passive: false}})

    return (<div className={styles.container}>
        <animated.div ref={domTarget} className={styles.wrapper}
             onClick={() => set(state => !state)}
             style={{
                 transform: 'perspective(600px)',
                 x,
                 y,
                 scale: to([scale, zoom], (s, z) => s + z),
                 rotateX,
                 rotateY,
                 rotateZ,
             }}
        >
            <animated.div
                className={`${styles.c} ${styles.back}`}
                style={{opacity: opacity.to(o => 1 - o), transform}}
            />
            <animated.div
                className={`${styles.c} ${styles.front}`}
                style={{
                    opacity, transform, rotateX: '180deg',
                }}
            />
        </animated.div>
    </div>)
};

export default UseSpringPage;
