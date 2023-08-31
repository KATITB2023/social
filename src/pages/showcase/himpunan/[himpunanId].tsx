import React from "react";
import { OrganizationPage } from "~/components/showcase/OrganizationPage";
import { useRouter } from "next/router";

export default function HimpunanInfo() {
  const router = useRouter();
  const organizationId = router.query.himpunanId as string;
  return (
      <OrganizationPage type={"HMJ"} organizationId={organizationId} />
  );
}
