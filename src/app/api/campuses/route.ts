import { NextResponse } from 'next/server';
import { db } from '../../../core/infrastructure/db/client/index';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';

export async function GET() {
  try {
    const data = await db.select().from(campuses);
    return NextResponse.json({ success: true, data, count: data.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
