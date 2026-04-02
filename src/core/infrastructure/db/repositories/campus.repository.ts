import { eq } from 'drizzle-orm';
import { db } from '../client/index';
import { campuses } from '../schema/campuses';
import { Campus, CampusProps } from '../../../domain/campus/campus.entity';
import { CampusRepositoryPort } from '../../../application/campus/campus.repository.port';

export class PgCampusRepository implements CampusRepositoryPort {

  private toDomain(row: typeof campuses.$inferSelect): Campus {
    const props: CampusProps = {
      id: row.id,
      name: row.name,
      code: row.code,
      slug: row.slug,
      city: row.city,
      country: row.country,
      emailContact: row.emailContact ?? undefined,
      phoneContact: row.phoneContact ?? undefined,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    return Campus.create(props);
  }

  async findById(id: string): Promise<Campus | null> {
    const rows = await db.select().from(campuses).where(eq(campuses.id, id));
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findByCode(code: string): Promise<Campus | null> {
    const rows = await db.select().from(campuses).where(eq(campuses.code, code));
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findBySlug(slug: string): Promise<Campus | null> {
    const rows = await db.select().from(campuses).where(eq(campuses.slug, slug));
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findAll(): Promise<Campus[]> {
    const rows = await db.select().from(campuses);
    return rows.map(row => this.toDomain(row));
  }

  async findAllActive(): Promise<Campus[]> {
    const rows = await db.select().from(campuses).where(eq(campuses.isActive, true));
    return rows.map(row => this.toDomain(row));
  }

  async save(campus: Campus): Promise<void> {
    await db.insert(campuses).values({
      id: campus.id,
      name: campus.name,
      code: campus.code,
      slug: campus.slug,
      city: campus.city,
      country: campus.country,
      emailContact: campus.emailContact,
      phoneContact: campus.phoneContact,
      isActive: campus.isActive,
      createdAt: campus.createdAt,
      updatedAt: campus.updatedAt,
    }).onConflictDoUpdate({
      target: campuses.id,
      set: {
        name: campus.name,
        isActive: campus.isActive,
        updatedAt: new Date(),
      },
    });
  }
}