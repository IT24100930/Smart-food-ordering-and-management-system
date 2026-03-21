import PageHeader from "../../components/layout/PageHeader";
import useAuth from "../../hooks/useAuth";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  return (
    <section>
      <PageHeader title="Profile" description="View simple account information for the current user." />
      <div className="profile-card">
        <p><strong>Name:</strong> {user?.name || "Guest"}</p>
        <p><strong>Email:</strong> {user?.email || "Not logged in"}</p>
        <p><strong>Role:</strong> {user?.role || "guest"}</p>
      </div>
    </section>
  );
}

export default Profile;
