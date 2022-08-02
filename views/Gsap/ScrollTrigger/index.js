import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        title: 'Architecto aliquam',
        subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, ea.'
    },
    {
        title: 'Ceritatis placeat',
        subtitle: 'Dignissimos placeat cupiditate perferendis eaque praesentium similique officia dolore?'
    },
    {
        title: 'Vitae voluptates',
        subtitle: 'In ullam et nulla repudiandae praesentium, laboriosam quas tempore fuga asperiores eveniet amet.'
    }
];

const ScrollTriggerPage = () => {
    const [background, setBackground] = useState('#262626');
    const headerRef = useRef(null);

    const revealRefs = useRef([]);
    revealRefs.current = [];

    const toggleBackground = () => {
        const color = background !== '#262626' ? '#262626' : '#1b4943';
        setBackground(color);
    }

    useEffect(() => {

        const a = gsap.to(headerRef.current, { backgroundColor: background, duration: 1,  ease: 'none' });

    }, [background]);

    useEffect(() => {

        revealRefs.current.forEach((el, index) => {

            const a = index % 2;

            gsap.fromTo(el, {
                autoAlpha: 0,
                x: a ? -300 : 300,
            }, {
                duration: 1,
                autoAlpha: 1,
                ease: 'none',
                x: 0,
                scrollTrigger: {
                    id: `section-${index+1}`,
                    markers: true,
                    trigger: el,
                    start: '350% center',
                    end: '550% center',
                    scrub: true,
                    toggleActions: 'play none none reverse'
                }
            });

        });

    }, []);

    const addToRefs = el => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    return (
        <div className="App">
            <header ref={headerRef} className="App-header">
                <img src="../../../images/people.png" className="App-logo" alt="logo" />
                <button onClick={() => toggleBackground()}>Change background</button>
                <p>
                    Scroll down to see sections being revealed by ScrollTrigger.
                </p>
            </header>
            <main className="App-main">
                {
                    sections.map(({title, subtitle}) => (
                        <div className="App-section" key={title} ref={addToRefs}>
                            <h2>{title}</h2>
                            <p>{subtitle}</p>
                        </div>
                    ))
                }
            </main>
        </div>
    );
}

export default ScrollTriggerPage;
