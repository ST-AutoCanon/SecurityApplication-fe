export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(length = 16): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return id;
}

export function timestamp(): number {
  return Date.now();
}

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay = 100
): (...args: Parameters<T>) => void {
  let waiting = false;

  return (...args: Parameters<T>) => {
    if (waiting) return;

    callback(...args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isMobile(): boolean {
  if (!isBrowser()) return false;

  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
}

export function assert(
  condition: boolean,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(
  start: number,
  end: number,
  alpha: number
): number {
  return start + (end - start) * alpha;
}

export function round(
  value: number,
  precision = 2
): number {
  const factor = Math.pow(10, precision);

  return Math.round(value * factor) / factor;
}

export function deepClone<T>(value: T): T {
  return structuredClone(value);
}

export function downloadBlob(
  blob: Blob,
  filename: string
): void {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);
}