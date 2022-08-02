import React, {useEffect} from 'react';
import { gsap } from "gsap";

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ScrollSlider = () => {

    useEffect(() => {
        const updateOffset = () => {
            const offset = document.querySelector(".item-offset").offsetHeight;
            return `${offset - 200} top`;
        };
        const dots = document.querySelectorAll(".dots > div");

        const slidesTween = gsap.timeline();
        slidesTween
            .to(".scroll-slider-item--1 img", {
                y: "-20%",
                duration: 4,
                ease: "none"
            })
            .to(".scroll-slider-item--1", {
                autoAlpha: 0,
                duration: 1
            })
            .to(
                ".scroll-slider-item--2 img",
                {
                    y: "-20%",
                    duration: 4,
                    ease: "none"
                },
                "-=0.5"
            )
            .to(".scroll-slider-item--2", {
                autoAlpha: 0,
                duration: 1
            })
            .to(
                ".scroll-slider-item--3 img",
                {
                    y: "-20%",
                    duration: 4,
                    ease: "none"
                },
                "-=0.5"
            );

        const tween = gsap.timeline();
        ScrollTrigger.create({
            animation: tween,
            trigger: ".scroll-trigger",
            start: updateOffset,
            end: "200% top",
            scrub: 0.5, // smooth scrubbing, takes 500ms to "catch up" to the scrollbar
            markers: true,
            pin: true,
            onUpdate: (self) => {
                const idx = Math.min(Math.floor(self.progress * 3), 2);
                dots.forEach((item) => {
                    item.classList.remove("active");
                });
                dots[idx].classList.add("active");
            }
        });

        tween
            .from(
                ".scroll-wrapper",
                {
                    duration: 0.5,
                    ease: "none",
                    css: { filter: "drop-shadow(11px 12px 11px rgba(50, 50, 0, 0.5))" }
                },
                "start"
            )
            .to(
                ".scroll-slider",
                {
                    clipPath: "inset(10% 5%)",
                    duration: 0.5,
                    ease: "none"
                },
                "start"
            )
            .to(
                ".scroll-progress-line",
                {
                    y: "-100%",
                    duration: 13,
                    ease: "none"
                },
                "start"
            )
            .add(slidesTween, "start")
            .to(
                ".scroll-slider",
                {
                    clipPath: "inset(20% 10%)",
                    duration: 0.5,
                    ease: "none"
                },
                "-=0.5"
            )
            .to(
                ".scroll-wrapper",
                {
                    duration: 0.5,
                    ease: "none",
                    css: { filter: "drop-shadow(11px 12px 11px rgba(50, 50, 0, 0.5))" }
                },
                "-=0.5"
            );
    }, [])

    return (
        <div className="scroll-slider-page">
            <div className="container">
            <div className="scroll-trigger">
                <div className="item-offset">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing eli</h2>
                    <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore
                        fugiat molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea
                        porro, qui dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor
                        dolore tenetur?</p>
                </div>
                <div className="scroll-wrapper">
                    <div className="scroll-slider">
                        <div className="dots">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="scroll-progress-line">
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                        <div className="scroll-slider-item scroll-slider-item--1">
                            <div className="static">Some content 1</div>
                            <img src="https://www.fillmurray.com/1280/400" alt="" />
                        </div>
                        <div className="scroll-slider-item scroll-slider-item--2">
                            <div className="static">Some content 2</div>
                            <img src="https://www.fillmurray.com/1280/400" alt="" />
                        </div>
                        <div className="scroll-slider-item scroll-slider-item--3">
                            <div className="static">Some content 3</div>
                            <img src="https://www.fillmurray.com/1280/400" alt="" />
                        </div>
                    </div>
                </div>
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing eli</h2>
                <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore fugiat
                    molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea porro, qui
                    dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor dolore
                    tenetur?</p>
                <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore fugiat
                    molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea porro, qui
                    dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor dolore
                    tenetur?</p>
                <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore fugiat
                    molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea porro, qui
                    dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor dolore
                    tenetur?</p>
                <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore fugiat
                    molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea porro, qui
                    dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor dolore
                    tenetur?</p>
                <p>Ullam, soluta quo ab deleniti, rem explicabo consequuntur assumenda ex nobis a optio labore fugiat
                    molestias voluptatum. Sapiente minima sunt eius quasi reiciendis eveniet quam sit ea porro, qui
                    dolores eos totam, aliquid, perspiciatis esse voluptas perferendis. Est quod dolor dolore
                    tenetur?</p>
            </div>
        </div>
        </div>
    );
};

export default ScrollSlider;
