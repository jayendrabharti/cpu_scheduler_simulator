"use client";
import { useParams, useRouter} from "next/navigation";
import { useState, useEffect} from "react";
import { GetProcessTableById } from "../actions";
import compute from "@/utils/compute";
import { LoaderCircle, Circle, Pencil } from "lucide-react";
import GanttChart from "@/components/GanttChart";

export default function Simulation(){

    const { processTableId } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name,setName] = useState(" ");
    const [processes, setProcesses] = useState([]);
    const [algorithm, setAlgorithm] = useState("fcfs");
    const [timeQuantum, setTimeQuantum] = useState(2);
    const [result,setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {                
                console.log("ProcessTableId: ", processTableId);
                const data = JSON.parse(await GetProcessTableById(processTableId));
                console.log(data);
                setName(data.name);
                setAlgorithm(data.algorithm);
                setTimeQuantum(data.timeQuantum);
                setProcesses(data.processes);
                const r = compute(data.processes,data.algorithm,data.timeQuantum)
                setResult(r);    

            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        
    }, []);

    if(isLoading)return(<div className="w-full h-full flex flex-row justify-center items-center"><LoaderCircle className="animate-spin size10"/></div>)

    if(error)return(<div className="w-full h-full flex flex-row justify-center items-center text-red-600">{error}</div>)
    

return(
<div
    className="w-full h-full"
>   
    <div
        className="border-b border-gray-600 p-4 flex flex-row items-center"
    >
        <span className="text-3xl font-bold underline">{name}</span>
        <button
            className="p-2 bg-blue-500 hover:bg-blue-900 rounded transition-all duration-200 active:scale-90 flex flex-row items-center ml-auto"
            onClick={()=>router.push(`/processTables/${processTableId}`)}
        ><Pencil className="mr-2"/> Update Process Table</button>
    </div>

    <div className="p-2">
        <GanttChart ganttData={result.ganttData}/>
    </div>

    <div className="flex flex-col p-3 border border-gray-600 m-4 rounded">
        <h2 className="text-2xl font-bold mb-2">Performance Metrics</h2>
        <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{result.avgWaitingTime.toFixed(2)}</span>
                <span className="font-medium text-xs">Average Waiting Time</span>
            </div>
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{result.avgTurnAroundTime.toFixed(2)}</span>
                <span className="font-medium text-xs">Average Turnaround Time</span>
            </div>
            {algorithm === "rr" && (
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{timeQuantum}</span>
                <span className="font-medium text-xs">Time Quantum</span>
            </div>
            )}
        </div>
    </div>

    <div className="m-4">
    <table className="min-w-full border-collapse">
        <thead>
            <tr  className="border-b border-gray-600 bg-[#111] text-left">
                <th className="py-2 px-4">Process Name</th>
                <th className="py-2 px-4">Arrival Time</th>
                <th className="py-2 px-4">Burst Time</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Exit Time</th>
                <th className="py-2 px-4">Turn Around Time</th>
                <th className="py-2 px-4">Waiting Time</th>
            </tr>
        </thead>
        <tbody id="table-body">
        {result.ganttData.filter(i=>!i.idle).map((process, index) => (

            <tr 
                className="border-b border-gray-600" 
                key={index}
            >
                <td className="py-2 px-4">
                    <Circle className="inline mr-2" style={{fill: process.color,stroke: process.color}}/>
                    {process.name}
                </td>
                <td className="py-2 px-4">{process.arrivalTime}</td>
                <td className="py-2 px-4">{process.burstTime}</td>
                <td className="py-2 px-4">{process.priority}</td>
                <td className="py-2 px-4">{process.exitTime}</td>
                <td className="py-2 px-4">{process.turnAroundTime}</td>
                <td className="py-2 px-4">{process.waitingTime}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>



</div>
)

}