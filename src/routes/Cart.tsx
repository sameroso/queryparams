import { useHistory } from "react-router-dom";
import { useQuery } from "../utils/hooks/useQuery";

export default function Cart() {
  const history = useHistory();

  const { getAllParams, addOrReplaceParam } = useQuery();

  console.log(addOrReplaceParam({ key: "jamal", value: "jama&" }));
  const all = getAllParams();
  console.log(all);

  return (
    <>
      <div>Cart</div>
      <button
        onClick={() =>
          history.push({
            pathname: `/`,
            search: "tirulipa=ssadas&",
            hash: "dsadsa",
            key: "samer",
            state: { samer: "kayali" },
          })
        }
      ></button>
    </>
  );
}
