import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTypeStatus1598185162511
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE status_type AS ENUM('active', 'inactive', 'deleted')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE status_type`);
  }
}
