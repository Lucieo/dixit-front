import gql from 'graphql-tag';

export const GAME_UPDATE = gql`
subscription GameUpdate($gameId:ID!){
    gameUpdate(gameId:$gameId){
      status
      creator
      turn
      players{
        id
        name
        icon
      }
    }
  }
`

export const PLAYER_UPDATE_SUBSCRIPTION = gql`
subscription PlayerUpdate($gameId: ID!) {
  playerUpdate(gameId:$gameId){
      players{
          id
          name
          icon
      }
      creator
  }
}
`;

export const TIME_TO_SUBMIT = gql`
  subscription TimeToSubmit($gameId: ID!){
    timeToSubmit(gameId:$gameId){
      id
    }
  }
`;