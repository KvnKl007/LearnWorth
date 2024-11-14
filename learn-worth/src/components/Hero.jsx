import React from 'react'
import heroImg from "../../public/assets/images/hero.png"
import heroImgback from "../../public/assets/images/backhero.png"


const Hero = () => {
    return (
        <>
            <section className='py-10 h-[150vh] md:h-full w-full'>
                <div className='container mx-auto md:flex-nowrap flex-wrap flex items-center justify-between p-5'>
                    <div className='left w-full md:w-3/4 text-gray-700 mb-8 md:mb-0'>
                        <h1 className='text-5xl leading-tight text-blue-600 font-semibold'>
                            Master New Skills <br /> Your Way <br /> Anytime, Anywhere.
                        </h1>
                        <h3 className='text-lg mt-3'>Unlimited access to all 60+ E-learning content.</h3>
                        <span className='text-[14px]'>You`re guaranteed to find something that`s right for you.</span>
                    </div>
                    <div className='right w-full md:1/4 relative'>
                        <div className='images relative'>
                            <img src={heroImgback} alt='back' className=' absolute top-32 md:right-10' width={650} />
                            <div className='img h-[85vh] w-full'>
                                <img src={heroImg} alt='heroImage' className='object-cover md:object-cover w-full h-full z-20 relative' />
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


