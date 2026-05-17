import ServicesGrid from '@/components/ServicesGrid';
import { getServices } from '@/lib/cosmic';

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="pt-10">
      <ServicesGrid services={services} />
    </div>
  );
}