import React, { useState } from "react";
import useRandomQuestion from "./components/hook/useRandomQuestion";

const App: React.FC = (): JSX.Element => {
  const data = useRandomQuestion();

  if (data) console.log(data);

  return <div>Buenos dias</div>;
};

export default App;
