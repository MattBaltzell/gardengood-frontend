import { Link } from "react-router-dom";

const Unauth = () => {
  return (
    <main className="Unauth">
      <h1>Not so fast!</h1>
      <h3>You do not have permission to view that page!</h3>
      <Link to="/">Return to home page.</Link>
    </main>
  );
};

export default Unauth;
