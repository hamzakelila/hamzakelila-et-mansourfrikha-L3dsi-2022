import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyProblemes from "./screens/MyProblemes/MyProblemes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

import SignupScreen from "./screens/SignupScreen/SignupScreen";
import CreateProbleme from "./screens/CreateProbleme/CreateProbleme";
import SingleProbleme from "./screens/SingleProbleme/SingleProbleme";
import { useState } from "react";
import Allprobleme from "./screens/Allprobleme/Allprobleme";
import { Probleme } from "./screens/Probleme/Probleme";
import Gestion_U from "./screens/gestion_user/Gestion_u";
import HomePage from "./screens/HomePage/HomePage";
import contact from "./components/contact/contact";
import AddProf from "./screens/add-prof/addProf";
const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/contact" component={contact} />
        <Route path="/addProf" component={AddProf} />

        <Route path="/login" component={LoginScreen} />
        <Route path="/registre" component={SignupScreen} />
        <Route path="/createProbleme" component={CreateProbleme} />
        <Route path="/note/:id" component={SingleProbleme} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/mynotes" component={() => <MyProblemes />} />

        <Route
          path="/Gestion_u"
          component={() => <Gestion_U search={search} />}
        />
        <Route
          path="/allprobleme"
          component={() => <Allprobleme search={search} />}
        />
        <Route path="/probleme/:id" component={Probleme} />
        {/* <Route path="/note/:id" component={SingleNote} /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
