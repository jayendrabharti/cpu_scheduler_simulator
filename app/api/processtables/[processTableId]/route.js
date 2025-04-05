import ProcessTables from "@/models/processTables";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/authOptions";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('processTableId');

        const data = await ProcessTables.findById(id);
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Failed to fetch data', { status: 500 });
    }
}