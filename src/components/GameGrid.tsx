import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { Genre } from "../hooks/useGenre";
// import GameCardContainer from "./GameCardContainer";

interface Props {
  selectedGenre: Genre | null;
}


const GameGrid = ({selectedGenre}: Props ) => {


  // now we will pass this selected genre to useGames hook pass it as query when making request.
  const { data: games, error, isLoading } = useGames(selectedGenre);
  const Skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={3}
        padding={2}
      >
        {isLoading &&
          Skeletons.map((s) => (
            <GameCardSkeleton key={s}></GameCardSkeleton>
            // <GameCardContainer key={s}>
            // </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>

          // <GameCardContainer key={game.id}>
          // </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
