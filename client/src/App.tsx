import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/AppRouter";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

function App() {
  const { isCheckingAuth, checkAuthentication } = useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
