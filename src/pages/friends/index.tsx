import { NextPage } from "next";
import React, { useState, useRef } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import TextInput from "~/components/friends/TextInput";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { IoCloseCircleOutline } from "react-icons/io5";
import SearchedFriends from "~/components/friends/SearchedFriends";
import MenuList from "~/components/friends/MenuList";

const ProfileFriendsPage: NextPage = () => {
  const sessionStatus = useSession();
  const flexRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  if (sessionStatus.status === "unauthenticated") {
    void router.push("/login");
  }

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const cursor = 1 as number;
  const limit = 40 as number;
  const getRequestData = api.friend.friendList.useQuery({
    status: "WAITING_FOR_ACCEPTANCE",
    cursor,
    limit,
  });
  const getFriendData = api.profile.getUserProfile.useQuery();
  const totalFriends = getFriendData.data?.friendCount;
  
  const requestData = getRequestData.data;
  if (!requestData) {
    return <Layout title="Profile Friends"></Layout>;
  }
  if (!sessionStatus) {
    return <Layout title="Profile Friends"></Layout>;
  }
  const totalRequest = requestData.data.length;

  return (
    <Layout title="Friends">
      <BackgroundAndNavbar bg="/profile_bg.png">
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="20px"
          mx="24px"
          my="16px"
          ref={flexRef}
        >
          <Flex flexDirection="row" alignItems="center" gap="20px">
            <TextInput
              placeholder="Add friends with pin!"
              value={searchQuery}
              onChange={handleChange}
            />
            {searchQuery != "" && (
              <IconButton
                aria-label="Search database"
                icon={<IoCloseCircleOutline />}
                bgColor="transparent"
                textColor="white"
                size="sm"
                fontSize="30px"
                onClick={() => setSearchQuery("")}
                display="inline-flex"
                alignItems="center"
              />
            )}
          </Flex>
          {searchQuery == "" && requestData.data ? (
            <MenuList
              totalFriends={totalFriends ? totalFriends : 0}
              totalRequest={totalRequest}
              ref={flexRef}
            />
          ) : (
            <SearchedFriends searchQuery={searchQuery} />
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
};

export default ProfileFriendsPage;
