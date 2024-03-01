import Form from "./Form";
import User from "./User";
import ProjectInfo from "./ProjectInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {


  return (
    <Router>
      <Routes>
        <Route index element={<Form />} />
        <Route path=":username" element={<User />} >
          <Route path="/:username/:repo" element={<ProjectInfo />} />
        </Route>

      </Routes>
    </Router>
  );
}