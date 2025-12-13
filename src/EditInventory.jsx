import { useState } from "react";
import styles from "./EditInventory.module.css";

const TABS = [
  "General",
  "Description",
  "Options",
  "Checklist",
  "Keys",
  "Disclosures",
  "Other",
];

export default function EditInventory() {
  const [activeTab, setActiveTab] = useState("General");

  const currentIndex = TABS.indexOf(activeTab);

  const goNext = () => {
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1]);
    }
  };

  return (
    <section className={styles.inventory}>
      {/* ===== Header ===== */}
      <header className={styles.inventory__header}>
        <h1 className={styles.inventory__title}>INVENTORY</h1>

        <div className={styles.inventory__meta}>
          <span>
            Stock <strong className={styles.inventory__accent}>00002165461232</strong>
          </span>
          <span>
            Make <strong className={styles.inventory__accent}>ABARTH</strong>
          </span>
          <span>
            Model <strong className={styles.inventory__accent}>TESTQ</strong>
          </span>
          <span>
            Year <strong className={styles.inventory__accent}>2005</strong>
          </span>
          <span>
            VIN <strong className={styles.inventory__accent}>QWERTYUIOPP</strong>
          </span>
        </div>

        <button className={styles.inventory__close} aria-label="Close" />
      </header>

      <div className={styles.inventory__body}>
        {/* ===== Sidebar ===== */}
        <nav className={styles.sidebar} aria-label="Inventory navigation">
          <ul className={styles.sidebar__list}>
            {TABS.map((tab) => (
              <li
                key={tab}
                className={`${styles.sidebar__item} ${
                  activeTab === tab ? styles.sidebar__item_active : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={styles.sidebar__dot} />
                {tab}
              </li>
            ))}
          </ul>
        </nav>

        {/* ===== Main Content ===== */}
        <main className={styles.content}>
          {activeTab === "General" ? (
            <section className={styles.section}>
              <h2 className={styles.section__title}>GENERAL</h2>

              <form className={styles.form}>
                <div className={styles.form__row}>
                  <div className={styles.form__field}>
                    <label className={styles.form__label}>Location name</label>
                    <select className={styles.form__control}>
                      <option>Default location</option>
                      <option>Main warehouse</option>
                      <option>Showroom</option>
                      <option>Remote storage</option>
                    </select>
                  </div>

                  <div className={styles.form__field}>
                    <label className={styles.form__label}>Inventory group</label>
                    <select className={styles.form__control}>
                      <option>New vehicles</option>
                      <option>Used vehicles</option>
                      <option>Demo</option>
                      <option>Wholesale</option>
                    </select>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.form__row}>
                  <div className={styles.form__field}>
                    <label className={styles.form__label}>VIN</label>
                    <div className={styles.form__vin}>
                      <input
                        className={styles.form__control}
                        value="QWERTYUIOPP"
                        readOnly
                      />
                      <button type="button" className={styles.form__decode}>
                        DECODE
                      </button>
                    </div>
                  </div>

                  <div className={styles.form__field}>
                    <label className={styles.form__label}>Stock</label>
                    <input
                      className={styles.form__control}
                      value="2165461232"
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </section>
          ) : (
            <section className={styles.section}>
              <h2 className={styles.section__title}>{activeTab}</h2>
            </section>
          )}

          {/* ===== FOOTER ACTIONS ===== */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actions__back}
              onClick={goBack}
              disabled={currentIndex === 0}
            >
              Back
            </button>

            <button
              type="button"
              className={styles.actions__next}
              onClick={goNext}
              disabled={currentIndex === TABS.length - 1}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
