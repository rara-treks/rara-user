import { User } from "@/types/user.types";
import { cookies } from "next/headers";

async function getUserProfile(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${process.env.BASE_URL}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    return null;
  }
}

export default getUserProfile;
