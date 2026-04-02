import { NextResponse } from 'next/server';
import { db } from '../../../core/infrastructure/db/client/index';
import { campuses } from '../../../core/infrastructure/db/schema/campuses';

export async function GET() {
  try {
    const allCampuses = await db.select().from(campuses);
    return NextResponse.json({
      success: true,
      data: allCampuses,
      count: allCampuses.length,
    });
  } catch (error) {
    console.error('Error fetching campuses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campuses' },
      { status: 500 }
    );
  }
}