import { advantageRepository } from "@/data/repositories/advantage.repository";
import Partnership from "@/app/components/partnership/partnership";

export default async function Page() {
  const advantages = await advantageRepository.findAll();
  return <Partnership partnershipAdvantages={advantages.data?.data} />;
}
