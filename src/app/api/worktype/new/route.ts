import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, WorkTypeCategoriesKey } from "@prisma/client";

const prisma = new PrismaClient();

const validCategories = Object.values(WorkTypeCategoriesKey);

type WorkTypeRequestBody = {
    name?: string;
    category?: WorkTypeCategoriesKey;
};

export async function POST(request: NextRequest) {
    try {
        const body: WorkTypeRequestBody = await request.json();
        const { name, category } = body;

        if (!name || typeof name !== "string" || name.trim() === "") {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        if (!category || !validCategories.includes(category)) {
            return NextResponse.json(
                {
                    error: `Invalid or missing category. Valid categories are: ${validCategories.join(", ")}`,
                },
                { status: 400 }
            );
        }

        const workType = await prisma.workType.create({
            data: {
                name: name.trim(),
                category,
            },
        });

        return NextResponse.json(workType, { status: 201 });
    } catch (error) {
        console.error("Error creating WorkType:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}