import { NextPageWithLayout } from "next";
import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import VaultHome from "../components/VaultHome";
import { getVaultCategories, VaultCategory } from "../lib/vault";

interface HomeProps {
  categories: VaultCategory[];
}

const Home: NextPageWithLayout<HomeProps> = ({ categories }) => {
  return (
    <>
      <NextSeo
        title="District Vault"
        description="A personal vault for reading, podcasts, videos, AI, design inspiration, motion, visuals, and more."
      />
      <VaultHome categories={categories} />
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  return {
    props: {
      categories: getVaultCategories(),
    },
  };
}

export default Home;
