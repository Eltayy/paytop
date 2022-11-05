import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Client } from "../../types/Client";

interface Props {
  clients: Client[];
}

export const List: FunctionComponent<Props> = ({ clients }) => (
  <div>
    <h1>Client List</h1>
    <Link href="/clients/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>lastName</th>
          <th>firstName</th>
          <th>email</th>
          <th>phoneNumber</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {clients &&
          clients.length !== 0 &&
          clients.map(
            (client) =>
              client["@id"] && (
                <tr key={client["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(client["@id"], "/clients/[id]"),
                        name: client["@id"],
                      }}
                    />
                  </th>
                  <td>{client["lastName"]}</td>
                  <td>{client["firstName"]}</td>
                  <td>{client["email"]}</td>
                  <td>{client["phoneNumber"]}</td>
                  <td>{client["createdAt"]?.toLocaleString()}</td>
                  <td>{client["updatedAt"]?.toLocaleString()}</td>
                  <td>
                    <Link href={getPath(client["@id"], "/clients/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(client["@id"], "/clients/[id]/edit")}>
                      <a>
                        <i className="bi bi-pen" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </a>
                    </Link>
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);
