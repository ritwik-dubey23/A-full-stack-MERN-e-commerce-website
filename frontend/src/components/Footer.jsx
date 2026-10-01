import { Link } from 'react-router-dom';
import { Send } from './Icons.jsx';

const social = ['f', 't', 'ig', 'in'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="logo">Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>
          <form className="subscribe" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Enter your email" aria-label="Email" type="email" />
            <button aria-label="Subscribe"><Send width={22} height={22} /></button>
          </form>
        </div>
        <div>
          <h4>Support</h4>
          <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li><Link to="/cart">My Account</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/">Wishlist</Link></li>
            <li><Link to="/">Shop</Link></li>
          </ul>
        </div>
        <div>
          <h4>Quick Link</h4>
          <ul><li>Privacy Policy</li><li>Terms Of Use</li><li>FAQ</li><li>Contact</li></ul>
        </div>
        <div>
          <h4>Download App</h4>
          <small>Save $3 with App New User Only</small>
          <div className="apps">
            <div className="qr" aria-hidden="true" />
            <div className="stores"><span>Google Play</span><span>App Store</span></div>
          </div>
          <div className="social">{social.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </div>
      <p className="copy">© Copyright Rimel 2022. All right reserved</p>
    </footer>
  );
}
