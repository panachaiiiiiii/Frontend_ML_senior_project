import { Card, Col, Layout, Row, Table } from "antd";

const { Content } = Layout;

const columns = [
  { title: "Disease", dataIndex: "disease" },
  { title: "Count", dataIndex: "count" },
];

const data = [
  { key: 1, disease: "Eczema", count: 12 },
  { key: 2, disease: "Psoriasis", count: 7 },
];

const Admin = () => {
  return (
    <div>
      <Layout>
        <Content style={{ margin: "16px" }}>
          {/* Stats */}
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Total Users">152</Card>
            </Col>

            <Col span={8}>
              <Card title="Average Age">31</Card>
            </Col>

            <Col span={8}>
              <Card title="Total Scans">412</Card>
            </Col>
          </Row>

          <br />

          {/* Charts */}
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Gender Distribution">Chart Here</Card>
            </Col>

            <Col span={12}>
              <Card title="Disease Frequency">Chart Here</Card>
            </Col>
          </Row>

          <br />

          {/* Table */}
          <Card title="Disease Results">
            <Table columns={columns} dataSource={data} />
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default Admin;
