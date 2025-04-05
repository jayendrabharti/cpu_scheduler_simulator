"use server";

import ProcessTables from "@/models/processTables";

export async function GetProcessTableById(id) {
    try {
        const data = await ProcessTables.findById(id);
        console.log("Data: ", data);
        return JSON.stringify(data);
    } catch (error) {
        return error;
    }
}

export async function UpdateProcessTableById(id,processTable) {
    try {
        const data = await ProcessTables.findOneAndUpdate(
            { _id: id }, 
            processTable, 
            { new: true }
        );
        console.log("Data: ", data);
        return JSON.stringify(data);
    } catch (error) {
        return error;
    }
}