import mediasSource from "@/data/media.json";
import photographersSource from "@/data/photographer.json";

const mediaAssetOverrides = {
  "Architecture_Contrast.jpg": "Architecure_Contrast.jpg",
};

export async function getAllPhotographers() {
  return photographersSource.map(normalizePhotographer);
}

export async function getPhotographer(id) {
  const photographers = await getAllPhotographers();

  return photographers.find((photographer) => String(photographer.id) === id);
}

export async function getAllMediasForPhotographer(photographerId) {
  return mediasSource
    .filter((media) => String(media.photographerId) === String(photographerId))
    .map(normalizeMedia);
}

function normalizePhotographer(photographer) {
  return {
    ...photographer,
    name: cleanText(photographer.name),
    city: cleanText(photographer.city),
    country: cleanText(photographer.country),
    tagline: cleanText(photographer.tagline),
  };
}

function normalizeMedia(media) {
  return {
    ...media,
    title: cleanText(media.title),
    image: media.image ? mediaAssetOverrides[media.image] ?? media.image : media.image,
    video: media.video ? mediaAssetOverrides[media.video] ?? media.video : media.video,
  };
}

function cleanText(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replaceAll("Ã©", "é")
    .replaceAll("Ã¨", "è")
    .replaceAll("Ã ", "à")
    .replaceAll("Ã´", "ô")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", "\"")
    .replaceAll("â€", "\"");
}
