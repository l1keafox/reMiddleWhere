import React, { PureComponent, useEffect } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const MapsPage = function (props) {
  let groupId = props.groupId;
  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });
  console.log("MAP?",data,groupId);
  useEffect(() => {
    if (data && data.me) {
      console.log(data, "Map pages");
    }
  }, [data]);

  return (loading? <div> Loading </div> :
    <div>
      MapsPage
      <h2> GROUP NAME: {data && data.group ? data.group.name : "balh"}</h2>
      {/* {data.group.users.map( (e) => (
        <div> {e.name} </div>
      ) )} */}
    </div>
  );
};

export default MapsPage;
