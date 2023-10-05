import "./Home.css";
import List from "../../components/list/List";
import ListHeader from "../../components/listHeader/ListHeader";
const Home = () => {
  return (
    <div className="home">
      <ListHeader />
      <List />
    </div>
  );
};

export default Home;
