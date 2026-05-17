import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import ProcessTimeline from '@/components/ProcessTimeline';
import MaterialsGrid from '@/components/MaterialsGrid';
import EquipmentSection from '@/components/EquipmentSection';
import PortfolioGrid from '@/components/PortfolioGrid';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import { getServices, getMaterials, getEquipment, getProjects, getTestimonials, getFAQs } from '@/lib/cosmic';

export default async function HomePage() {
  const [services, materials, equipment, projects, testimonials, faqs] = await Promise.all([
    getServices(),
    getMaterials(),
    getEquipment(),
    getProjects(),
    getTestimonials(),
    getFAQs(),
  ]);

  return (
    <>
      <Hero />
      <Calculator services={services} />
      <ProcessTimeline />
      <PortfolioGrid projects={projects} />
      <MaterialsGrid materials={materials} />
      <EquipmentSection equipment={equipment} />
      <TestimonialsCarousel testimonials={testimonials} />
      <FAQSection faqs={faqs} />
    </>
  );
}