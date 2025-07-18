import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { PrismaClient } = require('@prisma/client');
    
    console.log('=== DB TEST START ===');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    const prisma = new PrismaClient({
        log: ['error', 'warn', 'info'],
    });
    
    try {
        console.log('Attempting to connect...');
        await prisma.$connect();
        console.log('Connected successfully');
        
        console.log('Testing raw query...');
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('Raw query result:', result);
        
        console.log('Testing table query...');
        const taskCount = await prisma.task.count();
        console.log('Task count:', taskCount);
        
        await prisma.$disconnect();
        
        return res.status(200).json({ 
            success: true, 
            taskCount,
            message: 'All tests passed'
        });
        
    } catch (error) {
        console.error('=== ERROR DETAILS ===');
        if (error instanceof Error) {
            console.error('Error name:', (error as any).name);
            console.error('Error message:', error.message);
            console.error('Error code:', (error as any).code);
            console.error('Error stack:', error.stack);
        } else {
            console.error('Unknown error:', error);
        }
        console.error('=== END ERROR ===');
        
        await prisma.$disconnect();
        
        if (error instanceof Error) {
            return res.status(500).json({ 
                error: error.message,
                name: (error as any).name,
                code: (error as any).code
            });
        } else {
            return res.status(500).json({ 
                error: 'Unknown error',
                name: '',
                code: ''
            });
        }
    }
}