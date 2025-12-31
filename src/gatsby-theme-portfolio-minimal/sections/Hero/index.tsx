import React, { useState, useEffect, useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from 'gatsby-theme-portfolio-minimal/src/components/Animation';
import { useCalendlyWidget } from 'gatsby-theme-portfolio-minimal/src/hooks/useCalendlyWidget';
import { Section } from 'gatsby-theme-portfolio-minimal/src/components/Section';
import { SocialProfiles } from 'gatsby-theme-portfolio-minimal/src/components/SocialProfiles';
import { useLocalDataSource } from './data';
import { PageSection } from 'gatsby-theme-portfolio-minimal/src/types';
import * as classes from './style.module.css';

export function HeroSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allHeroJson.sections[0];
    const imageRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const CalendlyWidget = useCalendlyWidget(data.calendly);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const rect = imageRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate rotation based on mouse distance from center
            const rotateY = ((mouseX - centerX) / rect.width) * 15; // Max 15deg rotation
            const rotateX = ((centerY - mouseY) / rect.height) * 15; // Max 15deg rotation

            setTilt({ rotateX, rotateY });
        };

        const handleMouseLeave = () => {
            setTilt({ rotateX: 0, rotateY: 0 });
        };

        const imageElement = imageRef.current;
        if (imageElement) {
            imageElement.addEventListener('mousemove', handleMouseMove);
            imageElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (imageElement) {
                imageElement.removeEventListener('mousemove', handleMouseMove);
                imageElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <Animation type="fadeUp" delay={400}>
            {CalendlyWidget}
            <Section anchor={props.sectionId} additionalClasses={[classes.HeroContainer]}>
                {data.heroPhoto?.src && (
                    <div
                        ref={imageRef}
                        className={classes.heroImageCont}
                        style={{
                            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                            transition: 'transform 0.1s ease-out',
                        }}
                    >
                        <GatsbyImage
                            className={classes.heroImage}
                            image={data.heroPhoto.src.childImageSharp.gatsbyImageData}
                            alt={data.heroPhoto.alt || `Profile Image`}
                            loading="eager"
                        />
                    </div>
                )}
                <div className={classes.Hero}>
                    <div className={classes.Intro}>
                        {data.intro && <span className={classes.ImagePrefix}>{data.intro}</span>}
                        {data.image?.src && (
                            <Animation className={classes.Image} type="waving-hand" duration={2500} iterationCount={3}>
                                <GatsbyImage
                                    image={data.image.src.childImageSharp.gatsbyImageData}
                                    alt={data.image.alt || `Intro Image`}
                                    loading="eager"
                                />
                            </Animation>
                        )}
                    </div>
                    <h1 className={classes.Title}>{data.title}</h1>
                    <h2 className={classes.Subtitle}>
                        {data.subtitle.prefix}
                        <u>{data.subtitle.highlight}</u>
                        {data.subtitle.suffix}
                    </h2>
                    <p>{data.description}</p>
                    <Animation type="fadeLeft" delay={600}>
                        {data.socialProfiles && (
                            <SocialProfiles from={data.socialProfiles.from} showIcon={data.socialProfiles.showIcons} />
                        )}
                    </Animation>
                </div>
            </Section>
        </Animation>
    );
}
