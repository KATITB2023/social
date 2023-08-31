import React,{useState,useEffect} from 'react'
import { Text, Wrap } from '@chakra-ui/react'
import { ViewCard } from "../showcase/ViewCard";
import { api } from '~/utils/api';
interface SearchedHMJProps {
    searchQuery: string
}

const SearchedHMJ = ({
    searchQuery,
}: SearchedHMJProps) => {
    const [debouncedFilter, setDebouncedFilter] = useState(searchQuery);
    const { data, isFetching } = api.showcase.getAllUnits.useQuery({
        lembaga: 'HMJ',
        searchValue: debouncedFilter
    })
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedFilter(searchQuery);
        }, 500);
        return () => {
          clearTimeout(handler);
        };
      }, [searchQuery]);
  return (
    <Wrap
          justify={"space-evenly"}
          w={"full"}
          maxH={"700px"}
          overflow={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "5px",
            },
            "::-webkit-scrollbar-track": {
              display: "none",
              background: "rgb(68,70,84)",
            },
            "::-webkit-scrollbar-thumb": {
              background: "rgba(217,217,227,.8)",
              borderRadius: "full",
            },
          }}
        >
          {
          isFetching ? <Text align={"center"}>Loading ...</Text> :  
          data?.map((each) => {
            return (
              <ViewCard
                key={each.name}
                width={"full"}
                title={each.name}
                image={each.image ?? ''}
                route={`/showcase/himpunan/${each.userId}`}
              />
            );
          })}
        </Wrap>
  )
}

export default SearchedHMJ