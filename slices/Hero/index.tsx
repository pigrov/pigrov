"use client";

import { useEffect, useRef } from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Wrapper from "@/components/Wrapper";
import Shapes from "./Shapes";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
    const comp = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {}, comp);
        gsap.timeline()
            .fromTo(
                ".name-animation",
                {
                    x: -200,
                    opacity: 0,
                    rotate: -50,
                },
                {
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    ease: "elastic.out(1, 0.3)",
                    duration: 1.5,
                    transformOrigin: "left top",
                    delay: 1,
                    stagger: { each: 0.1, from: "random" },
                }
            )
            .fromTo(
                ".profession-animation",
                {
                    y: 20,
                    opacity: 0,
                    scale: 0.5,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scale: 1,
                    ease: "elastic.out(1, 0.3)",
                }
            );

        return () => ctx.revert();
    }, []);

    const letters = (name: KeyTextField, key: string) => {
        if (!name) return;
        return name.split("").map((letter, index) => (
            <span
                key={index}
                className={`name-animation name-animation-${key} inline-block opacity-0`}
            >
                {letter}
            </span>
        ));
    };

    return (
        <Wrapper
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            ref={comp}
        >
            <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
                <Shapes />
                <h1
                    className="mb-4 text-[clamp(2rem,12vmin,8rem)] leading-none tracking-wide"
                    aria-label={slice.primary.name + " " + slice.primary.surname}
                >
                    <span className="font-bold block text-slate-400">
                        {letters(slice.primary.name, "name")}
                    </span>
                    <span className="-mt-[.2em] font-bold block text-slate-500">
                        {letters(slice.primary.surname, "surname")}
                    </span>
                    <span className="profession-animation block bg-gradient-to-tr from-green-500 via-green-200 to-green-500 bg-clip-text text-2xl md:text-4xl uppercase text-transparent opacity-0 mt-4">
                        {slice.primary.profession}
                    </span>
                </h1>
            </div>
        </Wrapper>
    );
};

export default Hero;
