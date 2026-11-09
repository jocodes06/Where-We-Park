import styles from '../../app/page.module.css'

type Features = {
  icon: string,
  title: string,
  text: string,
}[]


const features: Features = [
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
  {
    icon: "📱",
    title: "QR parking pass",
    text: "Pay with Stripe, scan at the gate.",
  },
  {
    icon: "⏱️",
    title: "Flexible booking",
    text: "Reserve a spot for exactly when you need it.",
  },
  {
    icon: "🔔",
    title: "Parking reminders",
    text: "Get notified before your parking time runs out.",
  },
];


export default function Features(){
    return(
        <section className={styles.homeFeatures}>
        <h2>Park in seconds, not circles.</h2>
        <p>Everything a driver needs, from search to the gate.</p>
        <section className={styles.featureDivs}>
          {features.map((item,index) => (
            <div key={index}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </section>
      </section>
    )
}