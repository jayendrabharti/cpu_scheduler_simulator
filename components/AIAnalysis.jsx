import { AnalyzeProcesses } from "@/actions/AIAnalysic";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

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
            <span className="text-2xl font-bold">AI Analysis</span>
            <hr className="my-2" />
            <div className="flex flex-col justify-center items-center">
                
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
            <hr className="my-2" />
        </div>
    );
}