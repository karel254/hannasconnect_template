import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Just return a mock success response
  return NextResponse.json({ success: true });
} 