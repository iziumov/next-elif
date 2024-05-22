import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, fullName, dateofbirth, wheredidyourhear, eventId } = await req.json();

    if (!email) {
      return new NextResponse('Cant be empty', { status: 400 });
    }

    if (!fullName) {
      return new NextResponse('Full Name required', { status: 400 });
    }

    if (!wheredidyourhear) {
      return new NextResponse('Wheredidyourhear required', { status: 400 });
    }

    if (!eventId) {
      return new NextResponse('EventId required', { status: 400 });
    }

    if (!dateofbirth) {
      return new NextResponse('Dateofbirth required', { status: 400 });
    }

    const participant = await prisma.participant.create({
      data: {
        fullName,
        email,
        dateofbirth,
        event: {
          connect: { id: eventId },
        },
        wheredidyourhear,
      },
    });

    return NextResponse.json(participant, { status: 200 });
  } catch (error) {
    console.log('[POST Particapant]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
