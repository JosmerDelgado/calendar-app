const baseURL = "https://getfestivo.com/v1";
const holidaysEnpoint = "/holidays";

const urlGenerator = url => endpoint => url + endpoint;

const urlAndQueryParamsHolydays = myUrl => (country, year, month) =>
  myUrl +
  `?api_key=${process.env.REACT_APP_API_KEY}&country=${country}&year=${year}&month=${month}`;

const mainURL = urlGenerator(baseURL);

const holidaysURL = urlAndQueryParamsHolydays(mainURL(holidaysEnpoint));

export const fetchHolidays = async (country, year, month) => {
  try {
    const response = await fetch(holidaysURL(country, year, month));
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getHolidaysFrom = response =>
  response ? response.holidays.holidays : [];
