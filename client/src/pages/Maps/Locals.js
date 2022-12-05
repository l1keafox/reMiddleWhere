import React, { useEffect, useState } from "react";
import { QUERY_LOCALES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
function Locals(props) {
  let { loading, data } = useQuery(QUERY_LOCALES, {
    variables: { latitude: props.center.lat, longitude: props.center.lng },
  });
  let [locals, setLocals] = useState([]);

  useEffect(() => {
    if (data && data.getLocalPlaces) {
      data.getLocalPlaces.results.forEach((element) => {
        console.log(element.name);
        console.log(locals);
      });
      setLocals(locals => [...data.getLocalPlaces.results]);
      props.emitLocals(locals => [...data.getLocalPlaces.results]);
    }

  }, [loading]);

  return (
    <div>
      <h1>Locals</h1>
      <div>
      {locals.map((element,index) => {
        return <h2 key = {index}> {element.name}</h2>;
      })}
      </div>
    </div>
  );
}

export default Locals;
