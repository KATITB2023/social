import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { Lembaga, type UnitProfile } from "@prisma/client";
import { ViewCard } from "~/components/showcase/ViewCard";

interface SearchedHistoryProps {
  searchQuery: string;
  lembaga?: Lembaga;
}

const SearchedHistory = ({ searchQuery, lembaga }: SearchedHistoryProps) => {
  const [debouncedFilter, setDebouncedFilter] = useState(searchQuery);
  const { data, isFetching } = api.showcase.getAllVisitedUnits.useQuery({
    searchValue: debouncedFilter,
    lembaga: lembaga,
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
        data?.map((each: UnitProfile) => {
          let route = "";
          if (lembaga === Lembaga.UKM) {
            route = `/showcase/ukm/${each.group ? each.group : ""}/${
              each.userId
            }`;
          } else if (lembaga === Lembaga.HMJ) {
            route = `/showcase/himpunan/${each.userId}`;
          } else {
            route = `/showcase/${lembaga ? lembaga.toLowerCase() : ""}/${
              each.userId
            }`;
          }

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

export default SearchedHistory;
