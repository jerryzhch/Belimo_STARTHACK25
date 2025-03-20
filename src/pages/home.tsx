import React, { useContext, useEffect, useState } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  Block,
  BlockTitle,
  Card,
  CardContent,
} from "framework7-react";
import { FB_DATABASE } from "../components/app";
import { limitToFirst, onValue, query, ref, set } from "firebase/database";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
function createData(hotelname: string, score: number) {
  return { hotelname, score };
}

const chartSetting = {
  yAxis: [
    {
      label: "Eff_Coeff (kJ)",
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
const rows = [];
function calculateAverageForBuildings(data, yearMonth, cities) {
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

      // Add the average to the result object
      acc[city] = average;
      acc["date"] = yearMonth;
    }
    return acc;
  }, {});

  // Return the result as an array containing the dataset object
  return result;
}
const HomePage = () => {
  const db = useContext(FB_DATABASE);
  const hotelNamesRef = query(ref(db, "/hotelNames"));
  const hotelScoreRef = ref(db, "/hotelScoreRef");
  const [series, setSeries] = useState<
    { dataKey: string; label: string; score: number }[]
  >([]);
  const [dataset, setDataset] = useState([]);
  const [hotelNames, setHotelNames] = useState([
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
  ]);
  const [deviceIdSortOrder, setDeviceIdSortOrder] = useState([
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
  ]);

  useEffect(() => {
    const dataSet = query(ref(db, "/dataset"), limitToFirst(30));
    onValue(dataSet, (snapshot) => {
      const data = snapshot.val();
      setDeviceIdSortOrder(Object.keys(data));

      const chartDataset = [];
      for (let i = 20190601; i < 20190632; i++) {
        chartDataset.push(
          calculateAverageForBuildings(data, i.toString(), deviceIdSortOrder)
        );
      }

      setDataset(chartDataset);
    });
  }, []);

  useEffect(() => {
    const series: { dataKey: string; label: string; score: number }[] = [];
    if (dataset && dataset.length > 0) {
      const keys = Object.keys(dataset[0]);
      Object.values(keys).map((d, i) => {
        series.push({
          dataKey: d.toString(),
          label: hotelNames[i],
          score: 0,
        });
      });

      series.map((s) => {
        if (s.dataKey === "date") return;
        dataset.map((c) => {
          if (s.score) s.score += c[s.dataKey];
          else s.score = c[s.dataKey];
        });
      });
      setSeries(series);
      set(
        hotelScoreRef,
        series.filter((s) => s.dataKey !== "date")
      );
    }
  }, [dataset, hotelNames]);

  useEffect(() => {
    onValue(hotelNamesRef, (snapshot) => {
      setHotelNames(snapshot.val());
    });
  }, []);
  return (
    <Page name="home" style={{ height: "100%", overflow: "hidden" }}>
      {/* Top Navbar */}
      <Navbar>
        <NavTitle>BelimoWise</NavTitle>
      </Navbar>
      {/* Toolbar */}
      {/* Page content */}
      <Block style={{ height: "92%", overflow: "auto" }}>
        <BlockTitle>Plain table</BlockTitle>
        <Card className="data-table data-table-init">
          <CardContent>
            {series && series.length > 0 && dataset && (
              <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "date" }]}
                series={series}
                {...chartSetting}
              />
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Hotel Name</TableCell>
                    <TableCell align="right">Ranking (June 2019)</TableCell>
                    <TableCell align="right">
                      Absolute Value (June 2019)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {series
                    .sort((a, b) => b.score - a.score)
                    .map((row, i) => (
                      <TableRow
                        key={row.label}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.label}
                        </TableCell>
                        <TableCell align="right">{i + 1}</TableCell>
                        <TableCell align="right">
                          {Math.round(row.score)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Block>
    </Page>
  );
};
export default HomePage;
