// prisma/seeds/initial-setup.ts
const { PrismaClient, UserRole, PropertyType, ZoneType } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function cleanDatabase() {
    try {
      console.log('Cleaning database before seeding...');
      
      // Only delete what we're going to seed
      await prisma.camera.deleteMany();
      console.log('Deleted cameras');
      
      await prisma.zone.deleteMany();
      console.log('Deleted zones');
      
      await prisma.building.deleteMany();
      console.log('Deleted buildings');
      
      await prisma.property.deleteMany();
      console.log('Deleted properties');
      
      await prisma.businessStaff.deleteMany();
      console.log('Deleted business staff');
      
      await prisma.business.deleteMany();
      console.log('Deleted businesses');
      
      await prisma.user.deleteMany({
        where: {
          email: {
            in: [
              'admin@visiontrack.xyz',
              'owner+joindasiy@visiontrack.xyz',
              'staff+joindasiy@visiontrack.xyz'
            ]
          }
        }
      });
      console.log('Deleted seed users');
  
      console.log('Database cleaned successfully');
    } catch (error) {
      console.error('Error cleaning database:', error);
      throw error;
    }
  }
  
  

async function main() {

    await cleanDatabase();

    // Create Admin user
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@visiontrack.xyz' },
        update: {}, // If user exists, no update is needed
        create: {
            name: 'VisionTrack Admin',
            email: 'admin@visiontrack.xyz',
            password: await hash('admin123', 12),
            role: UserRole.ADMIN,
            emailVerified: new Date(),
            passwordResetToken: null,
            passwordResetTokenExp: null,
        },
    });

   // Create Business Owner
    const businessOwner = await prisma.user.upsert({
        where: { email: 'owner+joindasiy@visiontrack.xyz' },
        update: {},
        create: {
            name: 'Daisy Owner',
            email: 'owner+joindasiy@visiontrack.xyz',
            password: await hash('owner123', 12),
            role: UserRole.BUSINESS_OWNER,
            emailVerified: new Date(),
            passwordResetToken: null,
            passwordResetTokenExp: null,
        },
    });

   // Create Staff Member
    const staffMember = await prisma.user.upsert({
        where: { email: 'staff+joindasiy@visiontrack.xyz' },
        update: {},
        create: {
            name: 'Daisy Staff',
            email: 'staff+joindasiy@visiontrack.xyz',
            password: await hash('staff123', 12),
            role: UserRole.STAFF,
            emailVerified: new Date(),
            passwordResetToken: null,
            passwordResetTokenExp: null,
        },
    });

    // Create Daisy Business
    const business = await prisma.business.create({
    data: {
        name: 'Daisy',
        email: 'info+joindasiy@visiontrack.xyz',
        phone: '+1 (212) 555-0123',
        address: '385 5th Avenue New York, NY 10016',
        ownerId: businessOwner.id, // Use the ID from the upserted user
        staff: {
            create: {
                userId: staffMember.id, // Use the ID from the upserted user
            },
        },
        },
    });

   // Create 5 Properties with Buildings
   const properties = [
       {
           name: 'Daisy Tower One',
           type: PropertyType.RESIDENTIAL,
           address: '123 Madison Avenue, New York, NY 10016',
           buildingName: 'Tower One',
           floorCount: 20
       },
       {
           name: 'Daisy Commercial Center',
           type: PropertyType.COMMERCIAL,
           address: '456 Park Avenue, New York, NY 10016',
           buildingName: 'Commercial Plaza',
           floorCount: 15
       },
       {
           name: 'Daisy Mixed Use',
           type: PropertyType.MIXED,
           address: '789 Lexington Avenue, New York, NY 10016',
           buildingName: 'Mixed Use Complex',
           floorCount: 25
       },
       {
           name: 'Daisy Retail Plaza',
           type: PropertyType.RETAIL,
           address: '321 7th Avenue, New York, NY 10016',
           buildingName: 'Retail Center',
           floorCount: 10
       },
       {
           name: 'Daisy Residential Two',
           type: PropertyType.RESIDENTIAL,
           address: '654 3rd Avenue, New York, NY 10016',
           buildingName: 'Tower Two',
           floorCount: 18
       }
   ];

   for (const prop of properties) {
       const property = await prisma.property.create({
           data: {
               name: prop.name,
               type: prop.type,
               address: prop.address,
               businessId: business.id,
               buildings: {
                   create: {
                       name: prop.buildingName,
                       floorCount: prop.floorCount
                   }
               }
           },
           include: {
               buildings: true
           }
       });

       // Create zones with proper enum
       const zones = [
           ZoneType.ENTRANCE,
           ZoneType.LOBBY,
           ZoneType.PARKING,
           ZoneType.COMMON_AREA
       ];

       for (const zoneType of zones) {
           await prisma.zone.create({
               data: {
                   name: `${prop.buildingName} ${zoneType}`,
                   type: zoneType,
                   propertyId: property.id,
                   buildingId: property.buildings[0].id,
                   floor: zoneType === ZoneType.PARKING ? -1 : 1
               }
           });
       }
   }

   console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
