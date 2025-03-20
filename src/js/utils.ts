import { axisClasses } from "@mui/x-charts/ChartsAxis";

let highestNumber = 0;
export const normalize = (val) => 100* (val) / (highestNumber);

export function calculateAverageForBuildings(data, yearMonth, cities) {
  // Initialize an empty object to store the results for each city
  const result = cities.reduce((acc, city) => {
    // Filter data for the specific city and yearMonth
    if (data[city]) {
      const cityData = data[city].filter(
        (item) => String(item.year_month_day) === yearMonth
      );
      // Sum up "cool-coeff" and "heat-coeff" for the filtered data
      const totalSum = cityData.reduce(
        (sum, item) =>
          sum + (item["cool-coeff"] || 0) + (item["heat-coeff"] || 0),
        0
      );

      // Calculate the average
      const average = cityData?.length > 0 ? totalSum / cityData.length : 0;
      if (highestNumber < average) highestNumber = average;

      // Add the average to the result object
      acc[city] = average;
      acc["date"] = yearMonth.substring(6);
    }
    return acc;
  }, {});

  // Return the result as an array containing the dataset object
  return result;
}

export const chartSetting = {
  yAxis: [
    {
      label: "Energy Eff_Coeff ",
    },
  ],
  width: 1400,
  height: 600,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 30px)",
    },
  },

};

export const defaultHotelNames = [
  "Radisson Blu Hotel, St. Gallen",
  "Hotel Elite",
  "Hotel Dom",
  "Hotel one66",
  "Hotel Vadian Garni",
  "Hotel Eastside",
  "Sorell Hotel City Weissenstein",
  "Einstein St. Gallen",
  "Hotel am Spisertor",
  "Hotel Walhalla",
  "Hotel Metropol",
  "Boutique City Hotel Gallo",
  "Militärkantine St. Gallen",
  "Newstar Hotel",
  "Hotel Restaurant Falkenburg",
  "Hotel Garni Rössli",
  "Oberwaid - Das Hotel",
  "Hotel Weisses Kreuz",
  "Hotel Restaurant Schiff",
  "TouchBed City Apartments St. Gallen",
];

export const defaultDeviceIds = [
  "14e5bc06-9e32-4938-96df-82a070581e7d",
  "15cbf304-2834-4523-81d1-45c0bbc0f849",
  "1528aa2a-dcc8-49e7-9ae1-beff231f4564",
  "15d95108-5243-4976-9c14-7538fd745aab",
  "1567032c-3461-4542-9aa9-fd36dc381c4e",
  "15d26fdd-a798-4cb3-b4c4-8bb3f814dcaa",
  "a42e0599-f18f-435e-ad97-7131277f42e9",
  "a3760aa4-3e7e-4e66-8bac-795dcc40a538",
  "a4320fab-41b4-4c33-9cf2-8180e77ab060",
  "c421b7d1-617c-46cb-9463-e0920c2c7c18",
  "c5b48b21-9007-4bb5-8968-ba15a69a7900",
  "c5ca3fc9-bf93-4de1-ac0c-853e8043c5ba",
];
export function formatString(str) {
    return ""+str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6);
}