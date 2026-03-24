"use client";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { getBackendImage } from "@/utils/features/get-backend-image";

export default function AppRichText({
  content,
}: {
  readonly content?: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        "list-item": (listItem) => {
          return (
            <>
              <li style={{ lineHeight: "150%", marginLeft: "1.4rem" }}>
                {listItem.children}
              </li>
              <br />
            </>
          );
        },
        paragraph: (paragraph) => {
          return (
            <>
              <p style={{ lineHeight: "150%" }}>{paragraph.children}</p>
              <br />
            </>
          );
        },
        image: ({ image }) => {
          const imgUrl = image.url.split("/");
          const shortUrl = imgUrl.slice(imgUrl.length - 2, imgUrl.length);
          return (
            <div
              style={{
                position: "relative",
              }}
            >
              <img
                src={getBackendImage(`/${shortUrl.join("/")}`)}
                width={"100%"}
                alt={image.alternativeText || ""}
              />
            </div>
          );
        },
      }}
    />
  );
}
