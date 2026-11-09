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

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: "DRIVER" | "OWNER";
}


export type BookingRequest = {
    id:string;
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

export type ParkingSpotsContextType = {
    parkingSpots: ParkingSpot[];
    setParkingSpots: React.Dispatch<React.SetStateAction<ParkingSpot[]>>;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};


export type ParkingSpot = {
  id: string;
  host_name:string,
  name:string,
  address: string;
  city: string;
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
};

export type FavoriteSpot = {
  id: string;
  lot_name:string,
  address: string;
  city: string;
  spot_type: string;
  price_per_hours: number;
  is_active: boolean;
  photos: {
    id: string;
    photo_url: string;
  }[];
  amenities?: AmenityType[]
};




export type parkingSpotForm = {
    name: string,
    address: string,
    city: string,
    spotType: string,
    pricePerHour: number,
    pricePerDay: number,
    availability: Weekday[],
    amenities: AmenityType[],
    photos: Photo[],
    description: string,
}

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


