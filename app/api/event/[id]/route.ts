import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });

    if (!event) {
      return new NextResponse('Event not found', { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.log('[GET Event by ID]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
