/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('./src/generated/prisma');

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    const services = await prisma.service.findMany();
    console.log('Services:', services);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 