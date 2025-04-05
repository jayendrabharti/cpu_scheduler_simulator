import { ChartNoAxesCombined, Pencil, Trash2 } from "lucide-react";
import algorithms from "@/data/algorithms";
import { formatTimestamp } from "@/utils/common";

export default function ProcessTablesList({ data , deleteTable, editTable, simulateTable }) {
    
    return (
        <div
            className="p-2 w-full h-full flex flex-col"
        >
        {data.map((table, index) => (
        <div
            key={index}
            className="flex flex-col justify-between items-center p-4 rounded-lg mb-4 shadow-md border border-gray-600"
        >
            <div className="flex flex-row justify-between items-center w-full mb-2">
                <span className=" font-bold underline">{table.name}</span>
                <span className="text-xs bg-black py-1 px-2 rounded-2xl border border-gray-600">{algorithms[table.algorithm]}</span>
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-2 text-xs">
                <span className="text-zinc-400">Processes :</span>
                <span>{table.processes.length}</span>
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-2 text-xs">
                <span className="text-zinc-400">Created At :</span>
                <span>{formatTimestamp(table.createdAt)}</span>
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-2 text-xs">
                <span className="text-zinc-400">Updated At :</span>
                <span>{formatTimestamp(table.updatedAt)}</span>
            </div>
            {table.algorithm === "rr" && (
            <div className="flex flex-row justify-between items-center w-full mb-2 text-xs">
                <span className="text-zinc-400">Time Quantum :</span>
                <span>{table.timeQuantum}</span>
            </div>
            )}

            <div className="flex flex-row space-x-2 items-center w-full mb-2 text-xs">
                <button
                    className="bg-red-500 text-white px-2 py-2 justify-between rounded flex items-center flex-row text-sm hover:ring-2 hover:ring-zinc-500"
                    onClick={() => deleteTable(table._id)}
                >
                    <Trash2 className="size-5 mr-1"/>
                    Delete
                </button>
                
                <button
                    className="bg-zinc-700 text-white px-2 py-2 justify-between rounded flex items-center flex-row text-sm hover:ring-2 hover:ring-zinc-500 ml-auto"
                    onClick={() => editTable(table._id)}
                >
                    <Pencil className="size-5 mr-1"/>
                    Edit
                </button>
                
                <button
                    className="bg-blue-700 text-white px-2 py-2 justify-between rounded flex items-center flex-row text-sm hover:ring-2 hover:ring-zinc-500"
                    onClick={() => {
                        table.processes.length==0 
                        ? 
                        alert("Table must have Processes to Simulate") 
                        :
                        simulateTable(table._id)
                    }}
                >
                    <ChartNoAxesCombined className="size-5 mr-1"/>
                    Simulate
                </button>
                
            </div>

        </div>
        ))}
        {data.length == 0 && 
            <span className="mx-auto text-zinc-400 mt-10">No Process Tables</span>
        }
        </div>
    );
}