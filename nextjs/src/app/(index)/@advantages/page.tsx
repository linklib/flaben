import Advantages from "@/app/components/advantages/advantages";
import { systemAdvantagesRepository } from "@/data/repositories/system-advantages.repository";

export default async function Page() {
  const advantagesResponse =
    await systemAdvantagesRepository.getSystemAdvantagesContent();

  return <Advantages advantages={advantagesResponse.data?.data} />;
}
