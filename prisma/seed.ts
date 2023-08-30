/* eslint-disable @typescript-eslint/no-misused-promises */
import path from "path";
import fs from "fs";
import { type Lembaga, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { parse } from "csv-parse";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

interface RawCSVData {
  nim: string;
  lembaga: Lembaga;
  lembagaName: string;
}

function main() {
  /** Data for your test environment */
  const csvFilePath = path.resolve(
    __dirname,
    "_ShowcaseBooking__202308301034.csv"
  );
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: ["nim", "lembaga", "lembagaName"],
    },
    async (err, records: RawCSVData[]) => {
      if (err) console.error(err);

      const units = await Promise.all(
        records.map(async (record) => {
          return await prisma.user.create({
            data: {
              nim: record.nim,
              passwordHash: await hash(record.nim, 10),
              unitProfile: {
                create: {
                  lembaga: record.lembaga,
                  name: record.lembagaName,
                  pin: randomBytes(3).toString("hex").toUpperCase(),
                },
              },
            },
          });
        })
      );

      console.log(units);
    }
  );
}

main();
