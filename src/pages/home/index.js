import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="p-4 pt-8">
      <h3 className="text-3xl mb-6">Mini Challenges</h3>
      <p>
        <Link
          to="/challenges/auto-complete"
          className="text-1xl underline hover:text-green-500"
        >
          Auto-Complete Input
        </Link>
      </p>
      <p>
        <Link
          to="/challenges/text-metrics"
          className="text-1xl underline hover:text-green-500"
        >
          Text Metrics Tool
        </Link>
      </p>
    </div>
  );
};
