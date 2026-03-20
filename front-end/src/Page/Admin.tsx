import { Card, Col, Layout, Row } from "antd";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { PagepathAPI } from "../Router/Path";

const { Content } = Layout;

const COLORS = ["#1890ff", "#ff4d4f", "#82ca9d", "#ffc658"];

// ---------------- TYPES ----------------
interface DiseaseFrequency {
  disease: string;
  count: number;
}

interface GenderStats {
  male: number;
  female: number;
}
type DiseaseBarData = {
  disease: string;
  [key: string]: string | number;
};
interface ModelStats {
  model: string;
  count: number;
  prediction: Record<string, number>;
}

interface DashboardStats {
  total_users: number;
  avg_age: number;
  total_scans: number;
  gender: GenderStats;
  disease_frequency: DiseaseFrequency[];
  model_distribution?: ModelStats[]; // ✅ optional กันพัง
}

// ---------------- COMPONENT ----------------
const Admin = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const getDashboard = async (): Promise<void> => {
    try {
      const res = await fetch(PagepathAPI.Adminuserchart);
      const data: DashboardStats = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Fetch dashboard error:", error);
    }
  };

  useEffect(() => {
    const runfun = () => {
      getDashboard();
    };
    runfun();
  }, []);

  if (!stats) return <div>Loading...</div>;

  // ---------------- DATA ----------------
  const genderData = [
    { name: "Male", value: stats.gender.male },
    { name: "Female", value: stats.gender.female },
  ];

  // ✅ กันพังกรณี backend ยังไม่ส่ง
  const modelData = (stats.model_distribution || []).map((item) => ({
    name: item.model,
    value: item.count,
  }));

  const diseaseMap: Record<string, DiseaseBarData> = {};

  (stats.model_distribution || []).forEach((modelItem) => {
    const modelName = modelItem.model;

    Object.entries(modelItem.prediction || {}).forEach(([disease, count]) => {
      if (!diseaseMap[disease]) {
        diseaseMap[disease] = { disease };
      }

      diseaseMap[disease][modelName] = count;
    });
  });

  const barData: DiseaseBarData[] = Object.values(diseaseMap);
  return (
    <Layout>
      <Content style={{ margin: 16, background: "#f5f5f5", padding: 16 }}>
        {/* ----------- STATS ----------- */}
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Users">{stats.total_users}</Card>
          </Col>

          <Col span={8}>
            <Card title="Average Age">{stats.avg_age}</Card>
          </Col>

          <Col span={8}>
            <Card title="Total Scans">{stats.total_scans}</Card>
          </Col>
        </Row>

        <br />

        {/* ----------- CHARTS ----------- */}
        <Row gutter={16}>
          {/* Gender */}
          <Col span={8}>
            <Card title="Gender Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={genderData} dataKey="value" outerRadius={80}>
                    {genderData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Model */}
          <Col span={8}>
            <Card title="Model Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={modelData} dataKey="value" outerRadius={80}>
                    {modelData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Disease */}
          <Col span={8}>
            <Card title="Disease Frequency">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.disease_frequency}>
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <br />

        {/* ----------- EXTRA ----------- */}
        <Row gutter={16}>
          {/* Model Frequency */}
          <Col span={24}>
            <Card title="Model Frequency">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />

                  {(stats.model_distribution || []).map((m, i) => (
                    <Bar
                      key={m.model}
                      dataKey={m.model}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Admin;
