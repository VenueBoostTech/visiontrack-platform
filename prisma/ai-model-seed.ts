// Using CommonJS require syntax
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const AIModelType = {
  CUSTOMER_TRAFFIC: 'CUSTOMER_TRAFFIC',
  FOOTPATH_ANALYSIS: 'FOOTPATH_ANALYSIS',
  DEMOGRAPHICS: 'DEMOGRAPHICS',
  BEHAVIOR_ANALYSIS: 'BEHAVIOR_ANALYSIS',
  HEATMAP: 'HEATMAP',
  CONVERSION_TRACKING: 'CONVERSION_TRACKING',
  CUSTOMER_COUNTER: 'CUSTOMER_COUNTER'
};

async function seedAIModels() {
  console.log('Seeding AI Models...');
  
  const aiModels = [
    {
      name: 'Customer Traffic Analysis',
      description: 'Tracks customer movement patterns throughout the venue to identify high-traffic areas and optimize layouts.',
      type: AIModelType.CUSTOMER_TRAFFIC,
      version: '1.0.0',
      capabilities: {
        features: [
          'Traffic flow visualization',
          'Customer journey mapping',
          'Congestion detection',
          'Traffic pattern comparisons'
        ],
        metrics: ['Traffic volume', 'Path efficiency', 'Zone transitions'],
        requiresCalibration: true
      },
      configOptions: {
        minimumFrameRate: 15,
        detectionThreshold: 0.65,
        trackingPersistence: 30,
        zones: {
          enabled: true,
          maximum: 10
        }
      }
    },
    {
      name: 'Footpath Analysis',
      description: 'Analyzes movement patterns and preferred paths taken by customers through a venue.',
      type: AIModelType.FOOTPATH_ANALYSIS,
      version: '1.0.0',
      capabilities: {
        features: [
          'Path heatmaps',
          'Common routes identification',
          'Bottleneck detection',
          'Cross-zone movement analysis'
        ],
        metrics: ['Path frequency', 'Average speed', 'Stopping points'],
        requiresCalibration: true
      },
      configOptions: {
        minimumFrameRate: 10,
        trackingPersistence: 40,
        heatmapResolution: 'medium',
        pathSmoothingFactor: 0.6
      }
    },
    {
      name: 'Demographics Analysis',
      description: 'Analyzes customer demographics including age and gender distributions to help target services.',
      type: AIModelType.DEMOGRAPHICS,
      version: '1.0.0',
      capabilities: {
        features: [
          'Age group estimation',
          'Gender distribution',
          'Time-based demographic shifts',
          'Zone-specific demographics'
        ],
        metrics: ['Age groups', 'Gender ratio', 'Demographic flow'],
        privacyPreserving: true
      },
      configOptions: {
        minimumFaceSize: 60,
        confidenceThreshold: 0.75,
        aggregationPeriod: 15, // minutes
        preserveImages: false
      }
    },
    {
      name: 'Behavior Analysis',
      description: 'Identifies specific customer behaviors such as browsing patterns, dwell time, and interactions.',
      type: AIModelType.BEHAVIOR_ANALYSIS,
      version: '1.0.0',
      capabilities: {
        features: [
          'Dwell time analysis',
          'Product interaction detection',
          'Staff-customer interaction analysis',
          'Browsing pattern recognition'
        ],
        metrics: ['Average dwell time', 'Interaction counts', 'Conversion likelihood'],
        requiresCalibration: true
      },
      configOptions: {
        minimumFrameRate: 15,
        dwellThreshold: 5, // seconds
        interactionDistance: 0.5, // meters
        eventCategories: ['browse', 'engage', 'consult', 'purchase']
      }
    },
    {
      name: 'Heatmap Generation',
      description: 'Creates visual heatmaps showing customer density and activity across the venue.',
      type: AIModelType.HEATMAP,
      version: '1.0.0',
      capabilities: {
        features: [
          'Real-time density visualization',
          'Historical comparison',
          'Time-based heatmap evolution',
          'Multi-floor mapping'
        ],
        metrics: ['Occupancy density', 'Dwell hotspots', 'Time-based changes'],
        supportsExport: true
      },
      configOptions: {
        resolution: 'high',
        colorScheme: 'thermal',
        smoothingFactor: 0.7,
        updateFrequency: 5, // seconds
        historyLength: 24 // hours
      }
    },
    {
      name: 'Conversion Tracking',
      description: 'Monitors and analyzes customer conversion rates from entry to purchase or other defined goals.',
      type: AIModelType.CONVERSION_TRACKING,
      version: '1.0.0',
      capabilities: {
        features: [
          'Entry-to-purchase tracking',
          'Zone conversion analysis',
          'Abandonment detection',
          'Service point efficiency'
        ],
        metrics: ['Conversion rate', 'Average time to convert', 'Abandonment rate'],
        requiresIntegration: true
      },
      configOptions: {
        goalZones: {
          enabled: true,
          maximum: 5
        },
        conversionTimeWindow: 60, // minutes
        trackingPersistence: 120, // minutes
        integrations: ['POS', 'CRM', 'ERP']
      }
    },
    {
      name: 'Customer Counter',
      description: 'Counts customers entering and exiting the venue with high accuracy.',
      type: AIModelType.CUSTOMER_COUNTER,
      version: '1.0.0',
      capabilities: {
        features: [
          'Bidirectional counting',
          'Real-time occupancy tracking',
          'Group detection',
          'Time-based analytics'
        ],
        metrics: ['Entry count', 'Exit count', 'Current occupancy', 'Average visit duration'],
        highAccuracy: true
      },
      configOptions: {
        countingLine: {
          enabled: true,
          direction: 'horizontal',
          position: 0.5
        },
        minimumDetectionSize: 0.1,
        persistTracking: true,
        filterNonHuman: true
      }
    }
  ];

  // Clear existing data if needed
  await prisma.businessAIModelCamera.deleteMany({});
  await prisma.businessAIModel.deleteMany({});
  await prisma.aIModel.deleteMany({});

  // Create AI Models
  for (const model of aiModels) {
    await prisma.aIModel.create({
      data: model
    });
  }

  console.log('AI Models seeded successfully!');
}

async function main() {
  try {
    await seedAIModels();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();