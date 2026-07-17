"use client";

import { useEffect, useState } from "react";

export default function LikeButton({
  mediaId,
  initialLikes,
  mediaTitle,
  onLikeChange = () => {},
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

useEffect(() => {
  const userKey = getUserKey();
  let isActive = true;

  async function fetchLikeStatus() {
    try {
      const response = await fetch(
        `/api/likes?mediaId=${mediaId}&userKey=${encodeURIComponent(userKey)}`,
      );

      if (isActive && response.ok) {
        const data = await response.json();
        setIsLiked(data.liked);
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchLikeStatus();

  return () => {
    isActive = false;
  };
}, [mediaId]);

  async function handleLike() {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaId,
          userKey: getUserKey(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error ?? "Unable to update media like");
      }

      const data = await response.json();
      const nextLikes = data.likes;
      const delta = nextLikes - likes;

      setLikes(nextLikes);
      setIsLiked(data.liked);
      onLikeChange(mediaId, delta);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      className="like-button"
      type="button"
      aria-pressed={isLiked}
      aria-label={
        isLiked ? `Retirer votre like de ${mediaTitle}` : `Liker ${mediaTitle}`
      }
      disabled={isPending}
      onClick={handleLike}
    >
      <span>{likes}</span>
      <span aria-hidden="true" className="likes-icon">
        ♥
      </span>
    </button>
  );
}

function getUserKey() {
  let userKey = localStorage.getItem("fisheye_user_key");

  if (!userKey) {
    userKey = crypto.randomUUID();
    localStorage.setItem("fisheye_user_key", userKey);
  }

  return userKey;
}
