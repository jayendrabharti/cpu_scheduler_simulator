"use client";
import { useState, useEffect } from "react";
import { CirclePlus, LoaderCircle, Play, RotateCcw, Save, Trash2Icon } from "lucide-react";
import { GetProcessTableById, UpdateProcessTableById } from "./actions";
import { useParams, useRouter} from "next/navigation";

export default function ProcessTablesPage() {
    const { processTableId } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name,setName] = useState(" ");
    const [processes, setProcesses] = useState([]);
    const [algorithm, setAlgorithm] = useState("fcfs");
    const [timeQuantum, setTimeQuantum] = useState(2);
    
    useEffect(() => {
        const fetchData = async () => {
            try {                
              const data = await fetch(`/api/processtables/${processTableId}`).then((res) => res.json());
                
                setName(data.name);
                setAlgorithm(data.algorithm);
                setTimeQuantum(data.timeQuantum);
                setProcesses(data.processes);

            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProcessChange = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = value;
        setProcesses(updatedProcesses);
    };
    const generateRandomColor = () => {
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue}, 70%, 80%)`;
    };
    const addNewProcess = () => {

        let maxPriority = 0;
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].priority > maxPriority) {
                maxPriority = processes[i].priority;
            }
        }

        const newProcess = {
            id: processes.length + 1,
            name: `P${processes.length + 1}`,
            arrivalTime: 0,
            burstTime: 1,
            priority: maxPriority + 1,
            color: generateRandomColor()
        };
        setProcesses([...processes, newProcess]);
    };
    const save = async()=>{
        try {                
            let updatedProcessTable = {
                processes,
                algorithm,
                timeQuantum,
                name
            }
            const data = JSON.parse(await UpdateProcessTableById(processTableId,updatedProcessTable));

        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };
    const simulate = async() => {
        if (processes.length === 0) {
            alert("Please add processes to simulate");
            return;
        };
        await save();
        router.push(`/processTables/${processTableId}/simulation`);
    };

    if(isLoading)return(<div className="w-full h-full flex flex-row justify-center items-center"><LoaderCircle className="animate-spin size10"/></div>)

    if(error)return(<div className="w-full h-full flex flex-row justify-center items-center text-red-600">{error}</div>)

        

return (
<div className="h-full w-full max-h-full grid grid-rows-[auto_1fr_auto]">

        <div className="border-b border-gray-700 p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-black">
          <h1 className="text-3xl font-bold text-white underline">{name}</h1>

          <div className={`flex items-center gap-2 transition-all duration-200 ${algorithm !== "rr" ? "opacity-0" : "opacity-100"}`}>
            <label className="text-sm text-gray-300">Time Quantum:</label>
            <input
              type="number"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(e.target.value)}
              disabled={algorithm !== "rr"}
              min={1}
              className="w-20 px-2 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300 font-medium">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fcfs">First Come First Serve</option>
              <option value="sjf">Shortest Job First</option>
              <option value="srtf">Shortest Remaining Time First</option>
              <option value="npp">Priority (Non Preemptive)</option>
              <option value="pp">Priority (Preemptive)</option>
              <option value="rr">Round Robin</option>
            </select>
          </div>
        </div>


        <div className="relative overflow-hidden">
          {/* This div enables scrolling while keeping the header fixed */}
          <div className="absolute inset-0 overflow-y-auto">
            <table className="w-full table-fixed border-collapse">
              <thead className="sticky top-0 bg-[#111] z-10">
                <tr className="border-b border-[#333]">
                  <th className="p-2 pl-4 text-left">Process Name</th>
                  <th className="p-2 text-left">Arrival Time</th>
                  <th className="p-2 text-left">Burst Time</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process, index) => (
                  <tr className="border-b border-[#333]" key={index}>
                    <td className="p-2 pl-6 flex items-center space-x-2">
                      <span className={`p-2 rounded-full`} style={{ backgroundColor: process.color }}></span> 
                      <input
                        type="text"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full bg-transparent"
                        value={process.name}
                        onChange={(e) => handleProcessChange(index, "name", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full bg-transparent"
                        value={process.arrivalTime}
                        onChange={(e) => handleProcessChange(index, "arrivalTime", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full bg-transparent"
                        value={process.burstTime}
                        onChange={(e) => handleProcessChange(index, "burstTime", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full bg-transparent"
                        value={process.priority}
                        onChange={(e) => handleProcessChange(index, "priority", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <Trash2Icon 
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          const updatedProcesses = processes.filter((_, i) => i !== index);
                          setProcesses(updatedProcesses);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {processes.length === 0 && (
              <p className="w-full text-center text-[#666] text-xl py-8">No processes yet</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-row space-x-4 p-6 bg-[#111] border-t border-[#333]">
          <button 
            className="flex flex-row bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 active:scale-90"
            onClick={addNewProcess}
          >
            <CirclePlus className="mr-2"/> Process
          </button>

        <button 
            className="flex flex-row bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-950 ml-auto transition-all duration-200 active:scale-90"
            onClick={save}
        >
            <Save className="mr-2"/>Save
        </button>

        <button 
            className="flex flex-row bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-200 active:scale-90"
            onClick={() => setProcesses([])}
        >
            <RotateCcw className="mr-2"/>Reset
        </button>
          
          <button 
            className="flex flex-row bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-200 active:scale-90"
            onClick={simulate}
          >
            <Play className="mr-2"/>Run Simulation
          </button>
        </div>
</div>
);
}