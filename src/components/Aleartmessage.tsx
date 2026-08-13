// import { useEffect } from "react";
// import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

// export default function Alert({ type, message, onClose }) {
//   // Auto close warning after 3 seconds
//   useEffect(() => {
//     if (type === "warning") {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [type, onClose]);

//   // Close alert when Enter or Escape is pressed
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Enter" || event.key === "Escape") {
//         event.preventDefault();
//         onClose();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onClose]);

//   const styles =
//     type === "success"
//       ? {
//           border: "border-emerald-500",
//           icon: "text-emerald-500",
//           button: "bg-emerald-500 hover:bg-emerald-600",
//           title: "Success",
//           Icon: CheckCircle,
//         }
//       : type === "warning"
//         ? {
//             border: "border-yellow-500",
//             icon: "text-yellow-500",
//             button: "bg-yellow-500 hover:bg-yellow-600",
//             title: "Warning",
//             Icon: AlertTriangle,
//           }
//         : {
//             border: "border-rose-500",
//             icon: "text-rose-500",
//             button: "bg-rose-500 hover:bg-rose-600",
//             title: "Error",
//             Icon: XCircle,
//           };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//       <div
//         className={`w-[380px] overflow-hidden rounded-xl bg-white shadow-2xl border-l-4 ${styles.border}`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between bg-[#020b3d] px-5 py-4 text-white">
//           <div className="flex items-center gap-3">
//             <styles.Icon className={styles.icon} size={24} />
//             <h2 className="text-lg font-semibold">{styles.title}</h2>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded p-1 transition hover:bg-white/10"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-5 py-6">
//           <p className="text-sm leading-6 text-gray-600">{message}</p>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 border-t bg-gray-50 px-5 py-4">
//           <button
//             onClick={onClose}
//             className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition ${styles.button}`}
//           >
//             OK
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

interface AlertProps {
  type: "success" | "warning" | "error";
  message: string;
  onClose: () => void;

  // Optional confirmation mode
  confirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Alert({
  type,
  message,
  onClose,
  confirm = false,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
}: AlertProps) {
  // EXISTING BEHAVIOR - unchanged
  useEffect(() => {
    if (type === "warning" && !confirm) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [type, confirm, onClose]);

  // EXISTING BEHAVIOR - unchanged for normal alerts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();

        // In confirmation mode, Escape = No.
        // Enter does nothing so we don't accidentally confirm.
        if (confirm) {
          if (event.key === "Escape") {
            onClose();
          }
          return;
        }

        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, confirm]);

  const styles =
    type === "success"
      ? {
          border: "border-emerald-500",
          icon: "text-emerald-500",
          button: "bg-emerald-500 hover:bg-emerald-600",
          title: "Success",
          Icon: CheckCircle,
        }
      : type === "warning"
        ? {
            border: "border-yellow-500",
            icon: "text-yellow-500",
            button: "bg-yellow-500 hover:bg-yellow-600",
            title: "Warning",
            Icon: AlertTriangle,
          }
        : {
            border: "border-rose-500",
            icon: "text-rose-500",
            button: "bg-rose-500 hover:bg-rose-600",
            title: "Error",
            Icon: XCircle,
          };

  const Icon = styles.Icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className={`w-[380px] overflow-hidden rounded-xl bg-white shadow-2xl border-l-4 ${styles.border}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#020b3d] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <Icon className={styles.icon} size={24} />

            <h2 className="text-lg font-semibold">
              {confirm ? "Confirmation" : styles.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 transition hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6">
          <p className="text-sm leading-6 text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-gray-50 px-5 py-4">
          {confirm ? (
            <>
              {/* NO */}
              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-100
                "
              >
                {cancelText}
              </button>

              {/* YES */}
              <button
                type="button"
                onClick={onConfirm}
                className="
                  rounded-lg
                  bg-emerald-500
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-emerald-600
                "
              >
                {confirmText}
              </button>
            </>
          ) : (
            // EXISTING NORMAL ALERT BUTTON
            <button
              type="button"
              onClick={onClose}
              className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition ${styles.button}`}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}