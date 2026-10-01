import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container notfound">
      <p className="crumbs"><Link to="/">Home</Link> / <span>404 Error</span></p>
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <Link to="/" className="btn btn-red">Back to home page</Link>
    </div>
  );
}
