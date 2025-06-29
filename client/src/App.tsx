import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/AppRouter";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/others/Loading";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { isCheckingAuth, checkAuthentication } = useUserStore();
  const initialTheme = useThemeStore((state: any) => state.initializeTheme);

  useEffect(() => {
    checkAuthentication();
    initialTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
