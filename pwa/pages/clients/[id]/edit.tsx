import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Form } from "../../../components/client/Form";
import { PagedCollection } from "../../../types/collection";
import { Client } from "../../../types/Client";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getClient = async (id: string | string[] | undefined) =>
  id ? await fetch<Client>(`/clients/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: client } = {} } = useQuery<
    FetchResponse<Client> | undefined
  >(["client", id], () => getClient(id));

  if (!client) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{client && `Edit Client ${client["@id"]}`}</title>
        </Head>
      </div>
      <Form client={client} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["client", id], () => getClient(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Client>>("/clients");
  const paths = await getPaths(response, "clients", "/clients/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
