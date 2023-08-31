import React from "react";
import { OrganizationPage } from "~/components/showcase/OrganizationPage";
import { useRouter } from "next/router";

// Main Function
export default function UKMInfo() {
  const router = useRouter();
  const organizationId = router.query.ukmId as string;
  return (
    <OrganizationPage type={"UKM"} organizationId={organizationId}/>
  );
}
