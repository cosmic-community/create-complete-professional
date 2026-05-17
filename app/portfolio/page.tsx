import PortfolioGrid from '@/components/PortfolioGrid';
import { getProjects } from '@/lib/cosmic';

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="pt-10">
      <PortfolioGrid projects={projects} />
    </div>
  );
}