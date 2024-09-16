import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { selectIsAuthenticated } from "../../features/login/loginSlice";
import { useEffect } from "react";

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/auth`);
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
