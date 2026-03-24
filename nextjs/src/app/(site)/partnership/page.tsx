import { advantageRepository } from "@/data/repositories/advantage.repository";
import Partnership from "@/app/(site)/partnership/components/partnership/partnership";
import AppContainer from "@/app/components/app-container/app-container";
import { contentRepository } from "@/data/repositories/content.repository";

export default async function Page() {
  const advantagesResponse = await advantageRepository.findAll();
  const partnershipAdvantagesHeadingResponse =
    await contentRepository.getPartnershipAdvantagesHeading();
  const partnershipAdvantagesDescriptionResponse =
    await contentRepository.getPartnershipAdvantagesDescription();

  const [
    advantagesData,
    partnershipAdvantagesHeadingData,
    partnershipAdvantagesDescriptionData,
  ] = await Promise.all([
    advantagesResponse,
    partnershipAdvantagesHeadingResponse,
    partnershipAdvantagesDescriptionResponse,
  ]);
  return (
    advantagesData.data?.data && (
      <AppContainer>
        <Partnership
          partnershipAdvantages={advantagesData.data.data}
          heading={partnershipAdvantagesHeadingData.data?.data.attributes.text}
          description={
            partnershipAdvantagesDescriptionData.data?.data.attributes.text
          }
        />
      </AppContainer>
    )
  );
}
