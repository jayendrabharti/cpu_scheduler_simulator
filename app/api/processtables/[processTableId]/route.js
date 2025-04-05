import ProcessTables from "@/models/processTables";
import { connectToDB } from "@/utils/database";

export async function GET(req, { params }) {
    try {
        const { processTableId } = await params;

        if (!processTableId) {
            return new Response('ProcessTableId is required', { status: 400 });
        }

        await connectToDB();

        const data = await ProcessTables.findById(processTableId);
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Failed to fetch data', { status: 500 });
    }
}
