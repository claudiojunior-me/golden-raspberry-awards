import {
  fetchYearsWithMultipleWinners,
  fetchStudiosWithMostWins,
  fetchProducersIntervals,
  fetchWinnersByYear,
  fetchMovies
} from './fetchData';

describe('fetchData', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchYearsWithMultipleWinners', () => {
    it('fetchYearsWithMultipleWinners should fetch data correctly', async () => {
      const mockData = { years: [1980, 1985] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchYearsWithMultipleWinners();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}?projection=years-with-multiple-winners`
      );
      expect(result).toEqual(mockData.years);
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
      await expect(fetchYearsWithMultipleWinners()).rejects.toThrow('API Error');
    });

    it('should handle empty years array', async () => {
      const mockData = { years: [] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchYearsWithMultipleWinners();
      expect(result).toEqual([]);
    });
  });

  describe('fetchStudiosWithMostWins', () => {
    it('fetchStudiosWithMostWins should fetch data correctly', async () => {
      const mockData = { studios: ['Studio A', 'Studio B'] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchStudiosWithMostWins();
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}?projection=studios-with-win-count`);
      expect(result).toEqual(mockData.studios);
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
      await expect(fetchStudiosWithMostWins()).rejects.toThrow('API Error');
    });

    it('should handle empty studios array', async () => {
      const mockData = { studios: [] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchStudiosWithMostWins();
      expect(result).toEqual([]);
    });

    it('should handle malformed response data', async () => {
      const mockData = { invalid: [] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchStudiosWithMostWins();
      expect(result).toEqual([]);
    });
  });

  it('fetchProducersIntervals should fetch data correctly', async () => {
    const mockData = { producers: [] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await fetchProducersIntervals();
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}?projection=max-min-win-interval-for-producers`);
    expect(result).toEqual(mockData);
  });

  it('fetchWinnersByYear should fetch data correctly', async () => {
    const year = '1980';
    const mockData = { winners: [] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await fetchWinnersByYear(year);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}?winner=true&year=${year}`);
    expect(result).toEqual(mockData);
  });

  describe('fetchMovies', () => {
    it('should fetch movies with all parameters', async () => {
      const mockData = { content: [], totalPages: 5 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchMovies('1980', 1, true);

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}?year=1980&winner=true&page=1&size=10`
      );
      expect(result).toEqual(mockData);
    });

    it('should fetch movies without winner parameter', async () => {
      const mockData = { content: [], totalPages: 5 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchMovies('1980', 1);

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}?year=1980&page=1&size=10`
      );
      expect(result).toEqual(mockData);
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchMovies('1980', 1, true)).rejects.toThrow('API Error');
    });
  });
});