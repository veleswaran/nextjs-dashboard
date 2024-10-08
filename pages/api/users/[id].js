import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id, 10) },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else if (req.method === "DELETE") {
        if (!id || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "Invalid or missing ID" });
        }
        try {
            const user = await prisma.user.delete({
                where: { id: parseInt(id, 10) },
            });
            res.status(200).json({ message: "Deleted successfully", user });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Database delete failed' });
        }
    } else if (req.method === "PUT") {
        const { name, email, phone, password } = req.body;
        if (!id || isNaN(parseInt(id, 10)) || !name || !email || !password) {
            return res.status(400).json({ error: "Invalid input" });
        }
        try {
            const user = await prisma.user.update({
                where: { id: parseInt(id, 10) },
                data: { name, email, phone, password },
            });
            res.status(200).json({ message: "Updated successfully", user });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Database update failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
