// Using CommonJS require syntax
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const AIModelType = {
  FOOTPATH_TRACKING: 'FOOTPATH_TRACKING',
  DEMOGRAPHICS: 'DEMOGRAPHICS',
  FACE_DETECTION: 'FACE_DETECTION',
  HEATMAP_GENERATION: 'HEATMAP_GENERATION',
  SHOPLIFTING_DETECTION: 'SHOPLIFTING_DETECTION',
  PEOPLE_COUNTER: 'PEOPLE_COUNTER',
  CHECKOUT_COUNTER: 'CHECKOUT_COUNTER',
  GENERAL_OBJECT_DETECTION: 'GENERAL_OBJECT_DETECTION',
  VEHICLE_DETECTION: 'VEHICLE_DETECTION',
  PPE_DETECTION: 'PPE_DETECTION'
};

const BusinessType = {
  COMMERCIAL_REAL_ESTATE: 'COMMERCIAL_REAL_ESTATE',
  MANUFACTURING_WAREHOUSING: 'MANUFACTURING_WAREHOUSING',
  MULTI_FAMILY_RESIDENTIAL: 'MULTI_FAMILY_RESIDENTIAL',
  RETAIL: 'RETAIL'
};

const ModelSource = {
  ROBOFLOW: 'ROBOFLOW',
  CUSTOM: 'CUSTOM',
  THIRD_PARTY: 'THIRD_PARTY'
};

