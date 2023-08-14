import { NextPage } from "next";
import React, { useEffect,useState,useRef } from "react";
import {  Flex, IconButton,} from "@chakra-ui/react";
import TextInput from "~/components/friends/TextInput";
import Menu from "~/components/friends/Menu";
import Friends from "~/components/friends/Friends";
import Request from "~/components/friends/Request";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import BackgroundAndNavigationBar from "~/components/profile/BackgroundAndNavigationBar";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { IoCloseCircleOutline } from "react-icons/io5";
import { SearchedFriends } from "~/components/friends/SearchedFriends";


const MenuList = (param:{
  totalRequest:number
  ref: React.MutableRefObject<HTMLDivElement | null>
}) => {
  const params = useSearchParams()
  const [state, setState] = useState<string>(params.get('status') ?? 'my-friends')
  useEffect (() => {
    setState(params.get('status') ?? 'my-friends')
}, [params])
  return (
    <>
      <Flex flexDirection="row" justifyContent="center" alignItems='center' gap="40px">
      <Menu isActive={state=='my-friends'} onClick={()=>{setState('my-friends')}}>
        <Link href='?status=my-friends' >My Friends</Link>
      </Menu>
      <Menu waiting={param.totalRequest} isActive={state=='request'} onClick={()=>{setState('request')}}>
        <Link href='?status=request' >Request</Link>
      </Menu>
    </Flex>
    {
        state === 'my-friends' ? (
            <Friends/>
        ) : (
            <Request flexRef={param.ref}/>
        )
    }
    </>
  )
}

const ProfileFriendsPage: NextPage = () => {
  const sessionStatus = useSession();
  const flexRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  if (sessionStatus.status === "unauthenticated") {
    void router.push("/login");
  }

  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const cursor = 1 as number;
  const limit = 40 as number;
  const getRequestData = api.friend.friendList.useQuery({
    status:'WAITING_FOR_ACCEPTANCE',
    cursor,
    limit
  })

  const requestData = getRequestData.data;
  if (!requestData) {
    return <Layout title="Profile Friends"></Layout>;
  }
  if (!sessionStatus) {
    return <Layout title="Profile Friends"></Layout>;
  }
  const totalRequest = requestData.data.length;

  return (
    <BackgroundAndNavigationBar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="20px"
        mx="24px"
        my="16px"
        ref={flexRef}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          gap="20px"
        >
          <TextInput placeholder="search friend" value={searchQuery} onChange={handleChange}/> 
          {
            searchQuery != '' && (
              <IconButton
              aria-label="Search database"
              icon={<IoCloseCircleOutline  />}
              bgColor="transparent"
              textColor="white"
              size="sm"
              fontSize='30px'
              onClick={() => setSearchQuery('')}
              display="inline-flex" 
              alignItems="center"
            />

            )
          }  
        </Flex>
        {
          searchQuery == '' ? (
            <MenuList totalRequest={totalRequest} ref={flexRef}/>
          ) : (
            <SearchedFriends searchQuery={searchQuery} />
          )
        }
      </Flex>
    </BackgroundAndNavigationBar>
  );
};

export default ProfileFriendsPage;
