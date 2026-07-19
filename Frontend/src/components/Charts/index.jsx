import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";


function Charts({ dashboard }) {

  return (
    <>


      {/* Revenue By Month */}

      <LineChart
        dataset={dashboard?.revenueByMonth || []}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        series={[
          {
            dataKey: "revenue",
            label: "Revenue",
          },
        ]}
        height={300}
      />



      {/* Sales Overview */}

      <BarChart
        dataset={dashboard?.salesOverview || []}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        series={[
          {
            dataKey: "sold",
            label: "Products Sold",
          },
        ]}
        height={300}
      />



      {/* Best Selling Products */}

      <BarChart
        dataset={dashboard?.bestSellingProducts || []}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "title",
          },
        ]}
        series={[
          {
            dataKey: "sold",
            label: "Sold",
          },
        ]}
        layout="horizontal"
        height={400}
      />


    </>
  );
}


export default Charts;