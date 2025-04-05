"use client";

import { CirclePlus, LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProcessTablesList from '@/components/ProcessTablesList';
import { useRouter } from 'next/navigation';

export default function ProcessTables(){
    const [processTables, setProcessTables] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/processtables');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProcessTables(data.reverse());
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
        
    const deleteTable = async (_id) => {

        if(!confirm('Are you sure you want to delete this table?'))return;

        try {
            const response = await fetch('/api/processtables', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: _id })
            });

            if (!response.ok) {
            throw new Error('Failed to delete the table');
            }

            setProcessTables((prevTables) => prevTables.filter((table) => table._id !== _id));
        } catch (err) {
            alert(`Error deleting table: ${err.message}`);
        }
    }
    const editTable = (_id) => {
        router.push(`/processTables/${_id}`);
    }
    const simulateTable = (_id) => {
        router.push(`/processTables/${_id}/simulation`);
    }
    
    return (
        

            <div
                className='w-full h-full flex items-center justify-center overflow-y-scroll'
            >
                {isLoading && <LoaderCircle className='text-white size-12 animate-spin'/>}
                {error && <span className='text-white'>Error occured while fetching Process Tables</span>}
                {processTables && 
                    <ProcessTablesList 
                        data={processTables} 
                        deleteTable={deleteTable}
                        editTable={editTable}
                        simulateTable={simulateTable}
                    />
                }
            </div>

    )
}