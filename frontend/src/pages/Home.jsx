import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { ArrowL, ArrowR, ChevronR, ArrowUp, Phone, Computer, Watch, Camera, Headphones, Gaming, Truck, Headset, Shield } from '../components/Icons.jsx';
import { productApi } from '../services/api.js';
import useCountdown from '../hooks/useCountdown.js';
import { pad } from '../utils/format.js';

const sideMenu = ["Woman's Fashion", "Men's Fashion", 'Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor', "Baby's & Toys", 'Groceries & Pets', 'Health & Beauty'];
const categories = [
  { name: 'Phones', q: 'phone', Icon: Phone },
  { name: 'Computers', q: 'laptop', Icon: Computer },
  { name: 'SmartWatch', q: 'watch', Icon: Watch },
  { name: 'Camera', q: 'camera', Icon: Camera },
  { name: 'HeadPhones', q: 'headphone', Icon: Headphones },
  { name: 'Gaming', q: 'gaming', Icon: Gaming },
];

const Timer = ({ seconds, dark }) => {
  const t = useCountdown(seconds);
  const parts = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.minutes], ['Seconds', t.seconds]];
  return parts.map(([label, v]) => (
    <div key={label} className={dark ? 'cd-circle' : 'cd-box'}><small>{label}</small><b>{pad(v)}</b></div>
  ));
};

export default function Home() {
  const [params] = useSearchParams();
  const search = params.get('q');
  const [flash, setFlash] = useState([]);
  const [best, setBest] = useState([]);
  const [explore, setExplore] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [error, setError] = useState('');
  const flashRef = useRef(null);
  const exploreRef = useRef(null);

  useEffect(() => {
    setError('');
    Promise.all([productApi.list({ limit: 10 }), productApi.list({ limit: 4, skip: 10 }), productApi.list({ limit: 8, skip: 14 }), productApi.list({ limit: 4, skip: 22 })])
      .then(([f, b, e, a]) => { setFlash(f.products); setBest(b.products); setExplore(e.products); setArrivals(a.products); })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const q = search || activeCat?.q;
    if (!q) return;
    productApi.list({ q, limit: 8 }).then((d) => setExplore(d.products)).catch((e) => setError(e.message));
  }, [search, activeCat]);

  const scroll = (ref, dir) => ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  const Arrows = ({ target }) => (
    <div className="arrows"><button onClick={() => scroll(target, -1)} aria-label="Previous"><ArrowL width={20} height={20} /></button><button onClick={() => scroll(target, 1)} aria-label="Next"><ArrowR width={20} height={20} /></button></div>
  );

  return (
    <div className="container home">
      <section className="hero">
        <ul className="side-menu">
          {sideMenu.map((m, i) => <li key={m}>{m}{i < 2 && <ChevronR width={16} height={16} />}</li>)}
        </ul>
        <div className="banner">
          <a href="#products" className="banner-link">
            <img src="/hero-banner.png" alt="iPhone 14 Series - Up to 10% off Voucher" className="hero-banner-img" />
          </a>
          <div className="dots"><i /><i /><i className="on" /><i /><i /></div>
        </div>
      </section>

      {error && <p className="err api-err" role="alert">Could not load products: {error}</p>}

      <section>
        <SectionHeading label="Today's" title="Flash Sales">
          <div className="countdown"><Timer seconds={3 * 86400 + 23 * 3600 + 19 * 60 + 56} /></div>
          <Arrows target={flashRef} />
        </SectionHeading>
        <div className="scroller" ref={flashRef}>{flash.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        <div className="center"><Link to="/" className="btn btn-red">View All Products</Link></div>
      </section>

      <hr />

      <section>
        <SectionHeading label="Categories" title="Browse By Category"><Arrows target={{ current: null }} /></SectionHeading>
        <div className="cats">
          {categories.map((c) => (
            <button key={c.name} className={`cat ${activeCat?.name === c.name ? 'on' : ''}`} onClick={() => { setActiveCat(c); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <c.Icon width={48} height={48} strokeWidth={1.4} />{c.name}
            </button>
          ))}
        </div>
      </section>

      <hr />

      <section>
        <SectionHeading label="This Month" title="Best Selling Products"><Link to="/" className="btn btn-red">View All</Link></SectionHeading>
        <div className="grid4">{best.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="music">
        <div>
          <p>Categories</p>
          <h2>Enhance Your<br />Music Experience</h2>
          <div className="cd-row"><Timer seconds={23 * 3600 + 59 * 60 + 35} dark /></div>
          <button className="btn btn-green">Buy Now!</button>
        </div>
        <div className="speaker" aria-hidden="true" />
      </section>

      <section id="products">
        <SectionHeading label="Our Products" title={search ? `Results for “${search}”` : activeCat ? activeCat.name : 'Explore Our Products'}>
          <Arrows target={exploreRef} />
        </SectionHeading>
        {explore.length === 0 && !error && <p className="page-msg">No products found. Try a different search.</p>}
        <div className="grid4" ref={exploreRef}>{explore.map((p, i) => <ProductCard key={p.id} product={p} badge={i === 4 || i === 6 ? 'NEW' : null} />)}</div>
        <div className="center"><Link to="/" className="btn btn-red">View All Products</Link></div>
      </section>

      <section>
        <SectionHeading label="Featured" title="New Arrival" />
        <div className="arrival">
          {arrivals.map((p, i) => (
            <div key={p.id} className={`tile tile-${i}`}>
              <img src={p.thumbnail} alt="" />
              <div><h3>{p.title}</h3><p>{p.description?.slice(0, 60)}…</p><a href="#products">Shop Now</a></div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="services">
        {[[Truck, 'FREE AND FAST DELIVERY', 'Free delivery for all orders over $140'], [Headset, '24/7 CUSTOMER SERVICE', 'Friendly 24/7 customer support'], [Shield, 'MONEY BACK GUARANTEE', 'We return money within 30 days']].map(([Icon, t, s]) => (
          <div key={t}><span className="svc-icon"><Icon width={32} height={32} /></span><h4>{t}</h4><p>{s}</p></div>
        ))}
      </section>
      <span id="contact" />
      <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp width={20} height={20} /></button>
    </div>
  );
}
