import styles from "./home.module.css"
import type { FeaturesType } from "@/types/types";

type Props = {
  role: string;
};

export default function Features({ role }: Props) {
  const driverFeatures: FeaturesType = [
    {
      icon: "🗺️",
      title: "Map search",
      text: "Every spot near your destination, priced.",
    },
    {
      icon: "🔎",
      title: "Smart filters",
      text: "Price, distance, covered, EV charging.",
    },
    {
      icon: "🅿️",
      title: "Live availability",
      text: "Pick a time. Only free spots show.",
    },
  ];

  const ownerFeatures: FeaturesType = [
    {
      icon: "💰",
      title: "Earn more",
      text: "Turn your empty parking spaces into extra income.",
    },
    {
      icon: "📊",
      title: "Smart management",
      text: "Manage prices, availability, and bookings in one place.",
    },
    {
      icon: "📈",
      title: "Live insights",
      text: "Track occupancy, bookings, and earnings in real time.",
    },
  ];

  const features = role === "driver" ? driverFeatures : ownerFeatures;

  return (
    <section className={styles.homeFeatures }>
      {role === "driver" ? (
        <>
          <h2>Park in seconds, not circles.</h2>
          <p>Everything a driver needs, from search to the gate.</p>
        </>
      ) : (
        <>
          <h2>Make your parking space pay.</h2>
          <p>Everything you need to manage spaces and grow your earnings.</p>
        </>
      )}

      <section className={styles.featureDivs}>
        {features.map((item, index) => (
          <div key={index}>
            <span>{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
