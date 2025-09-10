import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    // Navigate back to login page
    navigate("/");
  };

  return { signOut };
};
