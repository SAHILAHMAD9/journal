import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Journal from '@/models/Journal';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your environment variables');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// GET handler
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const journal = await Journal.findById(params.id);

    if (!journal) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    // In a real app, we would check if the journal belongs to the current user

    return NextResponse.json(journal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT handler
export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();

    const journal = await Journal.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!journal) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    // In a real app, we would check if the journal belongs to the current user

    return NextResponse.json(journal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const journal = await Journal.findByIdAndDelete(params.id);

    if (!journal) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    // In a real app, we would check if the journal belongs to the current user

    return NextResponse.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}