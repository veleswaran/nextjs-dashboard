import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { status, date, studentId } = req.body;
        try {
            const result = await prisma.attendance.create({
                data: {
                    status,
                    date: new Date(date),
                    studentId
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.error('Error inserting into database:', error);
            res.status(500).json({ error: 'Database insert failed' });
        }
    } else if (req.method === 'GET') {
        try {
            const attendances = await prisma.attendance.findMany();
            res.status(200).json(attendances);
        } catch (error) {
            console.error('Error fetching from database:', error);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
