import { generalImageRepository } from "@/data/repositories/general-image.repository";
import About from "@/app/components/about/about";
import { contentRepository } from "@/data/repositories/content.repository";

export default async function Page() {
  const generalImageResponse = await generalImageRepository.find();
  const aboutTitleResponse = await contentRepository.getAboutTitle();
  const aboutDescription = await contentRepository.getAboutDescription();

  const [generalImageData, aboutHeadingData, aboutDescriptionData] =
    await Promise.all([
      generalImageResponse,
      aboutTitleResponse,
      aboutDescription,
    ]);

  return (
    <About
      generalImage={generalImageData.data?.data}
      title={aboutHeadingData.data?.data.attributes.text}
      description={aboutDescriptionData.data?.data.attributes.text}
    />
  );
}
