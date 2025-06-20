import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import EditProfileForm from "./_components/EditProfileForm";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  return (
    <section>
      <PageTitle>Edit Profile</PageTitle>

      <EditProfileForm />
    </section>
  );
}
