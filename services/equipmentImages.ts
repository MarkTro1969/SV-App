import { Annotation } from '../components/AnnotatedImage';

export interface EquipmentImage {
  id: string;
  name: string;
  category: 'router' | 'switch' | 'modem' | 'access-point' | 'controller' | 'camera' | 'panel';
  brand: string;
  imageUrl: string;
  annotations: {
    statusLights: Annotation[];
    resetButton: Annotation[];
    ports: Annotation[];
  };
  caption: string;
}

// Equipment image database - add your actual equipment images here
export const EQUIPMENT_IMAGES: Record<string, EquipmentImage> = {
  'araknis-router': {
    id: 'araknis-router',
    name: 'Araknis Router',
    category: 'router',
    brand: 'Araknis',
    imageUrl: '/equipment/araknis-router.svg',
    annotations: {
      statusLights: [
        { type: 'circle', x: 15, y: 25, label: 'Power LED', color: '#00B4A0' },
        { type: 'circle', x: 25, y: 25, label: 'Internet LED', color: '#00B4A0' },
        { type: 'circle', x: 35, y: 25, label: 'WiFi LED', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 85, y: 15, toX: 92, toY: 50, label: 'Reset Button', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 50, y: 85, label: 'WAN Port (Blue)', color: '#3B82F6' },
        { type: 'circle', x: 70, y: 85, label: 'LAN Ports', color: '#00B4A0' }
      ]
    },
    caption: 'Araknis Router - Blue light = connected, Red/Amber = problem'
  },

  'eero-router': {
    id: 'eero-router',
    name: 'Eero Router',
    category: 'router',
    brand: 'Eero',
    imageUrl: '/equipment/eero-router.svg',
    annotations: {
      statusLights: [
        { type: 'circle', x: 50, y: 20, label: 'Status LED', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 75, y: 70, toX: 90, toY: 85, label: 'Reset (bottom)', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 30, y: 90, label: 'Ethernet Ports', color: '#3B82F6' },
        { type: 'circle', x: 70, y: 90, label: 'Power', color: '#00B4A0' }
      ]
    },
    caption: 'Eero Router - White = connected, Red = no internet, Blue = setup mode'
  },

  'ubiquiti-unifi': {
    id: 'ubiquiti-unifi',
    name: 'Ubiquiti UniFi Router',
    category: 'router',
    brand: 'Ubiquiti',
    imageUrl: '/equipment/ubiquiti-unifi.png',
    annotations: {
      statusLights: [
        { type: 'circle', x: 50, y: 15, label: 'Status Ring', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 20, y: 80, toX: 10, toY: 90, label: 'Reset Pinhole', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 50, y: 90, label: 'WAN/LAN Ports', color: '#3B82F6' }
      ]
    },
    caption: 'UniFi Router - Blue ring = connected, White = booting'
  },

  'isp-modem': {
    id: 'isp-modem',
    name: 'ISP Modem (Generic)',
    category: 'modem',
    brand: 'ISP',
    imageUrl: '/equipment/isp-modem.svg',
    annotations: {
      statusLights: [
        { type: 'circle', x: 15, y: 20, label: 'Power', color: '#00B4A0' },
        { type: 'circle', x: 15, y: 35, label: 'Downstream', color: '#00B4A0' },
        { type: 'circle', x: 15, y: 50, label: 'Upstream', color: '#00B4A0' },
        { type: 'circle', x: 15, y: 65, label: 'Online', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 75, y: 30, toX: 92, toY: 50, label: 'Reset Button', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 50, y: 90, label: 'Coax Input', color: '#8B5CF6' },
        { type: 'circle', x: 75, y: 90, label: 'Ethernet Out', color: '#3B82F6' }
      ]
    },
    caption: 'ISP Modem - All lights solid = good connection'
  },

  'araknis-switch': {
    id: 'araknis-switch',
    name: 'Araknis Network Switch',
    category: 'switch',
    brand: 'Araknis',
    imageUrl: '/equipment/araknis-switch.png',
    annotations: {
      statusLights: [
        { type: 'circle', x: 10, y: 30, label: 'Power LED', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 90, y: 20, toX: 95, toY: 50, label: 'Reset', color: '#EF4444' }
      ],
      ports: [
        { type: 'label', x: 50, y: 70, label: 'Port LEDs: Green=Link, Flashing=Activity', color: '#00B4A0' }
      ]
    },
    caption: 'Araknis Switch - Green port lights indicate active connections'
  },

  'control4-controller': {
    id: 'control4-controller',
    name: 'Control4 Controller',
    category: 'controller',
    brand: 'Control4',
    imageUrl: '/equipment/control4-controller.png',
    annotations: {
      statusLights: [
        { type: 'circle', x: 50, y: 25, label: 'Status LED', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'arrow', x: 80, y: 70, toX: 92, toY: 85, label: 'Reset Pinhole', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 30, y: 90, label: 'Network Port', color: '#3B82F6' },
        { type: 'circle', x: 70, y: 90, label: 'Power', color: '#00B4A0' }
      ]
    },
    caption: 'Control4 Controller - Blue LED = normal, Red/Flashing = problem'
  },

  'luma-camera': {
    id: 'luma-camera',
    name: 'Luma Security Camera',
    category: 'camera',
    brand: 'Luma',
    imageUrl: '/equipment/luma-camera.png',
    annotations: {
      statusLights: [
        { type: 'circle', x: 50, y: 80, label: 'IR LEDs (night vision)', color: '#EF4444' }
      ],
      resetButton: [
        { type: 'arrow', x: 20, y: 50, toX: 10, toY: 70, label: 'Reset Button', color: '#EF4444' }
      ],
      ports: [
        { type: 'circle', x: 80, y: 70, label: 'PoE/Network Cable', color: '#3B82F6' }
      ]
    },
    caption: 'Luma Camera - Check PoE cable connection for power'
  },

  'qolsys-panel': {
    id: 'qolsys-panel',
    name: 'Qolsys Security Panel',
    category: 'panel',
    brand: 'Qolsys',
    imageUrl: '/equipment/qolsys-panel.png',
    annotations: {
      statusLights: [
        { type: 'circle', x: 90, y: 10, label: 'Status Indicator', color: '#00B4A0' }
      ],
      resetButton: [
        { type: 'label', x: 50, y: 95, label: 'Reboot via Settings > Advanced', color: '#3B82F6' }
      ],
      ports: []
    },
    caption: 'Qolsys Panel - Touchscreen security panel'
  }
};

// Helper function to get equipment by category
export function getEquipmentByCategory(category: EquipmentImage['category']): EquipmentImage[] {
  return Object.values(EQUIPMENT_IMAGES).filter(eq => eq.category === category);
}

// Helper function to get equipment by brand
export function getEquipmentByBrand(brand: string): EquipmentImage[] {
  return Object.values(EQUIPMENT_IMAGES).filter(
    eq => eq.brand.toLowerCase() === brand.toLowerCase()
  );
}

// Get annotation set by type
export function getAnnotations(
  equipmentId: string,
  type: 'statusLights' | 'resetButton' | 'ports' | 'all'
): Annotation[] {
  const equipment = EQUIPMENT_IMAGES[equipmentId];
  if (!equipment) return [];

  if (type === 'all') {
    return [
      ...equipment.annotations.statusLights,
      ...equipment.annotations.resetButton,
      ...equipment.annotations.ports
    ];
  }

  return equipment.annotations[type];
}
