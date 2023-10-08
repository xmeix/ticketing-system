import "./Home.css";
import List from "../../components/list/List";
import ListHeader from "../../components/listHeader/ListHeader";
import { Toaster } from "react-hot-toast";
const Home = () => {
  return (
    <div className="home">
      <ListHeader />
      <List />
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

    </div>
  );
};

export default Home;
