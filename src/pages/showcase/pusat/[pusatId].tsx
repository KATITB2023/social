import React from "react";
import { OrganizationPage } from "~/components/showcase/OrganizationPage";
import { useRouter } from "next/router";

export default function PusatInfo() {
  const router = useRouter();
  const organizationId = router.query.pusatId as string;
  return (
    <OrganizationPage type={"PUSAT"} organizationId={organizationId}/>
  );
}
