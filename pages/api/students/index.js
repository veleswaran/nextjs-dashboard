import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const student = await prisma.students.findUnique({
                where: { id: parseInt(id, 10) },
                include: { batch: true, user: true, attendance: true } 
            });
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: "Student not found" });
            }
        } catch (err) {
            console.error('Error fetching student:', err);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else if (req.method === "DELETE") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const student = await prisma.students.delete({
                where: { id: parseInt(id, 10) },
            });
            res.status(200).json({ message: "Deleted successfully", student });
        } catch (err) {
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Database delete failed' });
        }
    } else if (req.method === "PUT") {
        const { batchId, userId } = req.body;
        if (!id || isNaN(parseInt(id, 10)) || batchId === undefined || userId === undefined) {
            return res.status(400).json({ error: "Invalid input" });
        }
        try {
            const student = await prisma.students.update({
                where: { id: parseInt(id, 10) },
                data: { batchId, userId },
            });
            res.status(200).json({ message: "Updated successfully", student });
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'Database update failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
