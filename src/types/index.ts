export type ImageIProps = {
    url: string
}

export type PropertyData = {
    images: {
        data: ImageIProps[]
    };
    title: string;
    ratings: {
        value: number
    };
    price: number;
    currency: {
        symbol: string
    }
    location: {
        city: string;
        country: {
            title: string
        }
    }
    description: string
};

export type PropertyObject = {
    info: PropertyData;
};

export interface PropertyIProps {
    data: PropertyObject;
}