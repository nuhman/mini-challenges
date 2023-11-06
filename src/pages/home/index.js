import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <p>
        <Link
          to="/challenges/auto-complete"
          className="text-3xl font-bold underline"
        >
          Auto-Complete/TypeAhead
        </Link>
      </p>
    </div>
  );
};
