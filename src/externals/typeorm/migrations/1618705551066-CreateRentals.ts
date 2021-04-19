import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1618697161291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "pick_up_date",
            type: "timestamp",
          },
          {
            name: "expected_drop_off_date",
            type: "timestamp",
          },
          {
            name: "drop_off_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "contracted_daily_rate",
            type: "numeric",
          },
          {
            name: "contracted_fine_amount",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_rent_car",
            columnNames: ["car_id"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
          },
          {
            name: "fk_rent_user",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}
