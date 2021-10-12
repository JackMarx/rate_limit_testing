import { GraphQLClient, gql } from 'graphql-request';

const my_token = "<my token>"
const endpoint = 'https://local.cj.com:3005/graphql'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${my_token}`,
  },
})

const checkCiqAccount = async (account) => {
  const query = gql`
    {
      socialAccount(
        socialPlatform: FACEBOOK, 
        socialAccount: "${account}"
      ) {
      id
      }
    }
  `

  // const query = gql`
  //   query {
  //     promotionalProperty(id: "100488904") {
  //       id
  //       name
  //       status
  //     }
  //   }
  // `

  return graphQLClient.request(query)
}

const accounts = [
  "https://www.facebook.com/madonna",       // 1
  "https://www.facebook.com/paulmccartney", // 2
  "https://www.facebook.com/beounce",       // 3
  "https://www.facebook.com/oprah",         // 4
  "https://www.facebook.com/matrix",        // 5
  "https://www.facebook.com/bennye",        // 6
  "https://www.facebook.com/groucho",       // 7
  "https://www.facebook.com/harpo",         // 8
  "https://www.facebook.com/chico",         // 9
  "https://www.facebook.com/zeppo",         // 10
  "https://www.facebook.com/gummo",         // 11
];

const startTime = Date.now();

const main = async () => {
  const responses = await Promise.all(accounts.map(account => {
    return checkCiqAccount(account)
    .then(response => response)
    .catch(error => error)
  }));
  const stringyResponses = responses.map(data => JSON.stringify(data, undefined, 2))
  console.log(stringyResponses);
  const endTime = Date.now();
  console.log({startTime, endTime, difference: (endTime - startTime) / 1000});
};

main();
