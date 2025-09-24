import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section
      className="fixed inset-0 flex flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
     
      <div className="absolute inset-0 bg-black/50"></div>

      
      <div className="relative z-10 px-6">
        <motion.p
          className="text-lg md:text-2xl font-semibold max-w-2xl mb-12 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to LeadsLoom
        </motion.p>

        <motion.p
          className="text-4xl w-1/2  mx-auto md:text-6xl mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Invest Today in Your Tomorrow
        </motion.p>
        <motion.p
          className="text-lg md:text-2xl font-regular max-w-2xl mb-12 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          AI-Powered Real Estate Leads. Target. Verify. Close.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/collect-leads"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-400 hover:text-black transition"
          >
            Collect Leads
          </Link>
        </motion.div>
      </div>
    </section>
  );
}