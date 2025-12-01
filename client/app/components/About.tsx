'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TimelineEvent {
  id: number;
  year: string;
  description: string;
  x: number;
  y: number;
  xMobile?: number;
  yMobile?: number;
}

interface CompanyTimelineProps {
  mission: string;
  vision: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2003',
    description: 'Started business...',
    x: 4,
    y: 8,
    xMobile: 10,
    yMobile: 10,
  },
  {
    id: 2,
    year: '2006',
    description: 'Collaboration with Panpharma...',
    x: 8,
    y: 35,
    xMobile: 25,
    yMobile: 22,
  },
  {
    id: 3,
    year: '2008',
    description: 'Collaboration with Clinibay...',
    x: 40,
    y: 42,
    xMobile: 40,
    yMobile: 34,
  },
  {
    id: 4,
    year: '2009',
    description: 'Business collaboration with Korean...',
    x: 60,
    y: 45,
    xMobile: 55,
    yMobile: 46,
  },
  {
    id: 5,
    year: '2013',
    description: 'Launched the Ziphanol...',
    x: 76,
    y: 53,
    xMobile: 70,
    yMobile: 58,
  },
  {
    id: 6,
    year: '2015',
    description: 'Relocated corporate office...',
    x: 82,
    y: 72,
    xMobile: 85,
    yMobile: 70,
  },
  {
    id: 7,
    year: '2023',
    description: 'Launched ZICARD and ZEVAS.',
    x: 68,
    y: 96,
    xMobile: 50,
    yMobile: 85,
  },
];

const CompanyTimeline: React.FC<CompanyTimelineProps> = ({ mission, vision }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Create reference for the container
  const containerRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      // Mobile check logic removed since it's not used
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const generatePathData = (mobile: boolean) => {
    const points = timelineEvents.map((event) => {
      const x = mobile ? event.xMobile || event.x : event.x;
      const y = mobile ? event.yMobile || event.y : event.y;
      return { x, y };
    });

    if (points.length === 0) return '';

    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }

    return pathData;
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  const bounceVariants = {
    hidden: { y: 0 },
    visible: {
      y: ['0%', '-10%', '0%'],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[120vh] md:min-h-[140vh] bg-white py-12 md:py-16 px-4 md:px-8 pb-32 md:pb-40"
      id="mission"
    >
      {/* Hand Image */}
      <motion.div
        className="absolute top-[80px] md:top-[120px] left-4 md:left-4 w-[100px] md:w-[120px] z-10"
        variants={handVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Image
          src="/assets/hand.png"
          alt="hand"
          width={120}
          height={120}
          className="object-contain w-full h-auto"
          sizes="(max-width: 640px) 100px, 120px"
          priority
        />
      </motion.div>

      {/* Mobile SVG */}
      <svg
        className="absolute top-[180px] left-0 w-full h-[calc(100%-220px)] min-h-[600px] z-0 block md:hidden"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={generatePathData(true)}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.4"
          strokeDasharray="2,4"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
        />
        {timelineEvents.map((event, i) => (
          <motion.circle
            key={`dot-mobile-${i}`}
            cx={event.xMobile || event.x}
            cy={event.yMobile || event.y}
            r="0.4"
            fill="var(--color-zyre-red)"
            variants={circleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Desktop SVG */}
      <svg
        className="absolute top-[180px] md:top-[220px] left-0 w-full h-[calc(100%-220px)] min-h-[700px] z-0 hidden md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={generatePathData(false)}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.4"
          strokeDasharray="2,4"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
        />
        {timelineEvents.map((event, i) => (
          <motion.circle
            key={`dot-desktop-${i}`}
            cx={event.x}
            cy={event.y}
            r="0.35"
            fill="var(--color-zyre-red)"
            variants={circleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Mission */}
      <motion.div
        className="absolute top-[80px] md:top-[110px] right-4 md:right-20 z-10 flex flex-col items-end max-w-[calc(100%-2rem)] md:max-w-2xl"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="hidden md:block"
        >
          <Image src="/assets/pill1.png" alt="pill1" width={160} height={160} />
        </motion.div>
        <div className="text-end max-w-xs md:max-w-2xl mt-4 md:mt-6">
          <h4 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">OUR </span>
            <span className="text-[var(--color-zyre-red)]">MISSION</span>
          </h4>
          <p className="text-primary text-sm md:text-base mt-4">{mission}</p>
        </div>
      </motion.div>

      {/* History scroll target - positioned in the middle of the timeline */}
      <div
        id="history"
        className="absolute top-[40%] left-0 w-full h-20 pointer-events-none z-0"
      />

      {/* Desktop Events */}
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.id}
          className="absolute z-10 hidden md:block"
          style={{
            left: `clamp(5%, ${event.x}%, 95%)`,
            top: `calc(180px + ${event.y}% - 4%)`,
          }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          onMouseEnter={() => setIsHovered(event.id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <motion.div
            className="flex flex-col items-center text-center max-w-[200px] p-2 transition-all duration-300"
            animate={isHovered === event.id ? { scale: 1.05 } : { scale: 1 }}
          >
            <span className="text-sm font-bold text-white px-3 py-1 rounded-xl bg-primary mb-2">
              {event.year}
            </span>
            <p className="text-sm text-primary whitespace-pre-line">
              {event.description}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Mobile Events */}
      {timelineEvents.map((event, index) => (
        <motion.div
          key={`mobile-${event.id}`}
          className="absolute z-10 block md:hidden"
          style={{
            left: `clamp(5%, ${event.xMobile || event.x}%, 95%)`,
            top: `calc(180px + ${(event.yMobile || event.y)}% - 4%)`,
          }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <motion.div
            className="flex flex-col items-center text-center max-w-[120px] p-1"
            whileTap={{ scale: 1.05 }}
          >
            <span className="text-xs font-bold text-white px-2 py-1 rounded-xl bg-primary mb-1">
              {event.year}
            </span>
            <p className="text-xs text-primary whitespace-pre-line">
              {event.description}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Vision scroll target - positioned at the bottom */}
      <div
        id="vision"
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-0"
      />

      {/* Vision Content */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-4 md:left-20 z-20 flex flex-col items-start max-w-[calc(100%-2rem)] md:max-w-2xl"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            src="/assets/pill2.png"
            alt="pill2"
            width={160}
            height={160}
            className="hidden md:block"
          />
        </motion.div>
        <div className="text-left md:text-justify max-w-xs md:max-w-2xl mt-4 md:mt-6">
          <h4 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">OUR </span>
            <span className="text-[var(--color-zyre-red)]">VISION</span>
          </h4>
          <p className="text-primary text-sm md:text-base mt-4">{vision}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyTimeline;
