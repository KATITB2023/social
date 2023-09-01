import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { ViewCard } from "../showcase/ViewCard";

interface SearchedUnitProps {
  searchQuery: string;
  group?: string;
  lembaga: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
}
const SearchedUnit = ({ searchQuery, group, lembaga }: SearchedUnitProps) => {
  const [debouncedFilter, setDebouncedFilter] = useState(searchQuery);
  const { data, isFetching } = api.showcase.getAllUnits.useQuery({
    searchValue: debouncedFilter,
    lembaga: lembaga,
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
      ) : data?.length === 0 ? (
        <Text align={"center"}>Tidak ada hasil yang sesuai ...</Text>
      ) : (
        data?.map((each) => {
          const route =
            lembaga === "UKM"
              ? `${group ? group : ""}/${each.userId}`
              : lembaga === "BSO"
              ? `bso/${each.userId}`
              : `${each.name}`;
          return (
            <ViewCard
              key={each.name}
              width={"full"}
              title={each.name}
              image={each.image ?? ""}
              route={route}
            />
          );
        })
      )}
    </>
  );
};

export default SearchedUnit;
