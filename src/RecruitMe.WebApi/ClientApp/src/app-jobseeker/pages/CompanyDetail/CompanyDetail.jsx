import {useParams} from "react-router";

const CompanyDetail = () => {
  const {id} = useParams();

  return (
    <div>
      <h1>Avepoint</h1>
      <p>hello hello</p>
    </div>
  );
};
