import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-slate-100 px-6">
      <div className="text-center max-w-xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          🚧 Under Development
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 mt-6"
        >
          Coming Soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-slate-600 text-lg"
        >
          We’re building something powerful for this section. Stay tuned for
          updates.
        </motion.p>

        {/* Animated dots */}
        <div className="flex justify-center mt-8 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-blue-600 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Go Back Home
        </motion.button>
      </div>
    </section>
  );
}
