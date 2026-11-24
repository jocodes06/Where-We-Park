"use client";
import styles from "./spot.module.css"
import { AddSpotProps } from "@/types/types";

export default function PhotoDescription({
  formData,
  setFormData,
}: AddSpotProps) {
    
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
  return (
    <>
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
                    photos: prev.photos.filter((item) => item.id !== photo.id),
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
    </>
  );
}
