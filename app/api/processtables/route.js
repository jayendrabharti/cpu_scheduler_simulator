import ProcessTables from "@/models/processTables";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectToDB } from "@/utils/database";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return new Response('Unauthorized', { status: 401 });
        };

        await connectToDB();
        
        const data = await ProcessTables.find({userID: session.user.id});
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Failed to fetch data', { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        await connectToDB();

        const data = await ProcessTables.find({userID: session.user.id});

        const newTable = await ProcessTables.create({
            name: `Process Table ${data.length + 1}`,
            processes: [],
            algorithm: "fcfs",
            timeQuantum : 2,
            userID: session.user.id
        });

        return new Response(JSON.stringify(newTable), { status: 201 });

    } catch (error) {
        console.error('Error creating table:', error);
        return new Response('Failed to create table', { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { id } = await req.json();

        await connectToDB();

        const deletedTable = await ProcessTables.findOneAndDelete({
            _id: id,
            userID: session.user.id
        });

        if (!deletedTable) {
            return new Response('Table not found or unauthorized', { status: 404 });
        }

        return new Response('Table deleted successfully', { status: 200 });

    } catch (error) {
        console.error('Error deleting table:', error);
        return new Response('Failed to delete table', { status: 500 });
    }
}

export async function UPDATE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { id, name, processes, algorithm, timeQuantum } = await req.json();

        await connectToDB();

        const updatedTable = await ProcessTables.findOneAndUpdate(
            { _id: id, userID: session.user.id },
            { name, processes, algorithm, timeQuantum },
            { new: true }
        );

        if (!updatedTable) {
            return new Response('Table not found or unauthorized', { status: 404 });
        }

        return new Response(JSON.stringify(updatedTable), { status: 200 });

    } catch (error) {
        console.error('Error updating table:', error);
        return new Response('Failed to update table', { status: 500 });
    }
}
