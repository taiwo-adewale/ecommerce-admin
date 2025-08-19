import { Metadata } from "next";
import { redirect } from "next/navigation";

import PageTitle from "@/components/shared/PageTitle";
import EditProfileForm from "./_components/EditProfileForm";
import { fetchStaffDetails } from "@/services/staff";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  const profile = await fetchStaffDetails(createServerClient());

  if (!profile) {
    redirect("/login");
  }

  return (
    <section>
      <PageTitle>Edit Profile</PageTitle>

      <EditProfileForm profile={profile} />
    </section>
  );
}
