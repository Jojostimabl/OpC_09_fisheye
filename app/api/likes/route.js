import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma-client";

const maxUserKeyLength = 128;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mediaId = parseMediaId(searchParams.get("mediaId"));
  const userKey = parseUserKey(searchParams.get("userKey"));

  if (!mediaId || !userKey) {
    return jsonError(
      "Les param\u00e8tres mediaId et userKey sont requis et doivent \u00eatre valides.",
      400,
    );
  }

  try {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      select: { id: true },
    });

    if (!media) {
      return jsonError("M\u00e9dia introuvable.", 404);
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        mediaId_userKey: { mediaId, userKey },
      },
    });

    return Response.json({ liked: Boolean(existingLike) });
  } catch (error) {
    console.error("Impossible de r\u00e9cup\u00e9rer le statut du like.", error);
    return jsonError("Impossible de r\u00e9cup\u00e9rer le statut du like.", 500);
  }
}

export async function POST(request) {
  const payload = await readJson(request);

  if (!payload) {
    return jsonError("Le corps de la requ\u00eate doit \u00eatre un JSON valide.", 400);
  }

  const mediaId = parseMediaId(payload.mediaId);
  const userKey = parseUserKey(payload.userKey);

  if (!mediaId || !userKey) {
    return jsonError(
      "Les param\u00e8tres mediaId et userKey sont requis et doivent \u00eatre valides.",
      400,
    );
  }

  try {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      select: { id: true, photographerId: true },
    });

    if (!media) {
      return jsonError("M\u00e9dia introuvable.", 404);
    }

    const result = await prisma.$transaction(async (transaction) => {
      const existingLike = await transaction.like.findUnique({
        where: {
          mediaId_userKey: { mediaId, userKey },
        },
      });

      if (existingLike) {
        await transaction.like.delete({
          where: {
            mediaId_userKey: { mediaId, userKey },
          },
        });

        const updatedMedia = await transaction.media.update({
          where: { id: mediaId },
          data: { likes: { decrement: 1 } },
          select: { likes: true },
        });

        return { liked: false, likes: updatedMedia.likes };
      }

      await transaction.like.create({
        data: { mediaId, userKey },
      });

      const updatedMedia = await transaction.media.update({
        where: { id: mediaId },
        data: { likes: { increment: 1 } },
        select: { likes: true },
      });

      return { liked: true, likes: updatedMedia.likes };
    });

    revalidatePath(`/photographers/${media.photographerId}`);

    return Response.json(result);
  } catch (error) {
    console.error("Impossible de mettre \u00e0 jour le like.", error);
    return jsonError("Impossible de mettre \u00e0 jour le like.", 500);
  }
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function parseMediaId(value) {
  const mediaId = Number(value);

  return Number.isSafeInteger(mediaId) && mediaId > 0 ? mediaId : null;
}

function parseUserKey(value) {
  if (typeof value !== "string") {
    return null;
  }

  const userKey = value.trim();

  return userKey.length > 0 && userKey.length <= maxUserKeyLength
    ? userKey
    : null;
}

function jsonError(error, status) {
  return Response.json({ error }, { status });
}
