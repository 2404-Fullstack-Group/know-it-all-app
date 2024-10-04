-- DropForeignKey
ALTER TABLE "Q_junction" DROP CONSTRAINT "Q_junction_quiz_id_fkey";

-- AddForeignKey
ALTER TABLE "Q_junction" ADD CONSTRAINT "Q_junction_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
