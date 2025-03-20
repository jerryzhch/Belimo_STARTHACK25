import React, { useContext, useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
} from 'framework7-react';
import { FB_DATABASE } from '../components/app';
import { limitToFirst, onValue, query, ref } from 'firebase/database';

const HomePage = () => { 
  const db = useContext(FB_DATABASE);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataSet = query(ref(db, 'energyvalve3-1-11'), limitToFirst(100));
    onValue(dataSet, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  },[])

  return (
  <Page name="home" style={{height: "100%", overflow: 'hidden'}}>
    {/* Top Navbar */}
    <Navbar>
      <NavTitle>BelimoWise</NavTitle>
    </Navbar>
    {/* Toolbar */}
    {/* Page content */}
    <Block >
    <BlockTitle>Plain table</BlockTitle>
    <Card className="data-table data-table-init">
      <CardContent padding={false}>
      <table style={{height: "92%", overflow: "auto"}}>
        <thead>
          <tr>
          {data &&
            data[0] &&
            Object.keys(data[0]).map((d) => {
              const isNumber = typeof data[0][d] === "number";
              return (
                <th className={(isNumber ? "numeric-cell" : "label-cell")} key={d}>
                  {d}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
          data.map((d, index) => (
            <tr key={index}>
              {Object.values(d).map((dd, i) => {
                const isNumber = typeof dd === "number";
                return (
                  <td className={(isNumber ? "numeric-cell" : "label-cell")}  key={i}>
                    {dd}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </CardContent>
      </Card>
    </Block>
  </Page>
)
};
export default HomePage;