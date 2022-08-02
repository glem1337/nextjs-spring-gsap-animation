import React from "react";
import {useRouter} from "next/router";
import { useTransition, animated } from "react-spring";

export const PageTransition = ({ children, ...props }) => {
    const router = useRouter();
    // console.log(router.pathname)
    const transitions = useTransition(router, {
        key: router => router.pathname,
        from: { opacity: 0, translateY: '-100%' },
        enter: { opacity: 1, translateY: '0' },
        // trail: 100,
        // leave: {
        //     position: "absolute",
        //     top: 0,
        //     right: 0,
        //     bottom: 0,
        //     left: 0,
        //     opacity: 0,
        //     translateY: '100%'
        // }
    });

    return (
        <>
            {transitions((style, item, {key}) => {
                return (
                    <animated.main key={key} style={{
                        position: 'absolute',
                        minHeight: '100%',
                        width: '100%',
                        height: 0,
                        ...style
                    }}>
                        {children}
                    </animated.main>
                );
            })}
        </>
    );
};
