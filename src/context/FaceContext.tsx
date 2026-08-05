import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { loadModels, modelsLoaded } from "../feature/security/face/core/loader";

interface FaceContextType {
  isModelsLoaded: boolean;
  isLoadingModels: boolean;
  loadFaceModels: () => Promise<void>;
}

const FaceContext = createContext<FaceContextType>({
  isModelsLoaded: false,
  isLoadingModels: false,
  loadFaceModels: async () => {},
});

export function FaceProvider({ children }: { children: ReactNode }) {
  // Lazy initialization
  const [isModelsLoaded, setModelsLoaded] = useState(() => modelsLoaded());

  const [isLoadingModels, setLoadingModels] = useState(false);

  // Prevent duplicate loads (StrictMode / multiple calls)
  const loadingRef = useRef(false);

  const loadFaceModels = useCallback(async () => {
    console.log("Loading face models...");

    // Already loaded
    if (modelsLoaded()) {
      console.log("Models already loaded.");

      // Only update state if needed
      setModelsLoaded((prev) => (prev ? prev : true));
      return;
    }

    // Already loading
    if (loadingRef.current) {
      console.log("Models are already loading...");
      return;
    }

    loadingRef.current = true;

    try {
      setLoadingModels(true);

      console.log("Before loadModels");

      await loadModels();

      console.log("After loadModels");

      console.log("Models loaded successfully.");

      setModelsLoaded(true);
    } catch (err) {
      console.error("Failed to load face models:", err);
    } finally {
      loadingRef.current = false;
      setLoadingModels(false);
    }
  }, []);

  useEffect(() => {
    console.log("FaceProvider Mounted");

    // Delay to next microtask (avoids React 19 warning)
    queueMicrotask(() => {
      loadFaceModels();
    });

    return () => {
      console.log("FaceProvider Unmounted");
    };
  }, [loadFaceModels]);

  useEffect(() => {
    console.log("isModelsLoaded:", isModelsLoaded);
  }, [isModelsLoaded]);

  return (
    <FaceContext.Provider
      value={{
        isModelsLoaded,
        isLoadingModels,
        loadFaceModels,
      }}
    >
      {children}
    </FaceContext.Provider>
  );
}

export const useFace = () => useContext(FaceContext);
