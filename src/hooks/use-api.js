import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.GATSBY_AUTH0_AUDIENCE,
        });

        const headers = {
          "content-type": "application/json",
          "x-hasura-role": "user",
          Authorization: `Bearer ${accessToken}`,
        };

        const query = `
          query {
            users2 {
              id
              display_name
            }
          }
        `;

        fetch(process.env.GATSBY_HASURA_API_URL, {
          headers,
          body: JSON.stringify({ query }),
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));

        setState({
          ...state,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, []);

  return state;
};
