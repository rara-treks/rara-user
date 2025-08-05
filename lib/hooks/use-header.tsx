import { usePathname } from "next/navigation";
import { useAuthModal } from "../context/auth-modal-context";

const TRANSPARENT_PATHS = new Set(["/"]);

function useHeader() {
  const pathname = usePathname();
  const authModal = useAuthModal();
  const isTransparent = TRANSPARENT_PATHS.has(pathname) || TRANSPARENT_PATHS.has(authModal.state.backUrl!);

  return {
    isTransparent,
  };
}

export default useHeader;
