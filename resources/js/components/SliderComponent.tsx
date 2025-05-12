import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Post {
  id: number;
  image: string;
  title: string;
}

interface SliderComponentProps {
  posts: Post[];
}

const SliderComponent: React.FC<SliderComponentProps> = ({ posts }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-[500px]"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <img
            src={`/storage/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderComponent;

