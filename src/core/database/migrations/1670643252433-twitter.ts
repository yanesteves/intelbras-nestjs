import { MigrationInterface, QueryRunner } from "typeorm";

export class twitter1670643252433 implements MigrationInterface {
    name = 'twitter1670643252433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_twitter" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "bio" character varying(300), "name" character varying(100) NOT NULL, "privateAccount" boolean NOT NULL DEFAULT false, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_86bd00e8c387fd97d120456d4f7" UNIQUE ("email"), CONSTRAINT "PK_0477a329bc3905c4a25fc709149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets_twitter" ("id" SERIAL NOT NULL, "tweet" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0f3611702d829c5d52cda759d63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "followingId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweets_twitter" ADD CONSTRAINT "FK_fbfb95e4f78c905386e44b4f267" FOREIGN KEY ("user_id") REFERENCES "users_twitter"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets_twitter" DROP CONSTRAINT "FK_fbfb95e4f78c905386e44b4f267"`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`DROP TABLE "tweets_twitter"`);
        await queryRunner.query(`DROP TABLE "users_twitter"`);
    }

}
