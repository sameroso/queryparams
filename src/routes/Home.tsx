import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  console.log(history);
  return <div>Home</div>;
}
