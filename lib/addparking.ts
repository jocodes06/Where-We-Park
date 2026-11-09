import type { parkingSpotForm } from "@/types/types";

export async function postUserParkingSpots(formData: parkingSpotForm) {
  const body = new FormData();
  const { photos, ...fields } = formData;

  body.append("fields", JSON.stringify(fields));

  photos.forEach((photo) => {
    body.append("photos", photo.file);
  });

  const response = await fetch("/api/parking-spots", {
    method: "POST",
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create parking spot");
  }

  return data;
}