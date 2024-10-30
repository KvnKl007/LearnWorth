import React from 'react'
import heroImg from "../assets/images/hero.png"
import heroImgback from "../assets/images/backhero.png"


const Hero = () => {
    return (
        <>
            <section className='py-10 h-[90vh] md:h-full'>
                <div className='container mx-auto px-4 md:flex-nowrap flex-wrap flex items-center justify-between'>
                    <div className='left w-full md:w-3/4 text-gray-700 mb-8 md:mb-0'>
                        <h1 className='text-5xl leading-tight text-blue-600 font-semibold'>
                            Launch your <br /> Own online learning <br /> Platform
                        </h1>
                        <h3 className='text-lg mt-3'>Unlimited access to all 60+ E-learning content.</h3>
                        <span className='text-[14px]'>You`re guaranteed to find something that`s right for you.</span>
                    </div>
                    <div className='right w-1/4 md:w-full relative'>
                        <div className='images relative'>
                            <img src={heroImgback} alt='back' className=' absolute top-32 md:right-10' width={650} />
                            <div className='img h-[85vh] w-full'>
                                <img src={heroImg} alt='heroImage' className='object-cover w-full h-full z-20 relative' />
                            </div>
                        </div>
                        <div className='content'>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;


