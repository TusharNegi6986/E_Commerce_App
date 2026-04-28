import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Our e-commerce platform was created with the goal of making online
            shopping simple, convenient, and enjoyable for everyone. We offer a
            wide range of high-quality products carefully selected to meet the
            needs of modern customers. From everyday essentials to trending
            items, our collection is designed to provide value, reliability, and
            style. We continuously update our catalog to ensure that our
            customers always have access to the latest and best products
            available.
          </p>
          <p>
            Customer satisfaction is at the heart of everything we do. Our team
            is dedicated to providing a smooth shopping experience, secure
            payments, and fast delivery services. We believe that great service
            builds long-lasting relationships, which is why we focus on quality,
            trust, and transparency. Whether you're shopping for yourself or
            looking for the perfect gift, we aim to make every purchase easy and
            enjoyable.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            Our mission is to make online shopping simple, reliable, and
            enjoyable for everyone. We strive to provide high-quality products,
            great value, and excellent customer service while building a
            platform our customers can trust. Through innovation and dedication,
            we aim to create a shopping experience that keeps our customers
            coming back.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We ensure every product meets high standards of quality,
            reliability, and performance. Our team carefully checks each item to
            deliver products you can trust.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We focus on making your shopping experience simple and convenient.
            From easy browsing to secure checkout, everything is designed to
            save your time and effort.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We are dedicated to providing exceptional customer service, ensuring
            every customer receives timely support and a smooth shopping
            experience. Your satisfaction is always our priority.
          </p>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default About;
