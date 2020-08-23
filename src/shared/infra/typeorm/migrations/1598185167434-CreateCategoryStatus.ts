import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateCategoryStatus1598185167434
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE categories ADD status status_type DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE categories DROP COLUMN status`);
  }
}
