import { LiftingEquipmentItem, EquipmentGroupId, PerspectiveRole } from './types';
import { steelRopesData } from './categories/steelRopes';
import { chainSlingsData } from './categories/chainSlings';
import { textileSlingsData } from './categories/textileSlings';
import { riggingAccessoriesData } from './categories/riggingAccessories';
import { liftingMachinesData } from './categories/liftingMachines';
import { specialAttachmentsData } from './categories/specialAttachments';

export * from './types';

export const ALL_EQUIPMENT_DATA: LiftingEquipmentItem[] = [
  ...steelRopesData,
  ...chainSlingsData,
  ...textileSlingsData,
  ...riggingAccessoriesData,
  ...liftingMachinesData,
  ...specialAttachmentsData,
];

export interface CategorySummary {
  id: EquipmentGroupId;
  title: { tr: string; en: string };
  count: number;
  iconName: string;
}

export const EQUIPMENT_CATEGORIES: CategorySummary[] = [
  {
    id: 'steel-wire-ropes',
    title: { tr: 'Çelik Tel Halatlar ve Sapanlar', en: 'Steel Wire Ropes & Slings' },
    count: steelRopesData.length,
    iconName: 'Cable',
  },
  {
    id: 'chain-slings',
    title: { tr: 'Zincir Sapanlar ve Bileşenleri', en: 'Chain Slings & Components' },
    count: chainSlingsData.length,
    iconName: 'Link',
  },
  {
    id: 'textile-slings',
    title: { tr: 'Tekstil / Polyester Sapanlar', en: 'Textile / Polyester Slings' },
    count: textileSlingsData.length,
    iconName: 'Layers',
  },
  {
    id: 'rigging-accessories',
    title: { tr: 'Kaldırma ve Bağlama Aksesuarları', en: 'Rigging Hardware & Accessories' },
    count: riggingAccessoriesData.length,
    iconName: 'Anchor',
  },
  {
    id: 'lifting-machines',
    title: { tr: 'Manuel ve Motorlu Kaldırma Makineleri', en: 'Manual & Powered Lifting Machinery' },
    count: liftingMachinesData.length,
    iconName: 'Cpu',
  },
  {
    id: 'special-attachments',
    title: { tr: 'Özel Kaldırma Ataşmanları', en: 'Special Lifting Attachments' },
    count: specialAttachmentsData.length,
    iconName: 'BoxSelect',
  },
];

export function getEquipmentById(id: string): LiftingEquipmentItem | undefined {
  return ALL_EQUIPMENT_DATA.find((item) => item.id === id);
}

export function searchEquipment(
  query: string,
  categoryFilter?: EquipmentGroupId | 'all',
  perspectiveRole?: PerspectiveRole,
  locale: 'tr' | 'en' = 'tr'
): LiftingEquipmentItem[] {
  const normalizedQuery = query.toLowerCase().trim();

  return ALL_EQUIPMENT_DATA.filter((item) => {
    // Category match
    if (categoryFilter && categoryFilter !== 'all' && item.groupId !== categoryFilter) {
      return false;
    }

    // Query match
    if (normalizedQuery) {
      const name = item.name[locale].toLowerCase();
      const code = item.code.toLowerCase();
      const desc = item.shortDescription[locale].toLowerCase();
      const standards = item.standards.join(' ').toLowerCase();

      const matchesText =
        name.includes(normalizedQuery) ||
        code.includes(normalizedQuery) ||
        desc.includes(normalizedQuery) ||
        standards.includes(normalizedQuery);

      if (!matchesText) return false;
    }

    return true;
  });
}
