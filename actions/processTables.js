"use server";

import ProcessTables from "@/models/processTables";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GetProcessTableById(id) {
    try {
        
        await connectToDB();
        
        const data = await ProcessTables.findById(id);
        console.log("Data: ", data);
        return JSON.stringify(data);
    } catch (error) {
        return error;
    }
}

export async function UpdateProcessTableById(id,processTable) {
    try {

        await connectToDB();
        
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