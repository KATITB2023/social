import React from "react";
import { OrganizationPage } from "~/components/showcase/OrganizationPage";
import { useRouter } from "next/router";

export default function BSOInfo() {
  const router = useRouter();
  const organizationId = router.query.bsoId as string;
  return (
    <OrganizationPage type={"BSO"} organizationId={organizationId}/>
  );
}
