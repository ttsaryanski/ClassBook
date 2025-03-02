import styles from "./Contacts.module.css";
import Map from "../../components/shared/Map";

export default function Contacts() {
    return (
        <section
            className={`${styles.contact_section} ${styles.layout_padding}`}
        >
            <div className={styles.container}>
                <div className={styles.heading_container}>
                    <h2 className={styles.h2}>Contact Us</h2>
                </div>
                <div className={styles.row}>
                    <div className={styles.col_md_6}>
                        <form className={styles.form}>
                            <div className={styles.input_container}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    className={styles.input}
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    className={`${styles.input} ${styles.message_box}`}
                                    type="text"
                                    placeholder="Message"
                                />
                            </div>
                            <div className={styles.d_flex}>
                                <button className={styles.button}>SEND</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.col_md_6}>
                        <div className={styles.map_container}>
                            <div className={styles.map}>
                                <div
                                    id="googleMap"
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
