// pages/index.js
'use client'
import { delay, motion, useAnimation, useTransform, useScroll, useViewportScroll, cubicBezier, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';


// Animation Variants
const headerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const containerStagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemStagger = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Components for each section type

function FadeInSection({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div className="max-w-4xl px-4 mx-auto" ref={ref} initial="hidden" animate={controls} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}

function StaggeredSection({ items }) {
  return (
    <motion.div variants={containerStagger} initial="hidden" animate="visible" className="flex flex-col items-center space-y-4">
      {items.map((item, index) => (
        <motion.div key={index} variants={itemStagger}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ParallaxSection() {
  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <motion.div style={{ y: yRange }} className="h-screen bg-cover bg-fixed bg-blue-500 flex items-center justify-center">
      <h2 className="text-white text-5xl text-center">Parallax Heading</h2>
    </motion.div>
  );
}

const ImageWithCoverReveal = ({ src, alt }) => {
  const [ ref, inView ] = useInView({ threshold:0.5, triggerOnce:true});

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: inView ? '100%' : '0%' }}
        transition={{ duration: 1.2, ease: [1,0.6,0.6,0.6] }}
        className="absolute top-0 left-0 w-full h-full bg-black"
      />
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const StatsSection = () => {
  //const controls = useAnimation();
  //const [ref2, inView2] = useInView({ threshold:1, triggerOnce: true });
  //console.log(inView2)
  const [ref, inView] = useInView({threshold:1, triggerOnce:true});

  // useEffect(() => {
  //   if (inView2) controls.start('visible');
  // }, [controls, inView2]);

  return (
    <div className="grid grid-cols-3 h-auto gap-8 px-4 overflow-hidden" ref={ref}>
        {/* Stat 1 */}
        <motion.div
          initial={{ y:-100, opacity:1}}
          animate={{ y:inView?0:-100 }}
          transition={{ duration:0.8}}
        >
          <div className="text-8xl font-bold">250+</div>
          <div className="text-sm text-gray-400">Projects Completed</div>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          initial={{ y:-100, opacity:1}}
          animate={{ y:inView?0:-100 }}
          transition={{ duration:0.8, delay:0.8}}
          className="text-center"
        >
          <div className="text-8xl font-bold">500+</div>
          <div className="text-sm text-gray-400">Clients Served</div>
        </motion.div>

        {/* Stat 3 */}
        <motion.div
          initial={{ y:-100, opacity:1}}
          animate={{ y:inView?0:-100 }}
          transition={{ duration:0.8, delay:1.6}}
          className="text-center"
        >
          <div className="text-8xl font-bold">100%</div>
          <div className="text-sm text-gray-400">Customer Satisfaction</div>
        </motion.div>
      </div>
  )
}

const HeroSection = () => {
  // const imageRef = useRef(null);
  // const textRef = useRef(null);
  // const isImageInView = useInView(imageRef, { once: true });
  // const isTextInView = useInView(textRef, { once: true });
  const [imageRef, isImageInView] = useInView({threshold:1, triggerOnce:true});
  const [textRef, isTextInView] = useInView({threshold:1, triggerOnce:true});

  return (
    <section ref={imageRef} className="py-16 flex flex-col md:flex-row items-start justify-center mx-auto p-4 gap-8 bg-bgBlack">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isImageInView?1:0, x:isImageInView?0:-100}}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <img src="https://media.istockphoto.com/id/513653705/photo/pets.jpg?s=612x612&w=is&k=20&c=0VtcY3FkyNgWXvW8rPKfX0Lp64OfRdIF_acjZrMznEI=" 
        alt="Hero Image" className="max-w-md" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isImageInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 text-center md:text-left items-start"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">What We Do</h1>
        <p className="text-lg text-white mb-6">
          We provide solutions that transform your ideas into reality. Join us and discover what makes us unique.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "black", color:"white" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-bgBlack font-semibold rounded-md shadow-lg"
        >
          Try Now
        </motion.button>
      </motion.div>
    </section>
  );
};

const Carousel = () => {
  const words = ["Cost-Efficient", "FDA Approved", "24/7 Support","Plug and Play"];

  return (
    <div className="overflow-hidden w-full bg-bgBlack text-white">
      <Marquee>
        {words.map((word, index) => (
          <div key={index} className="mr-10 text-6xl font-semibold px-5">{word}</div>
        ))}
      </Marquee>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "What is your return policy?", answer: "Our return policy lasts 30 days..." },
    { question: "How do I track my order?", answer: "You can track your order by entering your order number on our tracking page." },
    { question: "Can I purchase items internationally?", answer: "Yes, we offer international shipping to most countries." },
  ];

  return (
    <section className="mx-auto p-4 bg-bgBlack text-white py-16">
      <h2 className="text-5xl font-bold text-left px-16 mb-6">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="px-16">
            {/* Toggle Button */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <span className="font-medium text-4xl text-gray-300">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 135 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl"
              >
                +
              </motion.span>
            </button>

            {/* Animated Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="p-4">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  // const headerRef = useRef(null);
  // const isHeaderInView = useInView(headerRef, { once: true });
  const [headerRef, isHeaderInView] = useInView({threshold: 0.7, triggerOnce:true});

  return (
    <footer ref={headerRef} className="flex flex-col md:flex-row justify-between items-start py-12 px-16 bg-gray-800 text-white">
      {/* Left Side (Three Main Sections) */}
      <div className="flex flex-col md:flex-row w-full md:w-1/2 space-y-6 md:space-y-0 md:space-x-12">
        
        {/* About Section */}
        <div className="flex flex-col">
          <motion.h3
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xl font-semibold"
          >
            About
          </motion.h3>
          <motion.ul>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a href="#" className="text-gray-400">Our Story</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#" className="text-gray-400">Careers</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="#" className="text-gray-400">Blog</a>
            </motion.li>
          </motion.ul>
        </div>

        {/* Social Section */}
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl font-semibold"
          >
            Social
          </motion.h3>
          <motion.ul>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a href="#" className="text-gray-400">Facebook</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="#" className="text-gray-400">Instagram</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a href="#" className="text-gray-400">Twitter</a>
            </motion.li>
          </motion.ul>
        </div>

        {/* Connect Section */}
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl font-semibold"
          >
            Connect
          </motion.h3>
          <motion.ul>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a href="#" className="text-gray-400">Support</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <a href="#" className="text-gray-400">FAQs</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <a href="#" className="text-gray-400">Contact Us</a>
            </motion.li>
          </motion.ul>
        </div>
      </div>

      {/* Right Side (Organization Name) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-6xl font-extrabold"
      >
        VetBuddy
      </motion.div>
    </footer>
  );
};
// Main landing page component

export default function HomePage() {
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 300], [0, -50]);
  
  return (
    <div className="font-sans text-gray-900">
      {/* Animated Header
      <motion.h1
        initial={{ opacity: 0, y: 40}}

        animate={{ opacity:1, y:0}}
        transition={{ bounce: 0}}
        variants={headerVariants}
        className="fixed top-10 w-full text-center text-6xl font-extrabold text-blue-600 z-20"
      >
        Welcome to Our Awesome Site
      </motion.h1> */}

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center bg-bgBlack text-white">
        <motion.div initial={{ opacity: 0, y:40 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 1, ease: 'easeInOut'}} className="text-center">
          <h1 className="text-9xl font-bold">VetBuddy</h1>
          {/* <p className="mt-4 text-xl">Lorem ipsum del amor</p> */}
        </motion.div>
        <div className='relative overflow-hidden pt-4'>
          <motion.div initial={{x:0}} animate={{x:'-100%'}} transition={{duration:1, ease: 'easeInOut', delay:1}} className="absolute top-0 left-0 w-full h-full bg-bgBlack z-10"></motion.div>
          <div className='relative z-0'>
            <motion.img src='https://static.toiimg.com/thumb/msid-113499597,width-1070,height-580,imgsize-131660,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'
            className='w-screen h-auto' style={{y:yRange}}></motion.img>
          </div>
        </div>
      </section>

      {/* Fade-In Section */}
      <section className="h-screen flex items-center justify-center bg-bgBlack text-white">
        <FadeInSection className="max-w-4xl">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="text-lg">Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus curabitur dolor, mi sociosqu pharetra montes facilisi. Varius egestas erat lorem potenti rhoncus enim inceptos. In fames efficitur fermentum adipiscing enim habitasse. Viverra nec montes platea suspendisse donec lacinia! Dictumst volutpat feugiat mus tortor feugiat fermentum commodo. Varius ultricies tristique sed primis sem. Ac nam aptent nisl orci nisl netus convallis bibendum. Magnis magna eleifend a gravida taciti arcu.

Natoque orci iaculis massa elementum; ipsum posuere ridiculus. Cras metus rutrum hendrerit dictum rhoncus egestas arcu. Netus eget sodales purus luctus egestas libero augue nisl tristique. Lectus amet diam per ornare gravida est. Fusce mus magna sed enim maximus habitasse risus proin. Suspendisse dictum porta vivamus amet eget proin metus eu. Quam eu libero rutrum semper volutpat eget.

Elementum id pretium orci rhoncus rhoncus. Montes dictum ac donec porta fringilla. Tempus est bibendum consequat nullam quam tempus platea placerat duis. Viverra ultricies luctus facilisis; porttitor magna pulvinar. Eget massa consectetur ligula varius pharetra; cubilia habitasse per. Finibus rutrum vitae ad ullamcorper posuere montes.

</p>
        </FadeInSection>
      </section>

      {/* Staggered Section */}
      {/* <section className="h-screen flex items-center justify-center bg-bgBlack text-white">
        
      </section> */}
      <section className="py-16 h-auto bg-bgBlack text-center text-white">
      <h2 className="text-4xl font-bold mb-10">What We Do</h2>
      <div className="grid grid-cols-3 gap-10 px-10">
        <div>
          <ImageWithCoverReveal src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSz7RzDv_1BL5CTDOMjlAEnxThu6NkgsbgDQ&s" alt="Image 1" />
        </div>
        <div>
          <ImageWithCoverReveal src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSz7RzDv_1BL5CTDOMjlAEnxThu6NkgsbgDQ&s" alt="Image 2" />
        </div>
        <div>
          <ImageWithCoverReveal src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSz7RzDv_1BL5CTDOMjlAEnxThu6NkgsbgDQ&s" alt="Image 3" />
        </div>
      </div>
      
    </section>
    <section className='py-16 bg-bgBlack h-auto text-center text-white'>
    <StatsSection></StatsSection>
    </section>

      {/* Parallax Section */}
      {/* <ParallaxSection /> */}
    <FAQSection></FAQSection>

    <Carousel></Carousel>

    <HeroSection></HeroSection>
    
    <Footer></Footer>
    </div>
  );
}
