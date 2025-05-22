import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Journal from '@/models/Journal';
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    await dbConnect();
    const { userId } = await auth(); // Get the current user's Clerk userId

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch only journals for this user
    const journals = await Journal.find({ userId }).sort({ date: -1 });
// console.log(userId);

    return NextResponse.json(journals);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    console.log('Creating a new journal entry...');
    // const { userId } = auth();
    // console.log(userId);
    
    // if (!userId) {
    //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // }

    const body = await request.json();
    // In a real app, we would get userId from auth
    const journal = await Journal.create({
      ...body,
      // userId: userId, 
    });
    
    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}