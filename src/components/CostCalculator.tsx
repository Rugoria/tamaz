"use client";

import { useId, useState } from "react";
import { cost } from "@/content/site";
import { SectionHead } from "./SectionHead";
import styles from "./CostCalculator.module.css";

const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

export function CostCalculator() {
  const [price, setPrice] = useState(cost.options[0].price);
  const [down, setDown] = useState(cost.down.initial);
  const [months, setMonths] = useState(cost.months.initial);
  const [insured, setInsured] = useState(true);
  const id = useId();

  const ins = insured ? Math.min(cost.maxInsurance, price * cost.insuranceShare) : 0;
  const monthly = Math.max(0, price - ins - down) / months;

  return (
    <section id="cost" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={cost.eyebrow} title={cost.title} lede={cost.lede} />
        <div className={`${styles.cost} reveal`}>
          <div>
            <div className={styles.field}>
              <span className={styles.label} id={`${id}-treat`}>Treatment</span>
              <div className={styles.seg} role="group" aria-labelledby={`${id}-treat`}>
                {cost.options.map((o) => (
                  <button key={o.label} type="button" className="chipbtn" aria-pressed={price === o.price} onClick={() => setPrice(o.price)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${id}-down`}>
                Down payment <output htmlFor={`${id}-down`}>{money(down)}</output>
              </label>
              <input
                type="range"
                id={`${id}-down`}
                min={cost.down.min}
                max={cost.down.max}
                step={cost.down.step}
                value={down}
                onChange={(e) => setDown(Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${id}-months`}>
                Months to pay <output htmlFor={`${id}-months`}>{months}</output>
              </label>
              <input
                type="range"
                id={`${id}-months`}
                min={cost.months.min}
                max={cost.months.max}
                step={cost.months.step}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>
            <label className={styles.check}>
              <input type="checkbox" checked={insured} onChange={(e) => setInsured(e.target.checked)} /> {cost.insuranceLabel}
            </label>
          </div>
          <div className={styles.result}>
            <div>
              <div className={styles.resultLabel}>Estimated monthly payment</div>
              <div className={styles.monthly} aria-live="polite">
                <span>{money(monthly)}</span>
                <small> /mo</small>
              </div>
            </div>
            <dl>
              <dt>Treatment fee</dt><dd>{money(price)}</dd>
              <dt>Estimated insurance benefit</dt><dd>−{money(ins)}</dd>
              <dt>Down payment</dt><dd>−{money(down)}</dd>
              <dt>Interest</dt><dd>$0</dd>
            </dl>
            <p className={styles.note}>{cost.note}</p>
          </div>
        </div>
        <p className="reveal" style={{ marginTop: 36, color: "var(--muted)", fontSize: ".95rem" }}>{cost.logosIntro}</p>
        <div className={`${styles.logos} reveal`} role="list" aria-label="Insurance partner logos (placeholders)">
          {cost.logos.map((l) => (
            <span key={l} role="listitem" className={styles.lg}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
