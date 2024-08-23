import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export default async function handler(req,res){
    if (req.method === 'POST') {
        let { name, email, phone, password } = req.body;
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });
    
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            password = bcrypt.hashSync(password, 10);
            const result = await prisma.user.create({
                data: {
                    name,
                    email,
                    phone,
                    password
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.error('Error inserting into database:', error);
            res.status(500).json({ error: 'Database insert failed' });
        }
    }
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}