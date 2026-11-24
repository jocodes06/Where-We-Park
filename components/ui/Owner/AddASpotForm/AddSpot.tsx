"use client";
import LocationSection from "./LocationSection";
import { AddSpotProps } from "@/types/types";
import SpotTypeSection from "./SpotTypeSection";
import PricingSection from "./PricingSection";
import Availibility from "./Availibility";
import AmenitiesSection from "./AmenitiesSection";
import PhotoDescription from "./PhotoDescription";
import styles from "./spot.module.css"
import Link from "next/link";
import { postUserParkingSpots } from "@/lib/addparking";
import { useRouter } from "next/navigation";
import useParkingSpots from "@/hooks/useParkingSpots";


export default function AddSpot({ formData, setFormData }: AddSpotProps) {
    const { refetch } = useParkingSpots();
    const router = useRouter();
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          await postUserParkingSpots(formData);
          await refetch();
          router.push("/owner/dashboard");
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <>
      <form className={styles.formPart} onSubmit={handleSubmit}>
        <h3>Tell us about your spot</h3>
        <p>
          This info is what drivers see first, be specific so there are no
          surprises.
        </p>
        <LocationSection formData={formData} setFormData={setFormData} />
        <SpotTypeSection formData={formData} setFormData={setFormData} />
        <PricingSection formData={formData} setFormData={setFormData} />
        <Availibility formData={formData} setFormData={setFormData} />
        <AmenitiesSection formData={formData} setFormData={setFormData} />
        <PhotoDescription formData={formData} setFormData={setFormData}/>
        <div className={styles.formButtons}>
          <Link href="/owner/dashboard">
            <button>Back</button>
          </Link>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
