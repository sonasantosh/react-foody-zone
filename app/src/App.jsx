import { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchResult } from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBtn, setSelectedBtn] = useState("all");

  const buttonData = ["All", "Breakfast", "Lunch", "Dinner"];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const jsonData = await response.json();
        setData(jsonData);
        setFilterData(jsonData);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch the data!");
      }
    };
    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) =>{

    if(type=== 'all'){
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    
    
    );
    setFilterData(filter);
    setSelectedBtn(type);
  }

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <h1>FoodyZone</h1>
          </div>
          <div className="searchBox">
            <input
              type="text"
              name="Search"
              id="searchBox"
              placeholder="Search Food!"
              onChange={searchFood}
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {buttonData.map((buttonName) => (
            <Button 
            isSelected={selectedBtn === buttonName.toLowerCase()}
            onClick={()=>filterFood(buttonName.toLowerCase())}
            key={buttonName}>{buttonName}</Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1280px;
  padding: 0 0.75rem;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  background-color: #323334;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .searchBox {
    input {
      background-color: transparent;
      border: 1px solid orange;
      color: #fff;
      height: 40px;
      font-size: 1rem;
      padding: 0 0.5rem;
      border-radius: 0.25rem;
      &::placeholder{
        color: #fff;
      }
    }
  }

  @media (0< width < 767px){
    flex-direction: column;
    gap: 1rem;
  }

`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: ${({isSelected})=> (isSelected ? "#fff":"#ff4343;")};
  color: ${({isSelected})=> (isSelected ? "#ff4343":"#fff;")};
  border: 1px solid ${({isSelected})=> (isSelected ? "#fff":"#ff4343;")};
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #ff4343;
    border: 1px solid #fff;
  }
  &.active {
    background-color: #fff;
    color: #ff4343;
    border: 1px solid #fff;
  }
`;
