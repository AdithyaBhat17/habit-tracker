const graphql = String.raw;

export const HABITS_QUERY = graphql`
  query HABITS_QUERY {
    habits {
      data {
        _id
        title
        currentSreak
        longestStreak
      }
    }
  }
`;
