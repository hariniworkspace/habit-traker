import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import Header from "./components/Header";
import HabitList from "./components/HabitList";
import HabitView from "./components/HabitView";
import Login from "./components/Login";
import Landing from "./components/Landing";

import { useAuth } from "./context/AuthContext";
import {
  getHabits,
  addHabit,
  deleteHabit,
  toggleHabit,
} from "./api";

function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function AppContent() {
  const { user } = useAuth();

  const [habits, setHabits] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/" ||
        location.pathname === "/login")
    ) {
      navigate("/app", {
        replace: true,
      });
    }
  }, [
    user,
    location,
    navigate,
  ]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) return;

      try {
        const data =
          await getHabits();

        setHabits(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHabits();
  }, [user]);

  const handleAdd = async (
    name,
    icon
  ) => {
    if (!name.trim()) return;

    try {
      const newHabit =
        await addHabit(
          name,
          icon
        );

      setHabits((prev) => [
        newHabit,
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteHabit(id);

      setHabits((prev) =>
        prev.filter(
          (h) => h._id !== id
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (
    id
  ) => {
    try {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      await toggleHabit(
        id,
        today
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user && <Header />}

      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/app"
          element={
            <PrivateRoute>
              <HabitList
                habits={habits}
                onAdd={handleAdd}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/habit/:id"
          element={
            <PrivateRoute>
              <HabitView
                habits={habits}
                onToggle={
                  handleToggle
                }
                onDelete={
                  handleDelete
                }
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}