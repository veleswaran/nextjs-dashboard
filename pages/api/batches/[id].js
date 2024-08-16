import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function  handler(req,res){
    const { id } = req.query;
    if(req.method === "GET"){
        try{
            if (!id || isNaN(parseInt(id, 10))) {
                return res.status(400).json({ error: "Invalid or missing ID" });
            }
            let batches = await prisma.batch.findFirst({where: { id: parseInt(id, 10) }});
            res.status(200).json(batches);
        }catch(err){
            res.status(500).json({error: 'Database insert failed' })
        }
    }else if(req.method === "DELETE"){
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try{
            await prisma.batch.delete({where: { id: parseInt(id, 10) }});
            res.status(200).json({message:"deleted successfully"});
        }catch(err){
            res.status(500).json({error: 'Database insert failed' })
        }
    }else if(req.method === "PUT"){
        const { name} = req.body;
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
          await prisma.batch.update(  {where: { id: parseInt(id, 10) },
          data: { name }});
          res.status(200).json({message:"updated successfully"});
        } catch (error) {
          console.error('Error inserting into database:', error);
          res.status(500).json({ error: 'Database insert failed' });
        }
    }
    else{
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}