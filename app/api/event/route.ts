import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log('[GET ERROR]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, date, organizer } = await req.json();
    if (!title) {
      return new NextResponse('Title required', { status: 400 });
    }

    if (!description) {
      return new NextResponse('Description required', { status: 400 });
    }

    if (!date) {
      return new NextResponse('Date required', { status: 400 });
    }

    if (!organizer) {
      return new NextResponse('Organizer required', { status: 400 });
    }

    const [day, month, year] = date.split('-');
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: isoDate,
        organizer,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.log('[POST Event]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
