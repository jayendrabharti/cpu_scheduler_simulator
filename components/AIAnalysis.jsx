import { AnalyzeProcesses } from "@/actions/AIAnalysic";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import { BrainCircuit, LoaderCircle } from "lucide-react";

export default function AIAnalysis({ processes }) {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");

    useEffect(() => {
        const analyze = async () => {
            const data = JSON.parse(await AnalyzeProcesses(processes));
            console.log(data);
            setText(data);
            setIsLoading(false);
        };
        analyze();
    }, []);

    return (
        <div className="p-4">
            <span className="flex flex-row items-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-30% from-blue-500 to-pink-500 w-max">
                <BrainCircuit className="text-blue-500 size-12 mr-2"/>
                AI Analysis
            </span>
            <div className="flex flex-col justify-center items-center text-lg p-4 rounded-2xl bg-zinc-800 mt-4 text-zinc-300">
                
                {isLoading 
                ? 
                    <LoaderCircle className="mx-auto size-16 m-4 animate-spin"/>
                :
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Markdown>{text}</Markdown>
                    </motion.div>
                }
            </div>
        </div>
    );
}