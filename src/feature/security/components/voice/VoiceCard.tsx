import React from "react";
import { motion } from "framer-motion";

interface VoiceCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const VoiceCard: React.FC<VoiceCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden ${className}`}
    >
      {(title || subtitle || icon) && (
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            {icon && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shrink-0">
                {icon}
              </div>
            )}

            <div className="min-w-0">
              {title && (
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">
                  {title}
                </h2>
              )}

              {subtitle && (
                <p className="text-sm sm:text-base text-gray-500 mt-1 break-words">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6 md:p-8">{children}</div>
    </motion.div>
  );
};

export default VoiceCard;
