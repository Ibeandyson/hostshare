import { FC } from 'react';
import { PropertyIProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useProperty from '@/hooks/useProperty';

const PropertyCard: FC<PropertyIProps> = ({ data }) => {
  const router = useRouter();
  const { getAllPropertyDetails } = useProperty();

  const handleClick = (data: any) => {
    router.push({
      pathname: '/property-details',
      // query: { data: JSON.stringify(data) },
    });
    getAllPropertyDetails(data)
  };

  return (
    <div onClick={() => handleClick(data)} className="card card-compact w-auto bg-base-100 shadow-none  cursor-pointer">
      <div className="carousel">
        {data?.info?.images?.data?.map((data, index: number) => (
          <div key={index} id={`#slide${index}`} className="carousel-item relative items-center justify-center w-full group cursor-pointer">
            <Image width={500} height={500} alt="properties" src={data.url} className="rounded-2xl h-72 w-full" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between transform -translate-y-1/1 left-5 right-5 top-1/2">
              <a className="btn btn-circle">❮</a>
              <a className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
      <div className="card-body px-0 mt-5">
        <div className="flex">
          <div>
            <h2 className="card-title text-lg truncate w-32 ">{data.info.title}</h2>
          </div>
          <div className="ml-auto flex">
            <div className="flex items-center">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0">
                  <path d="M10 1L12.55 6.39L18 7.36L14.5 11.14L15.42 16.61L10 14.73L4.58 16.61L5.5 11.14L2 7.36L7.45 6.39L10 1z" />
                </svg>
              </div>
              <p>{data.info.ratings.value}</p>
            </div>
          </div>
        </div>
        <p className="text-sm font-extralight mt-[-5px] ">
          {data.info.location.city} {data.info.location.country.title}{' '}
        </p>
        <p className="text-sm font-extralight mt-[-5px] ">Jun 7 - 12</p>
        <p className="text-sm font-bold mt-[-5px] ">
          {data.info.currency.symbol}
          {data.info.price} night
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
