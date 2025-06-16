import { NextResponse } from 'next/server';
//import chatwithResume from '@/chat'; // assuming `chat.js` is in root
import chatwithResume from '../../../lib/chat';




export async function POST(req) {
  try {
    const { question } = await req.json();

    const answer = await chatwithResume(question);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to process chat.' }, { status: 500 });
  }
}
