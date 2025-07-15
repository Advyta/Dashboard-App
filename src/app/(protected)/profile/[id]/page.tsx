
import ProfileContent from "./components/ProfileContent";

// Project: Dashboard App
// Component: ProfilePage
// Module: Profile
//Auther: Advyta
// Date: 29/06/2025
// Logic:
// 1. Fetch user data on component mount
// 2. Fetch user data from the server
// 3. Display user data
// 4. Handle profile update
// 5. Handle logout
// 6. Handle form submission

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  return <ProfileContent id={id} />;
}
