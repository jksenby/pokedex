import "./styles/App.css";

import AppHeader from "./components/AppHeader/AppHeader";
import Spinner from "./components/Spinner/Spinner";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const PokeList = lazy(() => import("./components/PokeList/PokeList")),
  SignUpPage = lazy(() => import("./components/SignUpPage/SignUpPage")),
  SignInPage = lazy(() => import("./components/SignInPage/SignInPage")),
  Profile = lazy(() => import("./components/Profile/Profile")),
  PokeInfo = lazy(() => import("./components/PokeInfo/PokeInfo"));

function App() {
  return (
    <>
      <Router>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/pokedex" element={<PokeList />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/:login" element={<Profile />} />
              <Route path="/pokemon/:id" element={<PokeInfo />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </>
  );
}

export default App;
