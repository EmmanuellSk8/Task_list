import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const tasks = await prisma.task.findMany();
            return res.status(200).json(tasks);
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
            return res.status(500).json({ error: "Error al obtener las tareas" });
        }
    }

    if (req.method === 'POST') {
        const { title, status } = req.body;
        const newTask = await prisma.task.create({
            data: { title, status },
        });
        return res.status(201).json(newTask);
    }

    if (req.method === 'PATCH') {
        const { id, status } = req.body;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status }
        });
        return res.status(200).json(updatedTask);
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;
        await prisma.task.delete({
            where: { id }
        });
        return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}