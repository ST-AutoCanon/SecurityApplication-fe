import { useCallback, useEffect, useRef, useState } from "react";

import { webcamManager } from "../camera/webcam";
import { loadModels, disposeModels } from "../core/loader";

import { enrollmentPipeline } from "../enrollment/pipeline";
import { accessPipeline } from "../access/pipeline";



import type { EnrollmentData } from "../enrollment/enrollment";
import type { AttendanceResult } from "../access/pipeline";
import type { FaceTemplate } from "../types/face";

export interface UseFaceState {
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

export function useFace() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [state, setState] = useState<UseFaceState>({
    loading: false,
    initialized: false,
    error: null,
  });

  const initialize = useCallback(async () => {
    try {
      setState((s) => ({
        ...s,
        loading: true,
        error: null,
      }));

      await loadModels();

      setState((s) => ({
        ...s,
        initialized: true,
        loading: false,
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Initialization failed.",
      }));
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) {
      throw new Error("Video element is not available.");
    }

    await webcamManager.start(videoRef.current);
  }, []);

  const stopCamera = useCallback(() => {
    webcamManager.stop();
  }, []);

  const enroll = useCallback(
    async (
      id: string
    ): Promise<EnrollmentData> => {
      if (!videoRef.current) {
        throw new Error("Video element is not available.");
      }

      return enrollmentPipeline.enrollFromCamera(
        id,
        videoRef.current
      );
    },
    []
  );

  const verify = useCallback(
    async (
      template: FaceTemplate
    ): Promise<AttendanceResult> => {
      if (!videoRef.current) {
        throw new Error("Video element is not available.");
      }

      return accessPipeline.verify(
        videoRef.current,
        template
      );
    },
    []
  );

  const identify = useCallback(
    async (
      templates: FaceTemplate[]
    ): Promise<AttendanceResult> => {
      if (!videoRef.current) {
        throw new Error("Video element is not available.");
      }

      return accessPipeline.identify(
        videoRef.current,
        templates
      );
    },
    []
  );

  // useEffect(() => {
  //   initialize();

  //   return () => {
  //     stopCamera();
  //     disposeModels();
  //   };
  // }, [initialize, stopCamera]);

  useEffect(() => {

  let mounted = true;


  initialize()
    .then(() => {

      if (!mounted) return;

      setState((s)=>({
        ...s,
        initialized:true
      }));

    });


  return () => {

    mounted = false;

    stopCamera();

    // Do not dispose during React StrictMode remount
    // disposeModels();

  };


}, [initialize, stopCamera]);
  return {
    videoRef,

    loading: state.loading,
    initialized: state.initialized,
    error: state.error,

    initialize,

    startCamera,
    stopCamera,

    enroll,
    verify,
    identify,
  };
}

export default useFace;