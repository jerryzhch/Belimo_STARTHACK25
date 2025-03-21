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
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  calculateAverageForBuildings,
  chartSetting,
  defaultDeviceIds,
  defaultHotelNames,
  normalize,
} from "../js/utils";

const HomePage = () => {
  const db = useContext(FB_DATABASE);
  const hotelNamesRef = query(ref(db, "/hotelNames"));
  const hotelScoreRef = ref(db, "/hotelScoreRef");

  const [series, setSeries] = useState<
    { dataKey: string; label: string; score: number }[]
  >([]);
  const [chartDataset, setDataset] = useState([]);
  const [hotelNames, setHotelNames] = useState(defaultHotelNames);
  const [deviceIdSortOrder, setDeviceIdSortOrder] = useState(defaultDeviceIds);

  useEffect(() => {
    const dataSet = query(ref(db, "/dataset"), limitToFirst(30));
    onValue(dataSet, (snapshot) => {
      const data = snapshot.val();
      setDeviceIdSortOrder(Object.keys(data));

      const rowDataset = [];
      for (let i = 20190601; i < 20190632; i++) {
        rowDataset.push(
          calculateAverageForBuildings(data, i.toString(), deviceIdSortOrder)
        );
      }
      rowDataset.map((c) => {
        deviceIdSortOrder.map((d) => {
          c[d] = normalize(c[d]);
        });
      });
      setDataset(rowDataset);
    });
  }, []);

  useEffect(() => {
    const series: { dataKey: string; label: string; score: number }[] = [];
    if (chartDataset && chartDataset.length > 0) {
      const keys = Object.keys(chartDataset[0]);
      Object.values(keys).map((d, i) => {
        series.push({
          dataKey: d.toString(),
          label: hotelNames[i],
          score: 0,
        });
      });

      series.map((s) => {
        if (s.dataKey === "date") return;
        chartDataset.map((c) => {
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
  }, [chartDataset, hotelNames]);

  useEffect(() => {
    onValue(hotelNamesRef, (snapshot) => {
      setHotelNames(snapshot.val());
    });
  }, []);
  return (
    <Page name="home" style={{ height: "100%", overflow: "hidden" }}>
      {/* Top Navbar */}
      <Navbar>
        <NavTitle>BelimoWise Dashboard</NavTitle>
      </Navbar>
      {/* Toolbar */}
      {/* Page content */}
      <Block>
        "Check in real-time which hotels are successfully operating sustainably
        and book your stay with confidence. With Belimo IoT devices installed in
        numerous hotels, our product provides live sustainability insights on
        Booking.com, ensuring future guests know which hotels are on track. This
        incentivizes hotels to showcase their climate-friendly efforts while
        giving eco-conscious travelers peace of mind. By monitoring heating and
        cooling processes, Belimo devices offer accurate and transparent
        feedback on sustainable operations."
      </Block>
      <Block style={{ height: "92%", overflow: "auto" }}>
        <Card className="data-table data-table-init">
          <BlockTitle>June 2019 Plot</BlockTitle>
          <CardContent>
            {series && chartDataset && (
              <BarChart
                dataset={chartDataset}
                xAxis={[{ scaleType: "band", dataKey: "date" }]}
                series={series}
                slotProps={{
                  legend: {
                    labelStyle: {
                      fontSize: 10,
                    },
                  },
                }}
                {...chartSetting}
              />
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Hotel Name</TableCell>
                    <TableCell align="right">Ranking</TableCell>
                    <TableCell align="right">Energy Eff_Coef</TableCell>
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
