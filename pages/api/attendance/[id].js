import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const attendance = await prisma.attendance.findUnique({
                where: { id: parseInt(id, 10) },
            });
            if (attendance) {
                res.status(200).json(attendance);
            } else {
                res.status(404).json({ error: "Attendance record not found" });
            }
        } catch (err) {
            console.error('Error fetching attendance:', err);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else if (req.method === "DELETE") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const attendance = await prisma.attendance.delete({
                where: { id: parseInt(id, 10) },
            });
            res.status(200).json({ message: "Deleted successfully", attendance });
        } catch (err) {
            console.error('Error deleting attendance:', err);
            res.status(500).json({ error: 'Database delete failed' });
        }
    } else if (req.method === "PUT") {
        const { status, date, studentId } = req.body;
        if (!id || isNaN(parseInt(id, 10)) || !status || !date || !studentId) {
            return res.status(400).json({ error: "Invalid input" });
        }
        try {
            const attendance = await prisma.attendance.update({
                where: { id: parseInt(id, 10) },
                data: { status, date: new Date(date), studentId },
            });
            res.status(200).json({ message: "Updated successfully", attendance });
        } catch (error) {
            console.error('Error updating attendance:', error);
            res.status(500).json({ error: 'Database update failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
