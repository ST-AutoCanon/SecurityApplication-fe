import * as ort from "onnxruntime-web";

import { logger } from "./logger";


export type SessionKey =
  | "detector"
  | "recognizer"
  | "landmark";


class SessionManager {

  private sessions =
    new Map<
      SessionKey,
      ort.InferenceSession
    >();


  /**
   * Register a session
   */
  set(
    key: SessionKey,
    session: ort.InferenceSession
  ): void {

    this.sessions.set(
      key,
      session
    );

    logger.info(
      `Session registered: ${key}`
    );
  }


  /**
   * Get a session
   */
  get(
    key: SessionKey
  ): ort.InferenceSession {

    const session =
      this.sessions.get(key);


    if (!session) {
      throw new Error(
        `Session "${key}" has not been initialized.`
      );
    }


    return session;
  }


  /**
   * Check if session exists
   */
  has(
    key: SessionKey
  ): boolean {

    return this.sessions.has(key);

  }


  /**
   * Remove one session
   */
  delete(
    key: SessionKey
  ): boolean {

    logger.info(
      `Removing session: ${key}`
    );


    return this.sessions.delete(key);
  }


  /**
   * Clear all sessions
   */
  clear(): void {

    logger.info(
      "Clearing all inference sessions"
    );


    this.sessions.clear();

  }


  /**
   * Get all session names
   */
  keys(): SessionKey[] {

    return [
      ...this.sessions.keys(),
    ];

  }


  /**
   * Number of loaded sessions
   */
  size(): number {

    return this.sessions.size;

  }


  /**
   * Detector session
   */
  get detector():
    ort.InferenceSession {

    return this.get(
      "detector"
    );

  }


  /**
   * Recognition session
   */
  get recognizer():
    ort.InferenceSession {

    return this.get(
      "recognizer"
    );

  }


  /**
   * Landmark session
   */
  get landmark():
    ort.InferenceSession {

    return this.get(
      "landmark"
    );

  }

}


export const sessionManager =
  new SessionManager();


export default sessionManager;