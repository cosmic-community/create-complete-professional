import MaterialsGrid from '@/components/MaterialsGrid';
import { getMaterials } from '@/lib/cosmic';

export default async function MaterialsPage() {
  const materials = await getMaterials();
  return (
    <div className="pt-10">
      <MaterialsGrid materials={materials} />
    </div>
  );
}