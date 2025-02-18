"use client";

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";

import fetchContents from "@/app/_components/FetchContents";
import fetchUsers from "@/app/_components/FetchUsers";
import fetchTags from "@/app/_components/FetchTags";

type RawApiTagResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type RawApiUserResponse = {
  id: string;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
};

type RawApiContentResponse = {
  id: string;
  title: string;
  text: string;
  coverImageURL: string;
  createdAt: string;
  updatedAt: string;
  users: RawApiUserResponse[];
  tags: RawApiTagResponse[];
};

type SelectableTag = {
  id: string;
  name: string;
};

const Page: React.FC = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Content, setContent] = useState<RawApiContentResponse | null>(null);
  const [users, setUsers] = useState<RawApiUserResponse[] | null>(null);
  const [tags, setTags] = useState<SelectableTag[] | null>(null);

  useEffect(() => {
    fetchContents(setContent, setFetchError, setIsLoading);
    fetchUsers(setUsers, setFetchError, setIsLoading);
    fetchTags(setTags, setFetchError, setIsLoading);
  }, []);

  console.log(users);
  return <></>;
};

export default Page;
