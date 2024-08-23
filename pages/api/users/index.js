import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
   if (req.method === 'GET') {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

        try {
            const decoded = jwt.verify(token, "altalya");
            if(!decoded.id===null){
                return res.status(405).json({message:"jwt token is not valid"});
            }else{
                const users = await prisma.user.findMany();
                return res.status(200).json(users);
            }
        } catch (error) {
            console.error('Error fetching from database:', error);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.setHeader('Allow',  'GET');
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