async function seedAIModels() {
  console.log('Seeding AI Models...');
  
  // Clear existing data first
  await prisma.businessAIModelCamera.deleteMany({});
  await prisma.businessAIModel.deleteMany({});
  await prisma.aIModel.deleteMany({});
  
  const aiModels = [
    {
      name: 'FootPath Tracking',
      description: 'Tracks movement patterns and preferred paths taken by people through a space.',
      type: AIModelType.FOOTPATH_TRACKING,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL,
        BusinessType.MANUFACTURING_WAREHOUSING
      ],
      capabilities: {
        features: [
          'Path tracking',
          'Common routes identification',
          'Bottleneck detection',
          'Cross-zone movement analysis',
          'Traffic flow visualization'
        ],
        metrics: ['Path frequency', 'Average speed', 'Stopping points', 'Zone transitions'],
        requiresCalibration: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Customer Journey Analysis",
          features: [
            "Product interaction tracking",
            "Department visit sequence",
            "Shopping pattern analysis"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Visitor Navigation Analysis",
          features: [
            "Tenant discovery patterns",
            "Common area utilization",
            "Visitor routing optimization"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Resident Movement Patterns",
          features: [
            "Amenity usage routes",
            "Common area traffic patterns",
            "Building access flow"
          ]
        },
        [BusinessType.MANUFACTURING_WAREHOUSING]: {
          name: "Worker Movement Efficiency",
          features: [
            "Workflow path optimization",
            "Process bottleneck identification",
            "Movement redundancy analysis"
          ]
        }
      },
      configOptions: {
        minimumFrameRate: 10,
        trackingPersistence: 40,
        heatmapResolution: 'medium',
        pathSmoothingFactor: 0.6
      }
    },
    {
      name: 'Demographics',
      description: 'Analyzes demographics including age and gender distributions to help understand visitor profiles.',
      type: AIModelType.DEMOGRAPHICS,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE
      ],
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
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Customer Demographic Profiling",
          features: [
            "Target audience validation",
            "Marketing effectiveness by demographic",
            "Product interest by demographic group"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Visitor Demographics Analysis",
          features: [
            "Tenant mix optimization",
            "Event demographic attraction",
            "Facility usage by demographic"
          ]
        }
      },
      configOptions: {
        minimumFaceSize: 60,
        confidenceThreshold: 0.75,
        aggregationPeriod: 15, // minutes
        preserveImages: false
      }
    },
    {
      name: 'Face Detection',
      description: 'Detects and analyzes faces while maintaining privacy and compliance.',
      type: AIModelType.FACE_DETECTION,
      version: '1.0.0',
      source: ModelSource.ROBOFLOW,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL
      ],
      capabilities: {
        features: [
          'Face detection and counting',
          'Unique visitor estimation',
          'Privacy-preserving analytics',
          'Face blurring for GDPR compliance'
        ],
        metrics: ['Unique visitors', 'Return frequency', 'Visit duration'],
        privacyCompliant: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Retail Face Analytics",
          features: [
            "Unique customer counting",
            "Return customer identification",
            "VIP customer alerts"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Building Access Monitoring",
          features: [
            "Tenant vs. visitor identification",
            "Unauthorized access alerts",
            "Visitor frequency tracking"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Resident Access Monitoring",
          features: [
            "Resident vs. guest differentiation",
            "Unknown person alerts",
            "Tailgating detection"
          ]
        }
      },
      configOptions: {
        minimumFaceSize: 40, // pixels
        privacyMode: 'high', // no actual face images stored
        detectionConfidence: 0.7,
        analyticsOnly: true,
        identificationDisabled: true
      }
    },
    {
      name: 'Heatmap Generation',
      description: 'Creates visual heatmaps showing people density and activity across spaces.',
      type: AIModelType.HEATMAP_GENERATION,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL,
        BusinessType.MANUFACTURING_WAREHOUSING
      ],
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
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Retail Activity Heatmaps",
          features: [
            "Product interest hotspots",
            "Store layout effectiveness",
            "Promotion zone performance"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Space Utilization Heatmaps",
          features: [
            "Common area usage patterns",
            "Traffic intensity mapping",
            "Dead zone identification"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Residential Usage Heatmaps",
          features: [
            "Amenity popularity mapping",
            "Common area usage optimization",
            "Service placement planning"
          ]
        },
        [BusinessType.MANUFACTURING_WAREHOUSING]: {
          name: "Operational Intensity Mapping",
          features: [
            "Workflow congestion points",
            "Activity concentration zones",
            "Resource allocation optimization"
          ]
        }
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
      name: 'Shoplifting Detection',
      description: 'Identifies suspicious behaviors and potential shoplifting activities to alert security personnel.',
      type: AIModelType.SHOPLIFTING_DETECTION,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL
      ],
      capabilities: {
        features: [
          'Suspicious behavior detection',
          'Product concealment recognition',
          'Tag removal alerts',
          'Repeat offender identification'
        ],
        metrics: ['Alert count', 'False positive rate', 'Intervention success rate'],
        requiresCalibration: true,
        privacyCompliant: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Retail Loss Prevention",
          features: [
            "Theft pattern detection",
            "High-risk product monitoring",
            "Security staff notification",
            "Suspicious behavior alerts"
          ]
        }
      },
      configOptions: {
        sensitivityLevel: 'medium',
        minimumConfidence: 0.75,
        alertThreshold: 0.8,
        cooldownPeriod: 60, // seconds
        recordOnAlert: true,
        filterCategories: ['concealment', 'tag_removal', 'suspicious_loitering']
      }
    },
    {
      name: 'People Counter',
      description: 'Counts people entering and exiting spaces with high accuracy.',
      type: AIModelType.PEOPLE_COUNTER,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL,
        BusinessType.MANUFACTURING_WAREHOUSING
      ],
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
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Store Traffic Analytics",
          features: [
            "Customer conversion rate",
            "Marketing campaign impact",
            "Staff to customer ratio optimization"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Building Occupancy Management",
          features: [
            "Tenant traffic analysis",
            "Building utilization metrics",
            "Capacity management"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Residential Facility Usage",
          features: [
            "Amenity usage tracking",
            "Peak usage time identification",
            "Service scheduling optimization"
          ]
        },
        [BusinessType.MANUFACTURING_WAREHOUSING]: {
          name: "Workforce Presence Tracking",
          features: [
            "Zone occupancy monitoring",
            "Safety compliance headcounts",
            "Shift transition efficiency"
          ]
        }
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
    },
    {
      name: 'Checkout Counter',
      description: 'Monitors checkout areas to analyze queue times, customer flow, and service efficiency.',
      type: AIModelType.CHECKOUT_COUNTER,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL
      ],
      capabilities: {
        features: [
          'Queue length tracking',
          'Wait time estimation',
          'Service time analytics',
          'Checkout abandonment detection',
          'Staff efficiency metrics'
        ],
        metrics: ['Average wait time', 'Service time', 'Abandonment rate', 'Items per transaction'],
        requiresCalibration: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Checkout Optimization",
          features: [
            "Cashier efficiency analytics",
            "Peak period staffing recommendations",
            "Checkout abandonment prevention",
            "Lane open/close optimization"
          ]
        }
      },
      configOptions: {
        queueAreaDefinition: {
          enabled: true,
          maxQueueLength: 10
        },
        checkoutAreaMapping: true,
        waitTimeThresholds: {
          acceptable: 120, // seconds
          warning: 240, // seconds
          critical: 360 // seconds
        },
        staffPositionTracking: true
      }
    },
    {
      name: 'General Object Detection',
      description: 'Multi-purpose object detection system that can identify and track various objects of interest.',
      type: AIModelType.GENERAL_OBJECT_DETECTION,
      version: '1.0.0',
      source: ModelSource.CUSTOM,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL,
        BusinessType.MANUFACTURING_WAREHOUSING
      ],
      capabilities: {
        features: [
          'Multi-class object detection',
          'Object tracking across frames',
          'Custom object category training',
          'Counting and classification'
        ],
        metrics: ['Detection accuracy', 'Classification confidence', 'Object counts by category'],
        customizable: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Retail Item Detection",
          features: [
            "Product placement verification",
            "Stock level estimation",
            "Planogram compliance",
            "Abandoned item detection"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Asset Monitoring",
          features: [
            "Equipment tracking",
            "Furniture arrangement",
            "Space usage analysis",
            "Prohibited item detection"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Common Area Monitoring",
          features: [
            "Left item detection",
            "Community equipment tracking",
            "Pet monitoring",
            "Facility usage tracking"
          ]
        },
        [BusinessType.MANUFACTURING_WAREHOUSING]: {
          name: "Inventory and Equipment Tracking",
          features: [
            "Tool placement verification",
            "Material location tracking",
            "Safety hazard detection",
            "Process verification"
          ]
        }
      },
      configOptions: {
        detectionThreshold: 0.6,
        defaultObjectClasses: ['person', 'bag', 'vehicle', 'phone', 'laptop'],
        trackingPersistence: 30, // frames
        minimumObjectSize: 0.01, // percentage of frame
        maxObjectsPerFrame: 50
      }
    },
    {
      name: 'Vehicle Detection',
      description: 'Detects and tracks vehicles in parking and traffic areas.',
      type: AIModelType.VEHICLE_DETECTION,
      version: '1.0.0',
      source: ModelSource.ROBOFLOW,
      compatibleWith: [
        BusinessType.RETAIL,
        BusinessType.COMMERCIAL_REAL_ESTATE,
        BusinessType.MULTI_FAMILY_RESIDENTIAL
      ],
      capabilities: {
        features: [
          'Vehicle detection and classification',
          'Parking occupancy tracking',
          'Traffic flow analysis',
          'Vehicle counting'
        ],
        metrics: ['Vehicle count by type', 'Parking occupancy', 'Average parking duration'],
        highAccuracy: true
      },
      verticalCapabilities: {
        [BusinessType.RETAIL]: {
          name: "Retail Parking Management",
          features: [
            "Customer parking availability",
            "Peak shopping time analysis",
            "Visit duration by parking location"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Commercial Parking Optimization",
          features: [
            "Tenant vs visitor parking usage",
            "Parking allocation efficiency",
            "Unauthorized parking detection"
          ]
        },
        [BusinessType.MULTI_FAMILY_RESIDENTIAL]: {
          name: "Residential Parking Monitoring",
          features: [
            "Resident parking verification",
            "Guest parking management",
            "Parking violation detection"
          ]
        }
      },
      configOptions: {
        vehicleClasses: ['car', 'truck', 'van', 'motorcycle', 'bus'],
        minimumDetectionSize: 0.03,
        trackingPersistence: 50,
        parkingSpotMapping: {
          enabled: true,
          automaticDetection: true
        }
      }
    },
    {
      name: 'PPE Detection',
      description: 'Detects proper use of personal protective equipment for safety compliance.',
      type: AIModelType.PPE_DETECTION,
      version: '1.0.0',
      source: ModelSource.ROBOFLOW,
      compatibleWith: [
        BusinessType.MANUFACTURING_WAREHOUSING,
        BusinessType.COMMERCIAL_REAL_ESTATE
      ],
      capabilities: {
        features: [
          'PPE item detection',
          'Compliance verification',
          'Safety violation alerts',
          'Zone-based requirement enforcement'
        ],
        metrics: ['Compliance rate', 'Violation count', 'Safety score by zone'],
        realTimeAlerts: true
      },
      verticalCapabilities: {
        [BusinessType.MANUFACTURING_WAREHOUSING]: {
          name: "Industrial Safety Compliance",
          features: [
            "Hard hat detection",
            "Safety vest monitoring",
            "Glove and goggle verification",
            "Respiratory protection detection"
          ]
        },
        [BusinessType.COMMERCIAL_REAL_ESTATE]: {
          name: "Construction Site Safety",
          features: [
            "Worker safety compliance",
            "Contractor PPE enforcement",
            "Hazardous area access control",
            "Safety report generation"
          ]
        }
      },
      configOptions: {
        ppeItems: ['helmet', 'vest', 'mask', 'gloves', 'goggles', 'boots'],
        detectionConfidence: 0.7,
        alertThreshold: 0.8,
        zoneBasedRequirements: true,
        alertDelay: 5 // seconds
      }
    }
  ];

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