import React from "react";
import { OrganizationPage } from "~/components/showcase/OrganizationPage";
import { useRouter } from "next/router";

export default function PengmasInfo() {
  const router = useRouter();
  const organizationId = router.query.pengmasId as string;
  return (
    <OrganizationPage type={"PENGMAS"} organizationId={organizationId}/>
  );
}
