// // (This is React JS, not C++. useEffect is React-only.)

// import { useState, useEffect } from "react";

// function App() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     document.title = `Count is ${count}`;
//   }, [count]); // dependency array


//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>+</button>
//       <button onClick={() => setCount(count - 1)}>-</button>

//     </div>

//   );

// }   

// export default App;

// App.jsx
import { AuthContext } from "./AuthContext";

function App() {
  const user = { name: "Subham", loggedIn: true };

  return (
    <AuthContext.Provider value={user}>
      <Dashboard />
    </AuthContext.Provider>
  );
}

export default App;
