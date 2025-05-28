import prisma from "@/lib/prisma";
import getUser from "@/utilities/user";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const user = await getUser();
    if (user && user.role == 'admin') {
        const workTypes = await prisma.workType.findMany({ orderBy: { name: 'asc' } })
        return Response.json(workTypes, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return Response.json('User not authorized', {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}