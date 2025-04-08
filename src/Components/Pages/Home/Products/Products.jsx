import React from 'react'
import './Product.css'
import car from '../../../../assets/Home/car-icons.png'
import bike from '../../../../assets/Home/bike-icon.png'
import rick from '../../../../assets/Home/rick.png'
import health from '../../../../assets/Home/health-icon.png'
import travel from '../../../../assets/Home/travel-icon.png'
import home from '../../../../assets/Home/home-icon.png'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Products = () => {
  const products = [
    { name: "Car", img: car ,link:'/carinsurance' },
    { name: "Bike", img: bike  , link:'/Bikeinurance'},
    { name: "Rickshaw", img:rick ,link:'/Autoinsurance'  },
    { name: "Travel", img:travel  },
    { name: "health", img: health , link:'/Healthinsurance' },
    { name: "Home", img: home }
  ]

  return (
    <section className='products-section py-5'>
      <div className="container">
        <h2 className='text-center fw-bold mb-4'>What are you looking to secure today?</h2>

        {/* For larger screens */}
        <div className="row d-none d-md-flex justify-content-center">
          {products.map((item, index) => (
            <div key={index} className='col-lg-2 col-md-4 col-sm-6 d-flex flex-column align-items-center mb-4'>
            <Link to={item.link}>
              <div className="card card-section text-center">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <img src={item.img} alt={item.name} className=' product-icon' />
                </div>
              </div>
              </Link>
              <h5 className="card-title">{item.name}</h5>
            </div>
          ))}
        </div>

        {/* Swiper for mobile & tablet */}
        <div className="d-md-none">
          <Swiper spaceBetween={20} slidesPerView={2}>
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='d-flex flex-column align-items-center'>
                  <div className="card card-section text-center mx-2">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <img src={item.img} alt={item.name} className='img-fluid product-icon' />
                    </div>
                  </div>
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Products
