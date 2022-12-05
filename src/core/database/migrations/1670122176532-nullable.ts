import { MigrationInterface, QueryRunner } from "typeorm";

export class nullable1670122176532 implements MigrationInterface {
    name = 'nullable1670122176532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmationToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "recoverToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmationToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "recoverToken" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "recoverToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmationToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "recoverToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmationToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(20) NOT NULL`);
    }

}
