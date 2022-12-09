import { MigrationInterface, QueryRunner } from "typeorm";

export class twitter1670623571867 implements MigrationInterface {
    name = 'twitter1670623571867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtags_twitter" ("id" SERIAL NOT NULL, "hashtag" character varying NOT NULL, CONSTRAINT "PK_b03a422f70a7d830a8288df6734" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_twitter" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_86bd00e8c387fd97d120456d4f7" UNIQUE ("email"), CONSTRAINT "PK_0477a329bc3905c4a25fc709149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets_twitter" ("id" SERIAL NOT NULL, "tweet" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0f3611702d829c5d52cda759d63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets_hashtags" ("tweetsTwitterId" integer NOT NULL, "hashtagsTwitterId" integer NOT NULL, CONSTRAINT "PK_0b5184716c919854150b01553da" PRIMARY KEY ("tweetsTwitterId", "hashtagsTwitterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fc32631162c04b8492429a339" ON "tweets_hashtags" ("tweetsTwitterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9829d08c5ca887ec92510c4f21" ON "tweets_hashtags" ("hashtagsTwitterId") `);
        await queryRunner.query(`ALTER TABLE "tweets_twitter" ADD CONSTRAINT "FK_fbfb95e4f78c905386e44b4f267" FOREIGN KEY ("user_id") REFERENCES "users_twitter"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" ADD CONSTRAINT "FK_4fc32631162c04b8492429a339f" FOREIGN KEY ("tweetsTwitterId") REFERENCES "tweets_twitter"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" ADD CONSTRAINT "FK_9829d08c5ca887ec92510c4f215" FOREIGN KEY ("hashtagsTwitterId") REFERENCES "hashtags_twitter"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" DROP CONSTRAINT "FK_9829d08c5ca887ec92510c4f215"`);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" DROP CONSTRAINT "FK_4fc32631162c04b8492429a339f"`);
        await queryRunner.query(`ALTER TABLE "tweets_twitter" DROP CONSTRAINT "FK_fbfb95e4f78c905386e44b4f267"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9829d08c5ca887ec92510c4f21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fc32631162c04b8492429a339"`);
        await queryRunner.query(`DROP TABLE "tweets_hashtags"`);
        await queryRunner.query(`DROP TABLE "tweets_twitter"`);
        await queryRunner.query(`DROP TABLE "users_twitter"`);
        await queryRunner.query(`DROP TABLE "hashtags_twitter"`);
    }

}
