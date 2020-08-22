import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateProductStatus1598128332587
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE products_status AS ENUM('active', 'inactive', 'deleted')`,
    );
    await queryRunner.query(
      `ALTER TABLE products ADD status products_status DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE products DROP COLUMN status`);
    await queryRunner.query(`DROP TYPE products_status`);
  }
}
