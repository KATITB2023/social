import {
    Box,
    Image as ChakraImage,
    keyframes,
    type ImageProps,
    forwardRef
  } from '@chakra-ui/react';
  import { useEffect, useRef } from 'react';
  
  const rotating = keyframes`
    0% {
      transform: translate(-50%, -50%) rotate(0deg) 
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) 
    }
  `;
  
  const LoginBackground = () => {
    const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
      <ChakraImage
        ref={ref}
        draggable='false'
        loading='lazy'
        position='absolute'
        zIndex='-10'
        alt=''
        filter='brightness(0.8)'
        {...props}
      />
    ));
  
    const asteroidRef = useRef<HTMLImageElement>(null);
    const asteroidMiniRef = useRef<HTMLImageElement>(null);
  
    useEffect(() => {
      function animateAsteroid() {
        if (asteroidRef.current && asteroidMiniRef.current) {
          asteroidRef.current.style.setProperty(
            'height',
            `${Math.random() * 7 + 3}%`
          );
          asteroidMiniRef.current.style.setProperty(
            'height',
            `${Math.random() * 3.5 + 1.5}%`
          );
          asteroidRef.current.animate(
            [
              {
                transform: `translate(${Math.random() * -130}vw, 0) rotate(0deg)`
              },
              {
                transform: `translate(${
                  Math.random() * -130
                }vw, 150vh) rotate(180deg)`
              }
            ],
            {
              duration: 8000,
              easing: 'linear'
            }
          );
          asteroidMiniRef.current.animate(
            [
              {
                transform: `translate(${Math.random() * -130}vw, 0) rotate(0deg)`
              },
              {
                transform: `translate(${
                  Math.random() * -130
                }vw, 150vh) rotate(180deg)`
              }
            ],
            {
              duration: 8000,
              delay: 4000,
              easing: 'linear'
            }
          );
        }
      }
  
      const animateInterval = setInterval(animateAsteroid, 15000);
  
      animateAsteroid();
  
      return () => clearInterval(animateInterval);
    }, []);
  
    return (
      <Box
        position='absolute'
        inset='0'
        margin='auto'
        overflow='hidden'
        zIndex='-10'
      >
        <Image
          src='moon-bg.png'
          height={{ base: 'auto', md: '110%' }}
          width={{ base: '110%', md: 'auto' }}
          maxWidth='110%'
          alt=''
          top={{ base: '100%', md: '50%' }}
          left={{ base: '50%', md: '0' }}
          brightness='0.6'
          animation={`${rotating} infinite 90s linear`}
        />
        <Image
          src='stars-bg.png'
          height={{ base: 'auto', md: '165%' }}
          width={{ base: '165%', md: 'auto' }}
          maxWidth='165%'
          alt=''
          top={{ base: '100%', md: '50%' }}
          left={{ base: '50%', md: '0' }}
          animation={`${rotating} infinite 120s linear`}
        />
        <Image
          src='asteroids-bg.png'
          height={{ base: 'auto', md: '165%' }}
          width={{ base: '165%', md: 'auto' }}
          maxWidth='165%'
          alt=''
          top={{ base: '100%', md: '50%' }}
          left={{ base: '50%', md: '0' }}
          animation={`${rotating} infinite 140s linear`}
        />
        <Image
          src='spark.png'
          alt=''
          top='0'
          right='-2rem'
          height='15%'
        />
        <Image
          src='spark_mini.png'
          alt=''
          top='20%'
          right='-1rem'
          height='15%'
        />
        <Image
          src='spark_mini.png'
          alt=''
          top={{ base: '0', md: '70%' }}
          right={{ base: '70%', md: '-3rem' }}
          height='15%'
        />
        <Image
          ref={asteroidRef}
          src='asteroid-sm.png'
          alt=''
          top='-30%'
          right='-15vw'
          zIndex='-100'
        />
        <Image
          ref={asteroidMiniRef}
          src='asteroid-mini-sm.png'
          alt=''
          top='-30%'
          right='-15vw'
          zIndex='-100'
        />
      </Box>
    );
  };
  
  export default LoginBackground;