import { useEffect, useState } from "react";
import inventoryData from "./data/inventory.json";
import styles from "./EditInventory.module.css";

/* ===============================
   EditInventory
=============================== */
export default function EditInventory() {
  /* ===============================
     State
  =============================== */
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ===============================
     Load inventory data (local json)
  =============================== */

  useEffect(() => {
  const initInventory = () => {
    try {
      if (!inventoryData) {
        throw new Error("Inventory data is not provided");
      }

      if (!Array.isArray(inventoryData.tabs) || inventoryData.tabs.length === 0) {
        throw new Error("Inventory tabs are missing or empty");
      }

      setData(inventoryData);
      setActiveTab(inventoryData.tabs[0]);
    } catch (error) {
      console.error("Inventory initialization failed:", error);
      setError("Inventory data is unavailable or corrupted");
    } finally {
      setLoading(false);
    }
  };
  
  initInventory();
}, []);


  /* ===============================
     UI states
  =============================== */
  if (loading) {
    return <div className={styles.loader}>Загрузка данных…</div>;
  }

  if (error) {
    return (
      <div className={styles.message}>
        <h2 className={styles.message__title}>Ошибка загрузки</h2>
        <p className={styles.message__text}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.message}>
        <h2 className={styles.message__title}>Нет данных</h2>
        <p className={styles.message__text}>
          Информация по инвентарю отсутствует или была удалена.
        </p>
      </div>
    );
  }

  /* ===============================
     Data
  =============================== */
  const { inventory, tabs, general } = data;
  const currentIndex = tabs.indexOf(activeTab);

  /* ===============================
     Navigation handlers
  =============================== */
  const goNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  /* ===============================
     Render
  =============================== */
  return (
    <section className={styles.inventory}>
      {/* ===== Header ===== */}
      <header className={styles.inventory__header}>
        <h1 className={styles.inventory__title}>INVENTORY</h1>

        <div className={styles.inventory__meta}>
          <span>
            Stock <strong>{inventory.stock}</strong>
          </span>
          <span>
            Make <strong>{inventory.make}</strong>
          </span>
          <span>
            Model <strong>{inventory.model}</strong>
          </span>
          <span>
            Year <strong>{inventory.year}</strong>
          </span>
          <span>
            VIN <strong>{inventory.vin}</strong>
          </span>
        </div>

        <button className={styles.inventory__close} aria-label="Close" />
      </header>

      <div className={styles.inventory__body}>
        {/* ===== Sidebar ===== */}
        <nav className={styles.sidebar}>
          <ul className={styles.sidebar__list}>
            {tabs.map((tab) => (
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

        {/* ===== Content ===== */}
        <main className={styles.content}>
          {activeTab === "General" ? (
            <section className={styles.section}>
              <h2 className={styles.section__title}>GENERAL</h2>

              <form className={styles.form}>
                <div className={styles.form__row}>
                  <div className={styles.form__field}>
                    <label className={styles.form__label}>
                      Location name
                    </label>
                    <select className={styles.form__control}>
                      {general.locations.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.form__field}>
                    <label className={styles.form__label}>
                      Inventory group
                    </label>
                    <select className={styles.form__control}>
                      {general.groups.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.form__row}>
                  <div className={styles.form__field}>
                    <label className={styles.form__label}>VIN</label>
                    <input
                      className={styles.form__control}
                      value={inventory.vin}
                      readOnly
                    />
                  </div>

                  <div className={styles.form__field}>
                    <label className={styles.form__label}>Stock</label>
                    <input
                      className={styles.form__control}
                      value={inventory.stock}
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

          {/* ===== Footer actions ===== */}
          <div className={styles.actions}>
            <button onClick={goBack} disabled={currentIndex === 0}>
              Back
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === tabs.length - 1}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
