import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { fetch, getPath } from "../../utils/dataAccess";
import { Client } from "../../types/Client";

interface Props {
  client: Client;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ client, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!client["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(client["@id"], { method: "DELETE" });
      router.push("/clients");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Client ${client["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Client ${client["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">lastName</th>
            <td>{client["lastName"]}</td>
          </tr>
          <tr>
            <th scope="row">firstName</th>
            <td>{client["firstName"]}</td>
          </tr>
          <tr>
            <th scope="row">email</th>
            <td>{client["email"]}</td>
          </tr>
          <tr>
            <th scope="row">phoneNumber</th>
            <td>{client["phoneNumber"]}</td>
          </tr>
          <tr>
            <th scope="row">createdAt</th>
            <td>{client["createdAt"]?.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/clients">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(client["@id"], "/clients/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
