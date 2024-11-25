const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = process.env.NEXT_PUBLIC_PAGE_SIZE || '10';

export const fetchYearsWithMultipleWinners = async () => {
  const res = await fetch(`${API_URL}?projection=years-with-multiple-winners`);
  const data = await res.json();
  return data.years || [];
};

export const fetchStudiosWithMostWins = async () => {
  const res = await fetch(`${API_URL}?projection=studios-with-win-count`);
  const data = await res.json();
  return data.studios || [];
};

export const fetchProducersIntervals = async () => {
  const res = await fetch(`${API_URL}?projection=max-min-win-interval-for-producers`);
  const data = await res.json();
  return data;
};

export const fetchWinnersByYear = async (year: string) => {
  const res = await fetch(`${API_URL}?winner=true&year=${year}`);
  return await res.json();
};

export const fetchMovies = async (year: string, page: number, winner?: boolean|null) => {
  const queryParams = new URLSearchParams();

  if (year) {
    queryParams.append('year', year);
  }

  // verify if winner is a boolean
  if (winner === true || winner === false) {
    queryParams.append('winner', String(winner));
  }
  
  queryParams.append('page', String(page));
  queryParams.append('size', PAGE_SIZE);

  const response = await fetch(`${API_URL}?${queryParams.toString()}`);
  const data = await response.json();
  return data;
};
