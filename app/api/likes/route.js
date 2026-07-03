import { prisma } from "@/lib/prisma-client";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mediaId = Number(searchParams.get("mediaId"));
  const userKey = searchParams.get("userKey");

  if (!mediaId || !userKey) {
    return Response.json(
      { error: "mediaId and userKey are required" },
      { status: 400 },
    );
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      mediaId_userKey: {
        mediaId,
        userKey,
      },
    },
  });

  return Response.json({ liked: Boolean(existingLike) });
}

export async function POST(request) {
  const { mediaId, userKey } = await request.json();

  if (!mediaId || !userKey) {
    return Response.json({
      error: "mediaId and userKey are required",
    }, { status: 400 });
  }

  const numericMediaId = Number(mediaId);

  const existingLike = await prisma.like.findUnique({
    where: {
      mediaId_userKey: {
        mediaId: numericMediaId,
        userKey,
      },
    },
  });

  if (existingLike) {
    const [, updatedMedia] = await prisma.$transaction([
      prisma.like.delete({
        where: {
          mediaId_userKey: {
            mediaId: numericMediaId,
            userKey,
          },
        },
      }),
      prisma.media.update({
        where: { id: numericMediaId },
        data: { likes: { decrement: 1 } },
      }),
    ]);

    return Response.json({
      liked: false,
      likes: updatedMedia.likes,
    });
  }

  const [, updatedMedia] = await prisma.$transaction([
    prisma.like.create({
      data: {
        mediaId: numericMediaId,
        userKey,
      },
    }),
    prisma.media.update({
      where: { id: numericMediaId },
      data: { likes: { increment: 1 } },
    }),
  ]);

  return Response.json({
    liked: true,
    likes: updatedMedia.likes,
  });
}
