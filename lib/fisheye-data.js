import { prisma } from "@/lib/prisma-client";

const photographerDisplayOrder = [243, 930, 82, 527, 925, 195];

export async function getAllPhotographers() {
  const photographers = await prisma.photographer.findMany();
  const photographersById = new Map(
    photographers.map((photographer) => [
      photographer.id,
      normalizePhotographer(photographer),
    ]),
  );

  return photographerDisplayOrder
    .map((id) => photographersById.get(id))
    .filter(Boolean);
}

export async function getPhotographer(id) {
  const photographer = await prisma.photographer.findUnique({
    where: { id: Number(id) },
  });

  return photographer ? normalizePhotographer(photographer) : null;
}

export async function getAllMediasForPhotographer(photographerId) {
  const medias = await prisma.media.findMany({
    where: { photographerId: Number(photographerId) },
    orderBy: { id: "asc" },
  });

  return medias.map(normalizeMedia);
}

export async function getTotalLikesForPhotographer(photographerId) {
  const result = await prisma.media.aggregate({
    where: { photographerId: Number(photographerId) },
    _sum: { likes: true },
  });

  return result._sum.likes ?? 0;
}

export function updateNumberOfLikes(mediaId, newNumberOfLikes) {
  return prisma.media.update({
    where: { id: Number(mediaId) },
    data: { likes: Number(newNumberOfLikes) },
  });
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
    image: media.image,
    video: media.video,
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
