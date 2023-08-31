import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { ViewCard } from "../showcase/ViewCard";

interface SearchedUnitProps {
  searchQuery: string;
  group: string;
}
const SearchedUnit = ({ searchQuery, group }: SearchedUnitProps) => {
  const [debouncedFilter, setDebouncedFilter] = useState(searchQuery);
  const { data, isFetching } = api.showcase.getAllUnits.useQuery({
    searchValue: debouncedFilter,
    lembaga: "UKM",
    group: group,
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  return (
    <>
      {isFetching ? (
        <Text align={"center"}>Loading ...</Text>
      ) : (
        data?.map((each) => {
          return (
            <ViewCard
              key={each.name}
              width={"full"}
              title={each.name}
              image={each.image ?? ""}
              route={`/showcase/himpunan/${each.userId}`}
            />
          );
        })
      )}
    </>
  );
};

export default SearchedUnit;
