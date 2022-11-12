import React from "react";
import {  useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/api";
import NotFound from "./NotFound";

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setIsLoading(false);
    })
  }, [id]);

          if (isLoading) {
            return <p>Loading...</p>;
          }

          if (note === null) {
            return (
              <div>
                <NotFound />;
              </div>
            )
          }

          return (
            <div>
              <NoteDetail {...note}/>
            </div>
          ) 
}

export default DetailPage;
