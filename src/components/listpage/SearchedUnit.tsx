import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Lembaga } from "@prisma/client";
import { ViewCard } from "~/components/showcase/ViewCard";
import { api } from "~/utils/api";

interface SearchedUnitProps {
  searchQuery: string;
  group?: string;
  lembaga?: Lembaga;
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
        <Text align="center">Loading ...</Text>
      ) : data?.length === 0 ? (
        <Text align="center">Tidak ada hasil yang sesuai ...</Text>
      ) : (
        data?.map((each) => {
          const route =
            lembaga === Lembaga.UKM
              ? `${group ?? ""}/${each.userId}`
              : lembaga === Lembaga.BSO
              ? `bso/${each.userId}`
              : lembaga === Lembaga.PUSAT
              ? `pusat/${each.userId}`
              : lembaga === Lembaga.PENGMAS
              ? `pengmas/${each.userId}`
              : each.name;
          return (
            <ViewCard
              key={each.name}
              width="full"
              title={each.name}
              image={each.image}
              route={route}
            />
          );
        })
      )}
    </>
  );
};

export default SearchedUnit;
