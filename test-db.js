// Set environment variable
process.env.DATABASE_URL = "mongodb+srv://eylul:eylul@kuaforweb.qlqt43r.mongodb.net/?retryWrites=true&w=majority&appName=kuaforweb";

const { PrismaClient } = require('./src/generated/prisma');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing database connection...');
    console.log('📡 Database URL:', process.env.DATABASE_URL);
    
    // Test connection
    const services = await prisma.service.findMany();
    console.log('✅ Database connection successful!');
    console.log(`📊 Found ${services.length} services`);
    
    const products = await prisma.product.findMany();
    console.log(`📦 Found ${products.length} products`);
    
    const reviews = await prisma.review.findMany();
    console.log(`💬 Found ${reviews.length} reviews`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    
    if (error.message.includes('authentication')) {
      console.error('\n🔐 Authentication error - Check username/password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n🌐 Network error - Check internet connection');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('\n🚫 Connection refused - Check database URL');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase(); 