// app/api/user/route.ts

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {

    const session = await getServerSession();


  return NextResponse.json({ id: 2, name: "Marko Krastev", session });
}