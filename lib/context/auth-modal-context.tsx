"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  backUrl: null,
};

const Context = createContext({
  state: defaultState,
  setState: () => {},
  closeModal: () => {},
});

export const useAuthModal = () => useContext(Context);

const AUTH_PATHS = ["/login", "/register", "/new-password", "/reset-password"];

function AuthModalContext({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    backUrl: string | null;
  }>(defaultState);
  const pathname = usePathname();
  const router = useRouter();

  function closeModal() {
    router.push(state.backUrl ?? "/", {
      scroll: false,
    });
  }

  useEffect(() => {
    if (!AUTH_PATHS.includes(pathname)) {
      setState((prevState) => ({
        ...prevState,
        backUrl: pathname,
      }));
    }
  }, [pathname]);

  //   @ts-ignore
  return <Context.Provider value={{ state, setState, closeModal }}>{children}</Context.Provider>;
}

export default AuthModalContext;
