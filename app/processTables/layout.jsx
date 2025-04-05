"use client";
import { useRouter } from "next/navigation";
import { CirclePlus } from "lucide-react";

export default function ProcessTablesLayout({ children }) {

    const router = useRouter();
    const createNewTable = async () => {

        try {
            const response = await fetch('/api/processtables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            });

            if (!response.ok) {
            throw new Error('Failed to create new table');
            }

            const createdTable = await response.json();
            router.push(`/processTables/${createdTable._id}`);

        } catch (err) {
            console.error('Error creating new table:', err);
            setError(err);
        }
    }

    return (
        <div className="grid grid-rows-[auto_auto_1fr] items-center w-full h-screen max-h-screen overflow-hidden">
            <div className="flex flex-col items-center justify-center w-full p-4 bg-[#111] border-b border-gray-600 shadow-md">
                <h1 className="text-3xl font-bold">Processes Tables</h1>
                <p className="text-sm text-gray-400">A CPU Scheduling Algorithm Simulator</p>
            </div>

            <div className="flex flex-col items-center w-full py-2 px-4 bg-[#111] border-b border-gray-600 shadow-md">
                <button
                    className='ml-auto flex flex-row bg-blue-600 rounded p-2 hover:bg-blue-700 transition-all duration-200 ease-in-out active:scale-90'
                    onClick={()=> createNewTable()}
                >
                <CirclePlus
                    className='mr-2 size-6'
                /> New Table</button>
            </div>
            {children}
        </div>

    );
}