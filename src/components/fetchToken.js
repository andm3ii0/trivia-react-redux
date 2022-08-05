const fetchToken = async () => {
  const require = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = require.json();
  return token;
};

export default fetchToken;
