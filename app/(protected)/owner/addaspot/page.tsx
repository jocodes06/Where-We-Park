"use client";
import styles from "./addspot.module.css";
import Link from "next/link";
import React from "react";
import { postUserParkingSpots } from "@/lib/addparking";
import { useRouter } from "next/navigation";

import useParkingSpots from "@/hooks/useParkingSpots";

import type {
  AmenityType,
  Weekday,
  Photo,
  parkingSpotForm,
} from "@/types/types";

export default function addASpot() {
  const { refetch } = useParkingSpots();

  const spots: AmenityType[] = [
    {
      type: "garage",
      icon: "🏢",
    },
    {
      type: "driveway",
      icon: "🏠",
    },
    {
      type: "lot",
      icon: "🅿️",
    },
    {
      type: "ev",
      icon: "⚡",
    },
  ];

  const [formData, setFormData] = React.useState<parkingSpotForm>({
    name: "",
    address: "",
    city: "",
    spotType: "",
    pricePerHour: 0,
    pricePerDay: 0,
    availability: [
      { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "Tuesday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Wednesday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Thursday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Friday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Saturday", isOpen: false, openTime: "", closeTime: "" },
      { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
    ],
    amenities: [],
    photos: [],
    description: "",
  });

  const router = useRouter();

  const amenities: AmenityType[] = [
    { type: "Covered", icon: "🏠" },
    { type: "Handicap accessible", icon: "♿" },
    { type: "Security camera", icon: "📹" },
    { type: "EV charger on-site", icon: "⚡" },
    { type: "Gated entry", icon: "🔒" },
    { type: "Well lit", icon: "💡" },
    { type: "Fenced parking", icon: "🚧" },
    { type: "Motorcycle parking", icon: "🏍️" },
    { type: "Bicycle parking", icon: "🚲" },
    { type: "Oversized vehicle parking", icon: "🚚" },
    { type: "Compact car friendly", icon: "🚗" },
  ];

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    const newPhotos = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 4),
    }));

    e.target.value = "";
  }

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
    <section className={styles.addASpotMain}>
      <header>
        <div>
          <Link href="/owner/dashboard/listings">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h1>WhereWePark</h1>
        </div>
      </header>
      <form className={styles.formPart} onSubmit={handleSubmit}>
        <h3>Tell us about your spot</h3>
        <p>
          This info is what drivers see first, be specific so there are no
          surprises.
        </p>
        <div className={styles.location}>
          <h4>Location</h4>
          <p>Only the approximate area shows until a booking is confirmed.</p>
          <label htmlFor="name">Spot name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Covered outdoor spot"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Str. Regele Ferdinand 12, Cluj-Napoca"
            required
            id="address"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Cluj-Napoca"
            required
            id="city"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div className={styles.spotType}>
          <h4>Spot Type</h4>
          <p>Choose whichever fits best</p>
          <div>
            {spots.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    spotType: item.type.toLowerCase(),
                  }))
                }
              >
                <h5>{item.icon}</h5>
                <h5>{item.type}</h5>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.pricing}>
          <h4>Pricing</h4>
          <div>
            <div className={styles.pricesDiv}>
              <label htmlFor="priceperhour">Price per hour</label>
              <div className={styles.priceInput}>
                <i className="fa-solid fa-dollar-sign"></i>
                <input
                  type="number"
                  required
                  id="priceperhour"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricePerHour: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles.pricesDiv}>
              <label htmlFor="priceperday">Price per day</label>
              <div className={styles.priceInput}>
                <i className="fa-solid fa-dollar-sign"></i>
                <input
                  type="number"
                  required
                  id="priceperday"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricePerDay: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <p>
            WhereWePark takes a 12% service fee, shown to drivers at checkout.
          </p>
        </div>
        <div className={styles.availabilty}>
          <h4>Availibility</h4>
          <p>Set hours for each day, or turn a day off entirely.</p>
          <div className={styles.availabiltyList}>
            {formData.availability.map((item, index) => {
              if (item.isOpen) {
                return (
                  <div className={styles.availabiltyDiv} key={index}>
                    <div>
                      <h4>{item.day}</h4>
                      <div className={styles.timeDiv}>
                        <input
                          type="time"
                          required
                          value={item.openTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              availability: prev.availability.map((day) =>
                                day.day === item.day
                                  ? { ...day, openTime: e.target.value }
                                  : day,
                              ),
                            }))
                          }
                        />
                        <p>-</p>
                        <input
                          type="time"
                          required
                          value={item.closeTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              availability: prev.availability.map((day) =>
                                day.day === item.day
                                  ? { ...day, closeTime: e.target.value }
                                  : day,
                              ),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        defaultChecked
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            availability: prev.availability.map((day) =>
                              day.day === item.day
                                ? { ...day, isOpen: false }
                                : day,
                            ),
                          }))
                        }
                      />
                      <p>Open</p>
                    </div>
                  </div>
                );
              }
              return (
                <div className={styles.availabiltyDivClosed} key={index}>
                  <div>
                    <h4>{item.day}</h4>
                    <p>Closed</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: prev.availability.map((day) =>
                            day.day === item.day
                              ? { ...day, isOpen: true }
                              : day,
                          ),
                        }))
                      }
                    />
                    <p>Open</p>
                  </div>
                </div>
              );
            })}
          </div>
          <h5
            onClick={() => {
              const monday = formData.availability.find(
                (day) => day.day === "Monday",
              );
              if (!monday) return;
              setFormData((prev) => ({
                ...prev,
                availability: prev.availability.map((day) =>
                  day.isOpen
                    ? {
                        ...day,
                        openTime: monday.openTime,
                        closeTime: monday.closeTime,
                      }
                    : day,
                ),
              }));
            }}
          >
            Copy Monday's hours to all weekdays
          </h5>
        </div>
        <div className={styles.amenities}>
          <h4>Amenities</h4>
          <div className={styles.amenitiesList}>
            {amenities.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amenities: e.target.checked
                        ? [...prev.amenities, item]
                        : prev.amenities.filter(
                            (amenity) => amenity.type !== item.type,
                          ),
                    }))
                  }
                />
                <h5>{item.type}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.photos}>
          <h4>Photos</h4>
          <p>Add at least 3 photos. The first one becomes your cover photo.</p>
          <div className={styles.photoList}>
            {formData.photos.map((photo, index) => (
              <div className={styles.photo} key={photo.id}>
                <img src={photo.preview} alt={`Spot photo ${index + 1}`} />
                {index === 0 && <span className={styles.cover}>Cover</span>}
                <button
                  type="button"
                  className={styles.removePhoto}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      photos: prev.photos.filter(
                        (item) => item.id !== photo.id,
                      ),
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {formData.photos.length < 4 && (
              <label className={styles.addPhoto}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handlePhotos}
                />
                <span>+</span>
                <p>Add photos</p>
              </label>
            )}
          </div>
          {formData.photos.length < 3 && (
            <p className={styles.photoWarning}>Please add at least 2 photos.</p>
          )}
        </div>
        <div className={styles.description}>
          <h4>Description - Instruction</h4>
          <textarea
            name=""
            id=""
            required
            placeholder="Covered spot right by the main entrance."
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </div>
        <div className={styles.formButtons}>
          <Link href="/owner/dashboard">
            <button>Back</button>
          </Link>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}
