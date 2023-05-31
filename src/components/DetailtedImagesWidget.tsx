import { FC } from 'react';
import { ImageIProps } from '@/types';

interface IProps {
  images: ImageIProps[];
  mainImage: {
    url: string;
  };
}

const DetailtedImagesWidget: FC<IProps> = ({ images, mainImage }) => {
  images?.splice(4)
  console.log(images);
  return (
    <>
      <section className="hidden lg:block">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <img alt="" src={mainImage?.url} className="rounded-l-2xl h-96 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-2">
            {images?.map((data, index: number) => (
              <img
              key={index}
                alt=""
                src={data?.url}
                className={`${
                  index.valueOf() == 1 ? 'rounded-tr-2xl' : 'rounded-tr-2xl-none' && index.valueOf() == 3 ? 'rounded-br-2xl' : 'rounded-br-2xl-none'
                } h-48 w-full`}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="carousel sm:block lg:hidden carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
          {images?.map((data, index: number) => (
            <div key={index} className="carousel-item">
              <img src={data?.url} className="rounded-box h-48 w-full" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DetailtedImagesWidget;
