import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/image-slot/ImageSlot";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { Copy } from "@/components/Tbd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getLocale, getSiteContent } from "@/content/server";
import { fill, localize } from "@/lib/i18n";
import { ShopFilter } from "./ShopFilter";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { shop, brand } = await getSiteContent();
  return { title: `${shop.metaTitle} · ${brand.name}`, description: shop.hero.lede };
}

/** A price, and the regular price struck through beside it when there is one. */
function Price({ price, was, wasLabel }: { price: string; was?: string; wasLabel: string }) {
  return (
    <span className={styles.price}>
      <b>
        <Copy text={price} />
      </b>
      {was && (
        <s aria-label={`${wasLabel}: ${was}`}>
          <Copy text={was} />
        </s>
      )}
    </span>
  );
}

/**
 * The shop (/shop): aligner plans, an impression kit, care products and gift cards, laid out after the
 * ALIGNERCO clear-aligner collection page. There is no checkout yet; every buy button opens WhatsApp with the
 * product already named in the message.
 */
export default async function Shop() {
  const locale = await getLocale();
  const { brand, nav, shop, ui, whatsapp } = await getSiteContent();
  const { labels } = shop;
  const order = (item: string) => `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(fill(shop.whatsappMessage, { item }))}`;
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <>
      <header className={styles.bar}>
        <div className="wrap">
          <Link className="logo" href={localize(locale, "/")} aria-label={fill(ui.home, { brand: brand.name })}>
            <Logo />
          </Link>
          <Link className={styles.back} href={localize(locale, shop.back.href)}>
            <span className="arr-back" aria-hidden="true">←</span> {shop.back.label}
          </Link>
          <LanguageSwitcher className={styles.lang} locale={locale} label={ui.language} />
          <Link className={`btn btn-primary ${styles.book}`} href={localize(locale, `/${nav.cta.href}`)}>
            {nav.cta.label}
          </Link>
        </div>
      </header>

      <main>
        {/* Hero. */}
        <section className={styles.hero}>
          <div className={`wrap ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">{shop.hero.eyebrow}</span>
              <h1>{shop.hero.title}</h1>
              <p className="lede">{shop.hero.lede}</p>
            </div>
            <ImageSlot {...shop.hero.image} className={styles.heroImage} aspect="4/3" sizes="(max-width: 900px) 92vw, 560px" priority />
          </div>
        </section>

        {/* Everything below the hero is filtered by the category tabs (see ShopFilter). */}
        <ShopFilter label={shop.categoriesLabel} categories={shop.categories}>
        {/* The two aligner plans. */}
        <section id="plans" className={styles.plans} data-cats="aligners">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{shop.plans.eyebrow}</span>
              <h2>{shop.plans.title}</h2>
              <p className="lede">{shop.plans.lede}</p>
            </div>
            <p className={styles.review}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3zm-1.2 13.6l6-6-1.4-1.4-4.6 4.6-2.2-2.2-1.4 1.4 3.6 3.6z" />
              </svg>
              <span>
                <Copy text={shop.plans.review} />
              </span>
            </p>
            <div className={styles.planGrid}>
              {shop.plans.items.map((p) => (
                <article key={p.id} className={styles.plan} aria-labelledby={`plan-${p.id}`}>
                  <span className={styles.badge}>{p.badge}</span>
                  <ImageSlot {...p.image} className={styles.planImage} aspect="16/9" sizes="(max-width: 900px) 92vw, 560px" />
                  <h3 id={`plan-${p.id}`}>{p.name}</h3>
                  <dl className={styles.facts}>
                    <div>
                      <dt>{labels.duration}</dt>
                      <dd>
                        <Copy text={p.duration} />
                      </dd>
                    </div>
                    <div>
                      <dt>{labels.wear}</dt>
                      <dd>
                        <Copy text={p.wear} />
                      </dd>
                    </div>
                  </dl>
                  <p className={styles.summary}>{p.summary}</p>

                  <div className={styles.option}>
                    <div>
                      <small>{labels.oneTime}</small>
                      <Price price={p.oneTime.price} was={p.oneTime.was} wasLabel={labels.was} />
                    </div>
                    <a className="btn btn-primary" href={order(`${p.name} (${labels.oneTime})`)} {...external}>
                      {labels.buy} <span className="arr">→</span>
                    </a>
                  </div>

                  <small className={styles.monthlyHead}>{labels.monthly}</small>
                  <ul className={styles.monthly}>
                    {p.monthly.map((m, i) => (
                      <li key={i} className={styles.option}>
                        <div>
                          <small>
                            <Copy text={m.name} />
                          </small>
                          <span className={styles.price}>
                            <b>
                              <Copy text={m.price} />
                            </b>
                          </span>
                        </div>
                        <a className="btn btn-ghost" href={order(`${p.name} (${m.name})`)} {...external}>
                          {labels.buy}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <small className={styles.monthlyHead}>{labels.includes}</small>
                  <ul className={styles.includes}>
                    {p.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Impression kit banner. */}
        <section id="kit" className={styles.bannerSection} data-cats="aligners">
          <div className="wrap">
            <div className={styles.banner}>
              <ImageSlot {...shop.kit.image} className={styles.bannerImage} aspect="4/3" sizes="(max-width: 900px) 92vw, 480px" />
              <div className={styles.bannerCopy}>
                <span className="eyebrow">{shop.kit.eyebrow}</span>
                <h2>{shop.kit.title}</h2>
                <p>{shop.kit.body}</p>
                <Price price={shop.kit.price} was={shop.kit.was} wasLabel={labels.was} />
                <a className="btn btn-primary" href={order(shop.kit.title)} {...external}>
                  {labels.order} <span className="arr">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Products, each card in its own category. */}
        <section id="products" className={styles.care} data-cats="retainers night-guard mouth-guard accessories">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{shop.products.eyebrow}</span>
              <h2>{shop.products.title}</h2>
            </div>
            <ul className={styles.products}>
              {shop.products.items.map((item) => (
                <li key={item.id} className={styles.product} data-cats={item.category}>
                  <ImageSlot {...item.image} label={item.name} alt={item.name} className={styles.productImage} aspect="1/1" sizes="(max-width: 560px) 92vw, (max-width: 1000px) 46vw, 390px" />
                  {item.badge && (
                    <span className={styles.sale}>
                      <Copy text={item.badge} />
                    </span>
                  )}
                  <div className={styles.productInfo}>
                    <div>
                      <h3>{item.name}</h3>
                      <Price price={item.price} was={item.was} wasLabel={labels.was} />
                    </div>
                    <a className={`btn ${styles.productBuy}`} href={order(item.name)} {...external}>
                      {labels.buy}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gift card banner. */}
        <section id="gift" className={styles.bannerSection} data-cats="gift">
          <div className="wrap">
            <div className={`${styles.banner} ${styles.gift}`}>
              <div className={styles.bannerCopy}>
                <span className="eyebrow">{shop.gift.eyebrow}</span>
                <h2>{shop.gift.title}</h2>
                <p>
                  <Copy text={shop.gift.body} />
                </p>
              </div>
              <a className="btn btn-primary" href={order(labels.giftItem)} {...external}>
                {labels.giftCta} <span className="arr">→</span>
              </a>
            </div>
          </div>
        </section>
        </ShopFilter>

        {/* Closing call to action. */}
        <section className={styles.cta}>
          <div className="wrap">
            <h2>{shop.cta.title}</h2>
            <p className="lede">{shop.cta.lede}</p>
            <Link className="btn btn-primary" href={localize(locale, shop.cta.href)}>
              {shop.cta.label} <span className="arr">→</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
