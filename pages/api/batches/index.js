import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function  handler(req,res){
    // create new batches 
    if (req.method === 'POST') {
        const { name} = req.body;
        try {
          const result = await prisma.batch.create({
            data: {
              name
            },
          });
          res.status(201).json(result);
        } catch (error) {
          console.error('Error inserting into database:', error);
          res.status(500).json({ error: 'Database insert failed' });
        }
      }

    // Get all batches
    else if(req.method === "GET"){
        const { name} = req.body;
        try {
          const result = await prisma.batch.create({
            data: {
              name
            },
          });
          res.status(201).json(result);
        } catch (error) {
          console.error('Error inserting into database:', error);
          res.status(500).json({ error: 'Database insert failed' });
        }
    }else{
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}