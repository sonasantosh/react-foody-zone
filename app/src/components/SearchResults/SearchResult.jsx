import styled from "styled-components";
import { BASE_URL, Button, Container } from "../../App";

export const SearchResult = ({ data }) => {
  return (
    <div>
      <FoodCardContainer>
        <Container>
          <FoodCards>
            {data?.map(({ image, name, price, text, type }) => (
              <FoodCard key={name} data-type={type}>
                <figure className="food_image">
                  <img src={BASE_URL + image} alt={name} />
                </figure>
                <CardDescription>
                  <h2>{name}</h2>
                  <p>{text}</p>
                  <Button>${price.toFixed(2)}</Button>
                </CardDescription>
              </FoodCard>
            ))}
          </FoodCards>
        </Container>
      </FoodCardContainer>
    </div>
  );
};

const FoodCardContainer = styled.section`
  background-image: url(./images/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 0;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const FoodCard = styled.div`
  width: 350px;
  max-width: 100%;
  min-width: calc(50% - 0.5rem);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  img{
    width: 100px;
    height: auto;
  }
`;
const CardDescription = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  h2 {
    font-size: 1.5rem;
    line-height: 1.25;
    font-weight: 500;
  }
  p {
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 400;
  }
`;
