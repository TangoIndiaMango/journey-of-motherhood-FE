import React from "react";

const AuthLogic = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return data.json();
};

export default AuthLogic;
