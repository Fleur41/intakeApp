// import IntakeForm from "./IntakeForm";
// function App() {
//   return <IntakeForm />;
// }
// export default App;


// import React, { useState } from "react";
// import LandingPage from "./LandingPage";
// import AdminLogin from "./AdminLogin";
// import IntakeForm from "./IntakeForm";

// function App() {
//   const [page, setPage] = useState("landing");
//   const [admin, setAdmin] = useState(null);

//   if (page === "landing") {
//     return (
//       <LandingPage
//         onStart={() => setPage("login")}
//       />
//     );
//   }

//   if (page === "login") {
//     return (
//       <AdminLogin
//         onLogin={(username, password) => {
//           setAdmin({ username, password });
//           setPage("form");
//         }}
//         onBack={() => setPage("landing")}
//       />
//     );
//   }

//   if (page === "form") {
//     return (
//       <IntakeForm
//         adminUsername={admin.username}
//         adminPassword={admin.password}
//         onBack={() => {
//           setAdmin(null);
//           setPage("landing");
//         }}
//       />
//     );
//   }

//   return null;
// }

// export default App;


import React, { useState } from "react";
import LandingPage from "./LandingPage";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";
import IntakeForm from "./IntakeForm";

function App() {
  const [page, setPage] = useState("landing");
  const [admin, setAdmin] = useState(null);

  if (page === "landing") {
    return <LandingPage onStart={() => setPage("login")} />;
  }

  if (page === "login") {
    return (
      <AdminLogin
        onLogin={(username, password) => {
          setAdmin({ username, password });
          setPage("form");
        }}
        onSignup={() => setPage("signup")}
        onBack={() => setPage("landing")}
      />
    );
  }

  if (page === "signup") {
    return (
      <AdminSignup
        onSignupSuccess={(username, password) => {
          setAdmin({ username, password });
          setPage("form");
        }}
        onBack={() => setPage("login")}
      />
    );
  }

  if (page === "form") {
    return (
      <IntakeForm
        adminUsername={admin.username}
        adminPassword={admin.password}
        onBack={() => {
          setAdmin(null);
          setPage("landing");
        }}
      />
    );
  }

  return null;
}

export default App;


// import React, { useState } from 'react';
// import ClientMode from './components/ClientMode';
// import AdminMode from './components/AdminMode';

// export default function App() {
//   const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'client');

//   const toggleMode = (newMode) => {
//     setMode(newMode);
//     localStorage.setItem('mode', newMode);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Intake App</h1>
//         <div>
//           <button
//             aria-pressed={mode === 'client'}
//             className={`mr-2 px-4 py-2 rounded transition ${
//               mode === 'client' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'
//             }`}
//             onClick={() => toggleMode('client')}
//           >
//             Client
//           </button>
//           <button
//             aria-pressed={mode === 'admin'}
//             className={`px-4 py-2 rounded transition ${
//               mode === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'
//             }`}
//             onClick={() => toggleMode('admin')}
//           >
//             Admin
//           </button>
//         </div>
//       </header>
//       <main className="p-4">
//         {mode === 'client' ? <ClientMode /> : <AdminMode />}
//       </main>
//     </div>
//   );
// }
