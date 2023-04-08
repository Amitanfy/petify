import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { SessionProvider } from "next-auth/react";

function App() {
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;
