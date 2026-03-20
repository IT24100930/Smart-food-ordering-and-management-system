import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import PageHeader from "../../components/layout/PageHeader";

function NotFound() {
  return (
    <section>
      <PageHeader
        title="Page Not Found"
        description="The page you are looking for does not exist in this demo project."
      />
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </section>
  );
}

export default NotFound;
