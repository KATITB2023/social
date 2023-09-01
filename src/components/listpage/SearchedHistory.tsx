import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { ViewCard } from "../showcase/ViewCard";
import { UnitProfile } from "@prisma/client";

interface SearchedHistoryProps {
  searchQuery: string;
  lembaga: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
}
const SearchedHistory = ({
  searchQuery,
  lembaga,
}: SearchedHistoryProps) => {
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
        data?.map((each : UnitProfile) => {
          let route = "";
          if (lembaga === "UKM") {
            route = `/showcase/ukm/${each.group ? each.group : ""}/${each.userId}`;
          } else if (lembaga === "HMJ") {
            route = `/showcase/himpunan/${each.userId}`;
          } else {
            route = `/showcase/${lembaga? lembaga.toLowerCase() : ""}/${each.userId}`;
          }
          console.log(route, "INI ROUTE");
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
