import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Client } from "../../types/Client";

interface Props {
  client?: Client;
}

interface SaveParams {
  values: Client;
}

interface DeleteParams {
  id: string;
}

const saveClient = async ({ values }: SaveParams) =>
  await fetch<Client>(!values["@id"] ? "/clients" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteClient = async (id: string) =>
  await fetch<Client>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ client }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Client> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveClient(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Client> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteClient(id), {
    onSuccess: () => {
      router.push("/clients");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!client || !client["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: client["@id"] });
  };

  return (
    <div>
      <h1>{client ? `Edit Client ${client["@id"]}` : `Create Client`}</h1>
      <Formik
        initialValues={
          client
            ? {
                ...client,
              }
            : new Client()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/clients");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="client_lastName">
                lastName
              </label>
              <input
                name="lastName"
                id="client_lastName"
                value={values.lastName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.lastName && touched.lastName ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.lastName && touched.lastName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="client_firstName">
                firstName
              </label>
              <input
                name="firstName"
                id="client_firstName"
                value={values.firstName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.firstName && touched.firstName ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.firstName && touched.firstName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="client_email">
                email
              </label>
              <input
                name="email"
                id="client_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.email && touched.email ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.email && touched.email ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="email"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="client_phoneNumber"
              >
                phoneNumber
              </label>
              <input
                name="phoneNumber"
                id="client_phoneNumber"
                value={values.phoneNumber ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.phoneNumber && touched.phoneNumber ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.phoneNumber && touched.phoneNumber ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="phoneNumber"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="client_createdAt">
                createdAt
              </label>
              <input
                name="createdAt"
                id="client_createdAt"
                value={values.createdAt?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.createdAt && touched.createdAt ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.createdAt && touched.createdAt ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="createdAt"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="client_updatedAt">
                updatedAt
              </label>
              <input
                name="updatedAt"
                id="client_updatedAt"
                value={values.updatedAt?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.updatedAt && touched.updatedAt ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.updatedAt && touched.updatedAt ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="updatedAt"
              />
            </div>
            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/clients">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {client && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
