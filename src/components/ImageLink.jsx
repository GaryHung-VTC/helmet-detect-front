import { Link } from "@chakra-ui/react";
import { getAuthenticatedImageUrl } from "../services/firebase";

const ImageLink = ({ imagePath, label }) => {
  const openInNewTab = async () => {
    const url = await getAuthenticatedImageUrl(imagePath);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return <Link onClick={openInNewTab}>{label}</Link>;
};

export default ImageLink;
