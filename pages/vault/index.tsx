import { NextPageWithLayout } from "next";
import { NextSeo } from "next-seo";
import Layout from "../../components/Layout";
import VaultHome from "../../components/VaultHome";
import { getVaultCategories, VaultCategory } from "../../lib/vault";

interface VaultIndexProps {
  categories: VaultCategory[];
}

const VaultIndex: NextPageWithLayout<VaultIndexProps> = ({ categories }) => {
  return (
    <>
      <NextSeo title="Vault Sections | District Vault" />
      <VaultHome categories={categories} />
    </>
  );
};

VaultIndex.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  return {
    props: {
      categories: getVaultCategories(),
    },
  };
}

export default VaultIndex;
