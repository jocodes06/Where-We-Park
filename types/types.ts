export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: "DRIVER" | "OWNER";
}

export type Review = {
   lot_id: string,
   description:string,
   stars: number,
   tags: string[];
}

export type Booking = {
  id:string,
  booking_date: string;
  duration_type: string,
  duration_hours: number,
  start_time: string,
  end_time: string,
  parking_cost: number,
  service_fee: number,
  total_amount: number
}


export type BookingRequest = {
    id:string;
    lot_id:string,
    driver_first_name: string;
    driver_last_name: string;
    lot_name: string;
    address: string;
    booking_date: string;
    booking_type: string;
    duration_hours: number;
    start_time: string;
    end_time: string;
    photos: string[];
    parking_cost: number;
    service_fee: number;
    total_amount: number;
    status: string;
};


export type ParkingSpot = {
  id: string;
  host_name:string,
  name:string,
  address: string;
  spot_type: string;
  price_per_hours: number;
  price_per_day: number;
  description: string | null;
  availability: Weekday[]
  is_active: boolean;
  photos: {
    id: string;
    photo_url: string;
  }[];
  amenities?: AmenityType[]
  reviews: review
  latitude:string,
  longitude:string,
  city:string,
};


export type review = {
    description:string,
    driver_id:string,
    review_id:string,
    stars: number,
    tags: {
        id:string,
        tag:string,
    }[],
    host_name:string,
  }[]

export type FeaturesType={
    icon:string,
    title:string,
    text:string,
}[]

export type parkingSpotForm = {
    name: string,
    address: string,
    spotType: string,
    pricePerHour: number,
    pricePerDay: number,
    availability: Weekday[],
    amenities: AmenityType[],
    photos: Photo[],
    description: string,
    latitude?:string,
    longitude?:string,
}

export type AddSpotProps={
    formData: parkingSpotForm;
    setFormData: React.Dispatch<React.SetStateAction<parkingSpotForm>>;
};

export type AmenityType = {
    type: string,
    icon: string,
}

export type Weekday = {
    day: string,
    isOpen: boolean,
    openTime: string;
    closeTime: string;
}
export type Photo = {
    id: string;
    file: File;
    preview: string;
};


