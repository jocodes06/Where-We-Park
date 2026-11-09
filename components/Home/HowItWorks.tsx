import styles from '../../app/page.module.css'


type activityPeople = {
  initial: string,
  name:string,
  text: string,
  time: string,
  color: string,
  role: string,
}[]


const activityFeedPeople: activityPeople = [
  {
    initial: "S",
    name:"Sam",
    text: "is editing Nishiki Market lunch now",
    time: "now",
    color: "var(--soft-green)",
    role: "Editor",
  },
  {
    initial: "M",
    text: "added Fushimi Inari to Day 3",
    name:"Mia",
    time: "2 min ago",
    color: "var(--sunny-yellow)",
    role: "Owner",
  },
  {
    initial: "L",
    name:"Leo",
    text: "voted for Takoyaki crawl",
    time: "6 min ago",
    color: "var(--light-green)",
    role: "Editor",
  },
  {
    initial: "A",
    name:"Aiko",
    text: "saved Gion to Places",
    time: "1 hr ago",
    color: "var(--sea-blue)",
    role: "Viewer",
  },
];

export default function HowItWorks(){


    return(
        <section className={styles.homeTrip}>
        <h2>Everyone works on the same trip, at the same time.</h2>
        <p>See who's online, what changed, and who's allowed to change it.</p>
        <div className={styles.tripCards}>
          <div className={styles.card}>
            <h4>Activity feed</h4>
            {activityFeedPeople.map((item,index) => (
              <div key={index}>
                <h5><span style={{backgroundColor: item.color}}
                className={styles.initial}>{item.initial}</span>
                 <span className={styles.name}>{item.name} </span>{item.text}</h5>
                <p>{item.time}</p>
              </div>
            ))}
          </div>
          <div className={styles.card}>
            <h4>Members and roles</h4>
            {activityFeedPeople.map((item,index)=> (
              <div key={index}>
                <h5><span style={{backgroundColor: item.color}}
                className={styles.initial}>{item.initial}</span>
                <span className={styles.name}>{item.name} </span></h5>
                <p className={item.role==="Owner" ? styles.owner : 
                  item.role==="Editor" ? styles.editor :
                  item.role==="Viewer" ? styles.viewer : ""}>{item.role}</p>
              </div>
            ))
            }
            <p>Viewers can see and vote. Editors can change the plan.</p>
          </div>
        </div>
      </section>
    )
}