import Head from 'next/head';
import { NextPage } from 'next';
import { HeaderNav, PropertyCard } from '@/components';
import property from '@/constant/listing';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Created by create Andyson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <HeaderNav />
        </section>
        <section className="container mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {property?.data?.map((data: any, index: number) => (
              <PropertyCard key={index} data={data} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
