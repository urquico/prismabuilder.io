import Link from "next/link";
import Links from "./Links";
import toast from "react-hot-toast";
import { Button, Separator, Card } from "@prisma/lens";
import { Layers } from "react-feather";
import { Schema } from "../lib/types";
import { useRouter } from "next/dist/client/router";
import { useSchemaContext } from "../lib/context";

export default function Schemas() {
  const { schemas, setSchemas } = useSchemaContext();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col border flex-1 max-w-sm h-screen overflow-y-auto p-4 space-y-3 bg-gray-100">
        <div className="flex flex-col space-y-3 flex-1">
          {schemas.map((schema: Schema) => {
            return (
              <Link href={`/schemas/${schema.name}`} key={schema.name}>
                <a className="border border-transparent hover:border-blue-500 focus:border-blue-500 transition rounded-lg">
                  <Card className="flex items-center space-x-3">
                    <Layers size={20} className="text-gray-500" />
                    <h3>{schema.name}</h3>
                  </Card>
                </a>
              </Link>
            );
          })}

          {schemas.length ? <Separator /> : null}

          <Button
            onPress={() => {
              if (
                schemas.some((schema: Schema) => schema.name === "New schema")
              ) {
                toast.error("A schema called New schema exists");
              } else {
                const newSchema: Schema = {
                  database: "postgresql",
                  name: "New schema",
                  models: [],
                  enums: [],
                };
                setSchemas([...schemas, newSchema]);
                router.push(`/schemas/${newSchema.name}`);
              }
            }}
            variant="secondary"
          >
            New schema
          </Button>
        </div>

        <Links />
      </div>
    </>
  );
}