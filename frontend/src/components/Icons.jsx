const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const I = (d) => (props) => <svg {...base} {...props}>{d}</svg>;

export const Search = I(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const Heart = I(<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z" />);
export const CartIcon = I(<><path d="M2 3h3l2.5 12h11L21 7H6" /><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /></>);
export const User = I(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>);
export const Eye = I(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const ArrowL = I(<path d="M19 12H5m6-6-6 6 6 6" />);
export const ArrowR = I(<path d="M5 12h14m-6-6 6 6-6 6" />);
export const Chevron = I(<path d="m6 9 6 6 6-6" />);
export const ChevronR = I(<path d="m9 6 6 6-6 6" />);
export const Star = ({ filled = true }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#FFAD33' : '#BFBFBF'}><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.5 7.1L12 17.8 5.7 21.3l1.5-7.1L2 9.4l7-.8Z" /></svg>
);
export const Trash = I(<><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></>);
export const Close = I(<path d="M6 6l12 12M18 6 6 18" />);
export const Phone = I(<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>);
export const Computer = I(<><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 20h8M12 16v4" /></>);
export const Watch = I(<><rect x="7" y="6" width="10" height="12" rx="3" /><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4M12 10v3l2 1" /></>);
export const Camera = I(<><path d="M3 8h4l2-3h6l2 3h4v11H3Z" /><circle cx="12" cy="13" r="3.5" /></>);
export const Headphones = I(<><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>);
export const Gaming = I(<><rect x="2" y="7" width="20" height="10" rx="3" /><path d="M7 10v4M5 12h4M16 11h.01M18 13h.01" /></>);
export const Truck = I(<><path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const Headset = I(<><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M20 19c0 2-3 3-6 3" /></>);
export const Shield = I(<><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z" /><path d="m9 12 2 2 4-4" /></>);
export const Send = I(<path d="M3 12 21 3l-4 18-5-7Z M12 14l9-11" />);
export const ArrowUp = I(<path d="M12 19V5m-6 6 6-6 6 6" />);
