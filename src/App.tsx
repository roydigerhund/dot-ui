import { motion } from "framer-motion";

function App() {
  return (
    <div className="flex flex-col justify-center items-center p-8 gap-12">
      <h1 className="text-4xl tracking-wider font-bold">Dot UI</h1>
      <motion.div
        className="w-16 h-16 bg-blue-500 rounded-2xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "anticipate" }}
      />
    </div>
  );
}

export default App;
