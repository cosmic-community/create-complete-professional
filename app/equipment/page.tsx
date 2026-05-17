import EquipmentSection from '@/components/EquipmentSection';
import { getEquipment } from '@/lib/cosmic';

export default async function EquipmentPage() {
  const equipment = await getEquipment();
  return (
    <div className="pt-10">
      <EquipmentSection equipment={equipment} />
    </div>
  );
}